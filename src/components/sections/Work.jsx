import { useRef, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { Eyebrow, Reveal } from "../Reveal";
import { BG, BG_ALT, INK, LINE, MUTED, ORANGE, ORANGE_LIGHT, PANEL } from "../../theme";


// Add videos by filling in `videoUrl` (and optionally `poster`) below.
// To add another video later, copy one object inside the relevant `videos` array.
const PORTFOLIO_SECTIONS = [
  {
    title: "Typography & MoGraphs",
    videos: [
      { title: "Eenie Meenie edit", videoUrl: "/videos/bday.mp4", poster: "" },
      { title: "Kita ke sana lyrical - (Scrap)", videoUrl: "/videos/kita.mp4", poster: "" },
      { title: "Majboor edit", videoUrl: "/videos/majboor.mp4", poster: "" },
      { title: "Earrings lyrical", videoUrl: "/videos/malcolm_lyrics.mp4", poster: "" },
    ],
  },
  {
    title: "Documentary",
    videos: [{ title: "The 32-Year Coma Case", videoUrl: "/videos/final.mp4", poster: "" }],
  },
  {
    title: "SASS",
    videos: [{ title: "What If Apple Made a Swiggy Ad?", videoUrl: "/videos/output.mp4", poster: "" }],
  },
];

function VideoCard({ video, index, isPlaying, onPlay, onPause }) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef(null);
  const hasVideo = Boolean(video.videoUrl);

  const togglePlayback = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      void videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <Reveal delay={(index % 3) * 0.1}>
      <div
        className="group relative overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1"
        style={{ border: `1px solid ${LINE}` }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className="relative flex h-64 items-center justify-center overflow-hidden md:h-72"
          style={{
            background: hasVideo
              ? "linear-gradient(145deg, #f2f2f2 0%, #ffffff 55%, #eeeeee 100%)"
              : "linear-gradient(135deg, #efefef 0%, #f7f7f7 50%, #e9e9e9 100%)",
          }}
        >
          {hasVideo ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover transition-transform duration-700"
              style={{ transform: isPlaying ? "scale(1.035)" : "scale(1)" }}
              controls
              controlsList="nodownload"
              onContextMenu={(event) => event.preventDefault()}
              preload="metadata"
              poster={video.poster || undefined}
              onPlay={() => onPlay(video.title, videoRef.current)}
              onPause={() => onPause(video.title)}
              onEnded={() => onPause(video.title)}
            >
              <source src={video.videoUrl} />
              Your browser does not support this video format.
            </video>
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 text-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: ORANGE }}
              >
                <Play size={20} color={INK} fill={INK} />
              </div>

              <span className="text-sm font-medium text-black">
                Add video here
              </span>

              <span className="text-xs" style={{ color: MUTED }}>
                Set videoUrl in PORTFOLIO_SECTIONS
              </span>
            </div>
          )}

          {hasVideo && (
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{
                opacity: hover || !isPlaying ? 1 : 0,
                background:
                  "linear-gradient(180deg, rgba(17,17,17,0.08), rgba(255,255,255,0.7))",
              }}
            >
              <button
                type="button"
                className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
                style={{
                  background: ORANGE,
                  boxShadow: `0 8px 30px ${ORANGE}55`,
                }}
                onClick={togglePlayback}
                aria-label={isPlaying ? `Pause ${video.title}` : `Play ${video.title}`}
                aria-pressed={isPlaying}
              >
                {isPlaying ? (
                  <Pause size={20} color={INK} fill={INK} />
                ) : (
                  <Play size={20} color={INK} fill={INK} />
                )}
              </button>
            </div>
          )}

          <span
            className="absolute top-4 right-4 rounded-md px-2 py-1 font-mono text-[11px]"
            style={{
              background: "rgba(255,255,255,0.7)",
              color: ORANGE,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="p-5" style={{ background: PANEL }}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <span
              className="font-mono text-[10px] tracking-[0.2em]"
              style={{ color: ORANGE_LIGHT }}
            >
              VIDEO / {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase" style={{ color: isPlaying ? ORANGE : MUTED }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: isPlaying ? ORANGE : MUTED }} />
              {isPlaying ? "Playing" : "Ready"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-black">{video.title}</h3>
            <ArrowUpRight
              size={18}
              className="transition-all duration-300"
              style={{
                color: ORANGE,
                transform: hover ? "translate(2px,-2px)" : "translate(0,0)",
                opacity: hover ? 1 : 0.4,
              }}
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Work() {
  const [playingVideo, setPlayingVideo] = useState(null);
  const activeVideoRef = useRef(null);

  const handlePlay = (videoId, videoElement) => {
    if (activeVideoRef.current && activeVideoRef.current !== videoElement) {
      activeVideoRef.current.pause();
    }

    activeVideoRef.current = videoElement;
    setPlayingVideo(videoId);
  };

  const handlePause = (videoId) => {
    if (playingVideo === videoId) {
      activeVideoRef.current = null;
      setPlayingVideo(null);
    }
  };

  return (
    <section
      id="work"
      className="relative px-6 py-28 md:px-10 md:py-36"
      style={{
        background: `linear-gradient(180deg, ${BG} 0%, ${BG_ALT} 48%, ${BG} 100%)`,
        scrollMarginTop: 72,
      }}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow code="00:01" text="Selected Work" />

          <h2
            className="mb-4 text-black font-bold leading-none"
            style={{
              fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            }}
          >
            WORK
          </h2>

          <p className="mb-16 max-w-xl" style={{ color: MUTED }}>
            A collection of recent edits spanning cinematic pieces, brand ads,
            and social-first content.
          </p>
        </Reveal>

        <div className="space-y-20">
          {PORTFOLIO_SECTIONS.map((section, sectionIndex) => (
            <div key={section.title}>
              {sectionIndex > 0 && (
                <div
                  className="mb-10 flex items-center gap-4"
                  aria-hidden="true"
                >
                  <span
                    className="h-px flex-1"
                    style={{ background: `linear-gradient(90deg, transparent, ${LINE})` }}
                  />
                  <span
                    className="font-mono text-[10px] tracking-[0.25em]"
                    style={{ color: ORANGE_LIGHT }}
                  >
                    {String(sectionIndex).padStart(2, "0")}
                  </span>
                  <span
                    className="h-px flex-1"
                    style={{ background: `linear-gradient(90deg, ${LINE}, transparent)` }}
                  />
                </div>
              )}

              <Reveal>
                <h3
                  className="mb-8 text-black font-bold leading-none"
                  style={{
                    fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  }}
                >
                  {section.title}
                </h3>
              </Reveal>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.videos.map((video, index) => (
                  <VideoCard
                    key={video.title}
                    video={video}
                    index={index}
                    isPlaying={playingVideo === video.title}
                    onPlay={handlePlay}
                    onPause={handlePause}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}