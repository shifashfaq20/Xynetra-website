// "use client";

// import { useRef, useState } from "react";
// import { BookDemoButton } from "@/components/CtaButtons";
// import { IconCheck } from "@/components/Icon";

// // Marketing demo reel. Export your clip to /public/videos/demo.mp4 and, for an
// // instant polished first paint, a thumbnail to /public/videos/demo-poster.jpg.
// // For clips over ~15MB, point DEMO_SRC at a CDN / Supabase Storage URL instead.
// const DEMO_SRC = "/videos/demo.mp4";
// const DEMO_POSTER = "/videos/demo-poster.jpg";

// export default function DemoVideo() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [started, setStarted] = useState(false);

//   const handlePlay = () => {
//     const v = videoRef.current;
//     if (!v) return;
//     void v.play();
//     setStarted(true);
//   };

//   return (
//     <section id="demo" className="overflow-hidden bg-ink text-paper">
//       <div className="container-x py-16 sm:py-24">
//         <div className="mx-auto max-w-2xl text-center">
//           <span className="eyebrow text-purple">See it work</span>
//           <h2 className="h2 mt-4 text-paper">
//             Watch Xynetra recover revenue in real time.
//           </h2>
//           <p className="body-lg mt-5 text-paper/75">
//             Ninety seconds, end to end: a missed call becomes a confirmed
//             booking, a reminder goes out on its own, and a cancelled slot gets
//             refilled — while the dashboard counts the money back.
//           </p>
//         </div>

//         {/* Cinematic frame — square edges to match the editorial brand system. */}
//         <div className="relative mx-auto mt-12 max-w-5xl border border-paper/15 ring-1 ring-paper/10">
//           <video
//             ref={videoRef}
//             className="aspect-video w-full bg-black object-cover"
//             src={DEMO_SRC}
//             poster={DEMO_POSTER}
//             controls={started}
//             playsInline
//             preload="metadata"
//             onPlay={() => setStarted(true)}
//           />

//           {/* Click-to-play overlay — keeps the page fast and the first paint clean. */}
//           {!started && (
//             <button
//               type="button"
//               onClick={handlePlay}
//               aria-label="Play demo video"
//               className="group absolute inset-0 grid place-items-center bg-ink/30 transition-colors hover:bg-ink/40"
//             >
//               <span className="grid h-16 w-16 place-items-center rounded-full bg-purple text-paper shadow-lg transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
//                 <svg
//                   viewBox="0 0 24 24"
//                   className="ml-1 h-7 w-7 sm:h-8 sm:w-8"
//                   fill="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path d="M8 5v14l11-7z" />
//                 </svg>
//               </span>
//             </button>
//           )}
//         </div>

//         {/* Trust row — mirrors the hero's check row for visual consistency. */}
//         <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-paper/60">
//           <span className="inline-flex items-center gap-2">
//             <IconCheck size={16} className="text-purple" /> No signup required
//           </span>
//           <span className="inline-flex items-center gap-2">
//             <IconCheck size={16} className="text-purple" /> 90-second tour
//           </span>
//           <span className="inline-flex items-center gap-2">
//             <IconCheck size={16} className="text-purple" /> Real workflow, no
//             slides
//           </span>
//         </div>

//         <div className="mt-9 flex justify-center">
//           <BookDemoButton variant="reversed" />
//         </div>
//       </div>
//     </section>
//   );
// }



// "use client";

// import { useRef, useState } from "react";
// import { BookDemoButton } from "@/components/CtaButtons";
// import { IconCheck } from "@/components/Icon";

// // Marketing demo reel. Export your clip to /public/videos/demo.mp4 and, for an
// // instant polished first paint, a thumbnail to /public/videos/demo-poster.jpg.
// // For clips over ~15MB, point DEMO_SRC at a CDN / Supabase Storage URL instead.
// const DEMO_SRC = "https://archive.org/download/demo_20260728/demo.mp4";
// const DEMO_POSTER = "/videos/demo-poster.jpg";

// export default function DemoVideo() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [started, setStarted] = useState(false);

//   const handlePlay = () => {
//     const v = videoRef.current;
//     if (!v) return;
//     void v.play();
//     setStarted(true);
//   };

//   return (
//     <section id="demo" className="overflow-hidden bg-ink text-paper">
//       <div className="container-x py-16 sm:py-24">
//         <div className="mx-auto max-w-2xl text-center">
//           <span className="eyebrow text-purple">See it work</span>
//           <h2 className="h2 mt-4 text-paper">
//             Watch Xynetra recover revenue in real time.
//           </h2>
//           <p className="body-lg mt-5 text-paper/75">
//             Ninety seconds, end to end: a missed call becomes a confirmed
//             booking, a reminder goes out on its own, and a cancelled slot gets
//             refilled — while the dashboard counts the money back.
//           </p>
//         </div>

//         {/* Cinematic frame — square edges to match the editorial brand system. */}
//         <div className="relative mx-auto mt-12 max-w-5xl border border-paper/15 ring-1 ring-paper/10">
//           <video
//             ref={videoRef}
//             className="aspect-video w-full bg-black object-cover"
//             src={DEMO_SRC}
//             poster={DEMO_POSTER}
//             controls={started}
//             playsInline
//             preload="metadata"
//             onPlay={() => setStarted(true)}
//           />

//           {/* Click-to-play overlay — keeps the page fast and the first paint clean. */}
//           {!started && (
//             <button
//               type="button"
//               onClick={handlePlay}
//               aria-label="Play demo video"
//               className="group absolute inset-0 grid place-items-center bg-ink/30 transition-colors hover:bg-ink/40"
//             >
//               <span className="grid h-16 w-16 place-items-center rounded-full bg-purple text-paper shadow-lg transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
//                 <svg
//                   viewBox="0 0 24 24"
//                   className="ml-1 h-7 w-7 sm:h-8 sm:w-8"
//                   fill="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path d="M8 5v14l11-7z" />
//                 </svg>
//               </span>
//             </button>
//           )}
//         </div>

//         {/* Trust row — mirrors the hero's check row for visual consistency. */}
//         <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-paper/60">
//           <span className="inline-flex items-center gap-2">
//             <IconCheck size={16} className="text-purple" /> No signup required
//           </span>
//           <span className="inline-flex items-center gap-2">
//             <IconCheck size={16} className="text-purple" /> 90-second tour
//           </span>
//           <span className="inline-flex items-center gap-2">
//             <IconCheck size={16} className="text-purple" /> Real workflow, no
//             slides
//           </span>
//         </div>

//         <div className="mt-9 flex justify-center">
//           <BookDemoButton variant="reversed" />
//         </div>
//       </div>
//     </section>
//   );
// }


// "use client";

// import { useRef, useState, useEffect } from "react";
// import { BookDemoButton } from "@/components/CtaButtons";
// import { IconCheck } from "@/components/Icon";

// // ✅ Using local compressed video from /public/videos/demo.mp4
// const DEMO_SRC = "/videos/demo-2.mp4";
// const DEMO_POSTER = "/videos/demo-poster.jpg";

// export default function DemoVideo() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [started, setStarted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [inView, setInView] = useState(false);

//   // Lazy load: only detect when section is near viewport
//   useEffect(() => {
//     const el = sectionRef.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           observer.disconnect();
//         }
//       },
//       { rootMargin: "200px" }
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   const handlePlay = () => {
//     const v = videoRef.current;
//     if (!v) return;

//     setLoading(true);
//     v.load();

//     v.oncanplay = () => {
//       void v.play();
//       setLoading(false);
//       setStarted(true);
//     };

//     v.onerror = () => {
//       setLoading(false);
//       alert("Failed to load video. Please try again later.");
//     };
//   };

//   return (
//     <section id="demo" className="overflow-hidden bg-ink text-paper">
//       <div className="container-x py-16 sm:py-24">
//         <div className="mx-auto max-w-2xl text-center">
//           <span className="eyebrow text-purple">See it work</span>
//           <h2 className="h2 mt-4 text-paper">
//             Watch Xynetra recover revenue in real time.
//           </h2>
//           <p className="body-lg mt-5 text-paper/75">
//             Ninety seconds, end to end: a missed call becomes a confirmed
//             booking, a reminder goes out on its own, and a cancelled slot gets
//             refilled — while the dashboard counts the money back.
//           </p>
//         </div>

//         {/* Cinematic frame */}
//         <div
//           ref={sectionRef}
//           className="relative mx-auto mt-12 max-w-5xl border border-paper/15 ring-1 ring-paper/10"
//         >
//           {inView ? (
//             <video
//               ref={videoRef}
//               className="aspect-video w-full bg-black object-cover"
//               poster={DEMO_POSTER}
//               controls={started}
//               playsInline
//               muted
//               preload="none"
//               onPlay={() => setStarted(true)}
//             >
//               <source src={DEMO_SRC} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           ) : (
//             <div className="aspect-video w-full bg-black flex items-center justify-center">
//               <span className="text-paper/40 text-sm">Loading demo...</span>
//             </div>
//           )}

//           {/* Loading spinner */}
//           {loading && (
//             <div className="absolute inset-0 grid place-items-center bg-ink/60">
//               <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple border-t-transparent" />
//             </div>
//           )}

//           {/* Click-to-play overlay */}
//           {!started && !loading && inView && (
//             <button
//               type="button"
//               onClick={handlePlay}
//               aria-label="Play demo video"
//               className="group absolute inset-0 grid place-items-center bg-ink/30 transition-colors hover:bg-ink/40"
//             >
//               <span className="grid h-16 w-16 place-items-center rounded-full bg-purple text-paper shadow-lg transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
//                 <svg
//                   viewBox="0 0 24 24"
//                   className="ml-1 h-7 w-7 sm:h-8 sm:w-8"
//                   fill="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path d="M8 5v14l11-7z" />
//                 </svg>
//               </span>
//             </button>
//           )}
//         </div>

//         {/* Trust row */}
//         <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-paper/60">
//           <span className="inline-flex items-center gap-2">
//             <IconCheck size={16} className="text-purple" /> No signup required
//           </span>
//           <span className="inline-flex items-center gap-2">
//             <IconCheck size={16} className="text-purple" /> 90-second tour
//           </span>
//           <span className="inline-flex items-center gap-2">
//             <IconCheck size={16} className="text-purple" /> Real workflow, no
//             slides
//           </span>
//         </div>

//         <div className="mt-9 flex justify-center">
//           <BookDemoButton variant="reversed" />
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useRef, useState, useEffect } from "react";
import { BookDemoButton } from "@/components/CtaButtons";
import { IconCheck } from "@/components/Icon";

// All keyframes in display order
const FRAMES = [
  "/video-keyframes/s1-060.png",
  "/video-keyframes/s1-175.png",
  "/video-keyframes/s1-175b.png",
  "/video-keyframes/s2-30.png",
  "/video-keyframes/s2-100.png",
  "/video-keyframes/s2-155.png",
  "/video-keyframes/s2-190.png",
  "/video-keyframes/s2-230.png",
  "/video-keyframes/s3-15.png",
  "/video-keyframes/s3-90.png",
  "/video-keyframes/s3-150.png",
  "/video-keyframes/s3-210.png",
  "/video-keyframes/s3-265.png",
  "/video-keyframes/s4-40.png",
  "/video-keyframes/s4-105.png",
  "/video-keyframes/s4-200.png",
  "/video-keyframes/s4-275.png",
  "/video-keyframes/s4-320.png",
  "/video-keyframes/s5-60.png",
  "/video-keyframes/s5-130.png",
  "/video-keyframes/s5-180.png",
  "/video-keyframes/s5-210.png",
  "/video-keyframes/s5-260.png",
  "/video-keyframes/s5-340.png",
  "/video-keyframes/s5-395.png",
  "/video-keyframes/s5b-60.png",
  "/video-keyframes/s5b-180.png",
  "/video-keyframes/s5b-300.png",
  "/video-keyframes/s5b-360.png",
  "/video-keyframes/s5b-440.png",
  "/video-keyframes/s5b-540.png",
  "/video-keyframes/s5b-640.png",
  "/video-keyframes/s5b-700.png",
  "/video-keyframes/s6-50.png",
  "/video-keyframes/s6-100.png",
  "/video-keyframes/s6-165.png",
  "/video-keyframes/s6-235.png",
  "/video-keyframes/s6-285.png",
  "/video-keyframes/s6-325.png",
  "/video-keyframes/s7-50.png",
  "/video-keyframes/s7-120.png",
  "/video-keyframes/s7-200.png",
];

export default function DemoVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inView, setInView] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Lazy load: detect when section is near viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Preload frames quickly once in view
  useEffect(() => {
    if (!inView) return;
    FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    // Small artificial delay so spinner feels real
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [inView]);

  // Frame loop at ~24fps once started
  useEffect(() => {
    if (!started || !inView) return;
    intervalRef.current = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % FRAMES.length);
    }, 42); // ~24 fps
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started, inView]);

  const handlePlay = () => {
    setStarted(true);
  };

  return (
    <section id="demo" className="overflow-hidden bg-ink text-paper">
      <div className="container-x py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-purple">See it work</span>
          <h2 className="h2 mt-4 text-paper">
            Watch Xynetra recover revenue in real time.
          </h2>
          <p className="body-lg mt-5 text-paper/75">
            Ninety seconds, end to end: a missed call becomes a confirmed
            booking, a reminder goes out on its own, and a cancelled slot gets
            refilled — while the dashboard counts the money back.
          </p>
        </div>

        {/* Cinematic frame */}
        <div
          ref={sectionRef}
          className="relative mx-auto mt-12 max-w-5xl border border-paper/15 ring-1 ring-paper/10 bg-black overflow-hidden"
        >
          {inView ? (
            <div className="aspect-video w-full relative">
              <img
                src={FRAMES[frameIndex]}
                alt="Demo animation"
                className="w-full h-full object-contain bg-black"
                loading={frameIndex === 0 ? "eager" : "lazy"}
              />

              {/* Loading spinner */}
              {loading && (
                <div className="absolute inset-0 grid place-items-center bg-ink/80 z-10">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple border-t-transparent" />
                </div>
              )}

              {/* Click-to-play overlay */}
              {!started && !loading && (
                <button
                  type="button"
                  onClick={handlePlay}
                  aria-label="Play demo animation"
                  className="group absolute inset-0 grid place-items-center bg-ink/30 transition-colors hover:bg-ink/40 z-20"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-purple text-paper shadow-lg transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-1 h-7 w-7 sm:h-8 sm:w-8"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          ) : (
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <span className="text-paper/40 text-sm">Loading demo...</span>
            </div>
          )}
        </div>

        {/* Trust row */}
        <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-paper/60">
          <span className="inline-flex items-center gap-2">
            <IconCheck size={16} className="text-purple" /> No signup required
          </span>
          <span className="inline-flex items-center gap-2">
            <IconCheck size={16} className="text-purple" /> 90-second tour
          </span>
          <span className="inline-flex items-center gap-2">
            <IconCheck size={16} className="text-purple" /> Real workflow, no
            slides
          </span>
        </div>

        <div className="mt-9 flex justify-center">
          <BookDemoButton variant="reversed" />
        </div>
      </div>
    </section>
  );
}