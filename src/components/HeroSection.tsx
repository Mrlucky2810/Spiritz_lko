import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1920&h=1080&fit=crop&auto=format&q=90",
    headline: "Premium\nSpirits",
    sub: "Order from Nearby Licensed Stores in Lucknow",
    tag: "Fast WhatsApp Confirmation",
    accent: "#C9A84C",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=1920&h=1080&fit=crop&auto=format&q=90",
    headline: "Skip the\nQueue.",
    sub: "Order Instantly on WhatsApp",
    tag: "Licensed Store Pickup",
    accent: "#B8860B",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&h=1080&fit=crop&auto=format&q=90",
    headline: "Top\nBrands.",
    sub: "Best Prices Across Lucknow",
    tag: "Verified Licensed Stores",
    accent: "#D4A847",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  };

  const next = () => goTo((current + 1) % slides.length, 1);
  const prev = () => goTo((current - 1 + slides.length) % slides.length, -1);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 7000);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current]);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const slide = slides[current];

  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 100dvh;
          min-height: 600px;
          overflow: hidden;
          background: #0a0806;
        }

        .slide-bg {
          position: absolute;
          inset: 0;
        }

        .slide-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform-origin: center center;
        }

        .grain-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
          pointer-events: none;
          z-index: 5;
          mix-blend-mode: overlay;
        }

        .gradient-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(4,3,2,0.92) 0%,
            rgba(4,3,2,0.75) 35%,
            rgba(4,3,2,0.30) 60%,
            transparent 100%
          );
          z-index: 3;
        }

        .gradient-bottom {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(4,3,2,0.85) 0%,
            rgba(4,3,2,0.3) 25%,
            transparent 60%
          );
          z-index: 4;
        }

        .gradient-top {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(4,3,2,0.4) 0%,
            transparent 20%
          );
          z-index: 4;
        }

        .content-wrapper {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 6vw 8vh;
        }

        .tag-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tag-label::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: var(--accent);
          opacity: 0.7;
        }

        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(4rem, 9vw, 9rem);
          font-weight: 300;
          line-height: 0.92;
          letter-spacing: -0.02em;
          color: #f5f0e8;
          margin: 0 0 2rem;
          white-space: pre-line;
        }

        .sub {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(0.75rem, 1.2vw, 0.9rem);
          font-weight: 400;
          letter-spacing: 0.1em;
          color: rgba(245,240,232,0.55);
          margin-bottom: 3rem;
          max-width: 340px;
        }

        .cta-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #0a0806;
          background: var(--accent);
          padding: 16px 36px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.12);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .btn-primary:hover::after { opacity: 1; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(201,168,76,0.35); }
        .btn-primary:active { transform: translateY(0); }

        .btn-secondary {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.7);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color 0.3s;
          padding: 16px 0;
          border-bottom: 1px solid rgba(245,240,232,0.15);
        }

        .btn-secondary:hover { color: var(--accent); border-color: var(--accent); }

        .btn-secondary svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        /* Right side nav */
        .slide-nav {
          position: absolute;
          right: 6vw;
          top: 50%;
          transform: translateY(-50%);
          z-index: 30;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .nav-btn {
          width: 44px;
          height: 44px;
          border: 1px solid rgba(245,240,232,0.15);
          background: rgba(10,8,6,0.4);
          backdrop-filter: blur(8px);
          color: rgba(245,240,232,0.6);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          font-size: 16px;
        }

        .nav-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(10,8,6,0.7);
        }

        /* Slide counter */
        .slide-counter {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          color: rgba(245,240,232,0.35);
          letter-spacing: 0.1em;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          user-select: none;
        }

        .slide-counter span {
          color: var(--accent);
          opacity: 0.9;
        }



        @media (max-width: 480px) {
          .hero-section { min-height: 100svh; }
          .content-wrapper { padding: 0 5vw 10vh; padding-bottom: max(10vh, env(safe-area-inset-bottom, 10vh)); }
          .headline { font-size: clamp(2.8rem, 14vw, 4.5rem); line-height: 0.95; margin-bottom: 1.2rem; }
          .sub { font-size: 0.75rem; max-width: 100%; margin-bottom: 2rem; letter-spacing: 0.06em; }
          .tag-label { font-size: 9px; margin-bottom: 1rem; }
          .tag-label::before { width: 20px; }
          .cta-row { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
          .btn-primary { padding: 14px 28px; font-size: 10px; }
          .btn-secondary { font-size: 10px; }
          .slide-nav { display: none; }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .content-wrapper { padding: 0 6vw 10vh; }
          .headline { font-size: clamp(3.5rem, 10vw, 5.5rem); }
          .sub { max-width: 90%; font-size: 0.8rem; }
          .cta-row { gap: 1.2rem; }
          .slide-nav { display: none; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .headline { font-size: clamp(4rem, 8vw, 7rem); }
          .content-wrapper { padding: 0 6vw 8vh; }
        }
      `}</style>

      <div
        className="hero-section"
        style={{ "--accent": slide.accent } as React.CSSProperties}
      >
        {/* Background Slides */}
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            className="slide-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          >
            <motion.img
              src={slide.image}
              alt=""
              loading="eager"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "easeOut" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="gradient-left" />
        <div className="gradient-bottom" />
        <div className="gradient-top" />
        <div className="grain-overlay" />

        {/* Main Content */}
        <div className="content-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="tag-label"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {slide.tag}
              </motion.div>

              <motion.h1
                className="headline"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {slide.headline}
              </motion.h1>

              <motion.p
                className="sub"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {slide.sub}
              </motion.p>

              <motion.div
                className="cta-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <button className="btn-primary" onClick={scrollToProducts}>
                  Browse Collection
                </button>
                <a
                  href="https://wa.me/917355103401?text=Hi%2C%20I%20want%20to%20order%20liquor%20in%20Lucknow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Order on WhatsApp
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Nav */}
        <div className="slide-nav">
          <div className="slide-counter">
            <span>0{current + 1}</span> / 0{slides.length}
          </div>
          <button className="nav-btn" onClick={() => { prev(); resetTimer(); }} aria-label="Previous">
            ↑
          </button>
          <button className="nav-btn" onClick={() => { next(); resetTimer(); }} aria-label="Next">
            ↓
          </button>
        </div>


      </div>
    </>
  );
}