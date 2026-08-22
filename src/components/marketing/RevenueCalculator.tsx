"use client";

import React, { useMemo, useState } from "react";

type Currency = "usd" | "gbp";

type Props = {
  comparePlanName: string;
  comparePlanPrice: number;
  comparePlanLabel: string;
  ctaHref: string;
  ctaLabel?: string;
};

const INK = "#12101C";
const CORAL = "#E95E57";
const GBP_RATE = 0.79; // replace with exact pricing logic later if you want real GBP plan amounts too

function formatMoney(amount: number, currency: Currency) {
  const symbol = currency === "usd" ? "$" : "£";
  return `${symbol}${Math.round(amount).toLocaleString("en-GB")}`;
}

function convert(amount: number, currency: Currency) {
  return currency === "usd" ? amount : amount * GBP_RATE;
}

export default function RevenueCalculator({
  comparePlanName,
  comparePlanPrice,
  comparePlanLabel,
  ctaHref,
  ctaLabel = "See pricing",
}: Props) {
  const [currency, setCurrency] = useState<Currency>("usd");
  const [appointmentsPerWeek, setAppointmentsPerWeek] = useState(100);
  const [avgAppointmentValue, setAvgAppointmentValue] = useState(200);
  const [noShowRate, setNoShowRate] = useState(12);
  const [fillBackRate, setFillBackRate] = useState(50);

  const values = useMemo(() => {
    const monthlyLossBase =
      appointmentsPerWeek *
      (noShowRate / 100) *
      avgAppointmentValue *
      4.33;

    const recoveredBase = monthlyLossBase * (fillBackRate / 100);

    const loss = convert(monthlyLossBase, currency);
    const recovered = convert(recoveredBase, currency);
    const planPrice = convert(comparePlanPrice, currency);
    const multiple = comparePlanPrice > 0 ? recoveredBase / comparePlanPrice : 0;

    return {
      loss,
      recovered,
      planPrice,
      multiple,
    };
  }, [
    appointmentsPerWeek,
    avgAppointmentValue,
    noShowRate,
    fillBackRate,
    currency,
    comparePlanPrice,
  ]);

  const multipleLabel =
    values.multiple >= 10
      ? `${Math.round(values.multiple)}×`
      : `${values.multiple.toFixed(1)}×`;

  return (
    <section
      className="rounded-[28px] border border-neutral-200 bg-white p-6 md:p-10"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Revenue calculator
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl"
            style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}
          >
            See what no-shows are costing you
          </h2>
          <p className="mt-3 text-base text-neutral-600 md:text-lg">
            Adjust the sliders to estimate monthly lost revenue and how much
            Xynetra Recover can win back by refilling cancelled slots.
          </p>
        </div>

        <div className="inline-flex w-fit rounded-full border border-neutral-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setCurrency("usd")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              currency === "usd"
                ? "text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
            style={{
              backgroundColor: currency === "usd" ? INK : "transparent",
            }}
          >
            $
          </button>
          <button
            type="button"
            onClick={() => setCurrency("gbp")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              currency === "gbp"
                ? "text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
            style={{
              backgroundColor: currency === "gbp" ? INK : "transparent",
            }}
          >
            £
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6">
          <SliderRow
            label="Appointments per week"
            value={appointmentsPerWeek}
            display={appointmentsPerWeek}
            min={10}
            max={500}
            step={5}
            onChange={setAppointmentsPerWeek}
          />

          <SliderRow
            label="Avg appointment value"
            value={avgAppointmentValue}
            display={`${currency === "usd" ? "$" : "£"}${avgAppointmentValue}`}
            min={25}
            max={1000}
            step={25}
            onChange={setAvgAppointmentValue}
          />

          <SliderRow
            label="No-show rate %"
            value={noShowRate}
            display={`${noShowRate}%`}
            min={1}
            max={40}
            step={1}
            onChange={setNoShowRate}
          />

          <SliderRow
            label="Slots we fill back %"
            value={fillBackRate}
            display={`${fillBackRate}%`}
            min={1}
            max={100}
            step={1}
            onChange={setFillBackRate}
          />
        </div>

        <div
          className="rounded-[28px] p-6 md:p-8"
          style={{ backgroundColor: INK, color: "white" }}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-white/60">
              Monthly impact
            </p>

            <div className="mt-6">
              <p className="text-sm text-white/70">You&apos;re losing</p>
              <div
                className="mt-2 text-4xl font-bold md:text-5xl"
                style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}
              >
                {formatMoney(values.loss, currency)}
                <span className="ml-1 text-lg font-medium text-white/60">/month</span>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-white/70">Recovery gets back</p>
              <div
                className="mt-2 text-4xl font-bold md:text-5xl"
                style={{
                  fontFamily: "'Space Grotesk', Inter, sans-serif",
                  color: CORAL,
                }}
              >
                {formatMoney(values.recovered, currency)}
                <span className="ml-1 text-lg font-medium text-white/60">/month</span>
              </div>
            </div>

            <p className="mt-6 text-sm leading-6 text-white/75">
              That pays for the <span className="font-semibold text-white">{comparePlanName}</span>{" "}
              plan ({comparePlanLabel}) <span className="font-semibold text-white">{multipleLabel}</span>{" "}
              over.
            </p>

            <p className="mt-2 text-xs text-white/50">
              Plan reference: {formatMoney(values.planPrice, currency)} per month equivalent.
            </p>
          </div>

          <a
            href={ctaHref}
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            style={{ backgroundColor: CORAL }}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

function SliderRow({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string | number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <label className="text-sm font-medium text-neutral-700">{label}</label>
        <span
          className="text-lg font-bold text-neutral-900"
          style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}
        >
          {display}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 accent-neutral-900"
      />

      <div className="mt-2 flex justify-between text-xs text-neutral-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}