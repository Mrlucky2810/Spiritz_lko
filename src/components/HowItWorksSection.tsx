import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    emoji: "🔍",
    number: "01",
    title: "Browse Available Liquor in Lucknow",
    description: "Explore premium spirits curated from verified licensed stores near you.",
  },
  {
    emoji: "🛒",
    number: "02",
    title: "Add Your Favorite Drinks to Cart",
    description: "Select products and quantities. Your cart stays live across your session.",
  },
  {
    emoji: "💬",
    number: "03",
    title: "Confirm Order on WhatsApp",
    description: "Send your order via WhatsApp. Our team connects you with the nearest licensed store.",
  },
];

// Stagger delay per step — sequential reveal
const STEP_DELAY = 0.22;

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .hiw-section {
          padding: 100px 6vw;
          background: #faf9f7;
          color: #1a1410;
          position: relative;
          overflow: hidden;
        }

        /* ─── SVG background decoration ─── */
        .hiw-bg-deco {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        /* ── Header ── */
        .hiw-header {
          text-align: center;
          margin-bottom: 72px;
          position: relative;
          z-index: 1;
        }

        .hiw-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #C9A84C;
          display: block;
          margin-bottom: 14px;
        }

        .hiw-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.2vw, 2.9rem);
          font-weight: 400;
          color: #1a1714;
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 14px;
        }

        .hiw-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 11.5px;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: rgba(26, 23, 20, 0.48);
          margin: 0;
          line-height: 1.8;
        }

        /* ── Steps row ── */
        .hiw-steps {
          display: grid;
          grid-template-columns: 1fr 80px 1fr 80px 1fr;
          align-items: start;
          max-width: 960px;
          margin: 0 auto 72px;
          position: relative;
          z-index: 1;
        }

        /* ── Connector ── */
        .hiw-connector {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 52px;
        }

        .hiw-connector-inner {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .hiw-conn-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #C9A84C;
          opacity: 0.5;
        }

        .hiw-conn-line {
          width: 22px;
          height: 1px;
          background: linear-gradient(to right, rgba(201,168,76,0.2), rgba(201,168,76,0.5), rgba(201,168,76,0.2));
        }

        /* ── Single step ── */
        .hiw-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 8px;
        }

        /* Step number pill — sits above emoji, no overlap */
        .hiw-step-num-pill {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: rgba(201, 168, 76, 0.7);
          margin-bottom: 12px;
          display: block;
        }

        /* Emoji ring */
        .hiw-emoji-ring {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          border: 1.5px solid rgba(201, 168, 76, 0.38);
          background: #fffdf7;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          line-height: 1;
          margin-bottom: 22px;
          box-shadow: 0 2px 20px rgba(201, 168, 76, 0.1);
          /* Use compositor-friendly props only */
          will-change: transform;
          transition: border-color 0.28s, background 0.28s, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s;
        }

        .hiw-step:hover .hiw-emoji-ring {
          border-color: rgba(201, 168, 76, 0.7);
          background: #fffbee;
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(201, 168, 76, 0.16);
        }

        /* Step label */
        .hiw-step-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 10px;
          display: block;
        }

        .hiw-step-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 500;
          color: #1a1714;
          line-height: 1.28;
          margin: 0 0 12px;
          letter-spacing: 0.01em;
        }

        .hiw-step-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.03em;
          color: rgba(26, 23, 20, 0.52);
          line-height: 1.85;
          margin: 0;
          max-width: 210px;
        }

        /* ── CTA ── */
        .hiw-cta-wrap {
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .hiw-cta-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #0a0806;
          background: #C9A84C;
          padding: 15px 36px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: box-shadow 0.3s, transform 0.15s;
        }

        .hiw-cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(201, 168, 76, 0.32);
        }

        .hiw-cta-btn:active { transform: translateY(0); }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .hiw-steps {
            grid-template-columns: 1fr;
            max-width: 420px;
          }
          .hiw-connector { display: none; }
          .hiw-step {
            padding: 28px 0;
            border-bottom: 1px solid rgba(26, 23, 20, 0.07);
          }
          .hiw-step:last-child { border-bottom: none; }
        }

        @media (max-width: 680px) {
          .hiw-section { padding: 64px 5vw 76px; }
          .hiw-header { margin-bottom: 44px; }
          .hiw-step-desc { max-width: 280px; }
        }

        @media (max-width: 480px) {
          .hiw-section { padding: 56px 5vw 68px; }
          .hiw-title { font-size: 1.75rem; }
          .hiw-subtitle { font-size: 10.5px; }
          .hiw-emoji-ring { width: 60px; height: 60px; font-size: 1.5rem; }
          .hiw-cta-btn { padding: 13px 28px; font-size: 9.5px; }
          .hiw-header { margin-bottom: 36px; }
        }
      `}</style>

      <section className="hiw-section" id="how-it-works">

        {/* ── SVG Background Decoration ── */}
        <div className="hiw-bg-deco" aria-hidden>
          <svg
            viewBox="0 0 1200 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 1 }}
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Large wine glass outline — left */}
            <g opacity="0.04" stroke="#C9A84C" strokeWidth="1.2">
              <path d="M80 60 C60 120 60 200 90 240 L90 320 L50 320 M50 320 L130 320 M90 320 L90 240 C120 200 120 120 100 60 Z" />
              <ellipse cx="90" cy="62" rx="22" ry="6" />
            </g>

            {/* Bottle outline — far left */}
            <g opacity="0.035" stroke="#C9A84C" strokeWidth="1.2">
              <path d="M30 380 C20 360 20 300 30 280 L30 260 C30 255 34 250 40 250 L50 250 C56 250 60 255 60 260 L60 280 C70 300 70 360 60 380 C60 390 58 400 40 400 C22 400 20 390 30 380 Z" />
              <line x1="30" y1="290" x2="60" y2="290" />
              <line x1="33" y1="310" x2="57" y2="310" />
            </g>

            {/* Large whisky glass — right side */}
            <g opacity="0.04" stroke="#C9A84C" strokeWidth="1.2">
              <path d="M1080 380 L1060 280 L1120 280 Z" />
              <rect x="1060" y="275" width="60" height="6" rx="2" />
              <line x1="1065" y1="310" x2="1115" y2="318" />
              <line x1="1063" y1="330" x2="1117" y2="340" />
            </g>

            {/* Wine bottle — right */}
            <g opacity="0.035" stroke="#C9A84C" strokeWidth="1.2">
              <path d="M1150 80 C1140 60 1140 40 1145 30 L1145 20 C1145 16 1148 14 1152 14 L1158 14 C1162 14 1165 16 1165 20 L1165 30 C1170 40 1170 60 1160 80 C1155 120 1155 200 1165 240 C1170 260 1168 300 1155 310 C1142 300 1140 260 1145 240 C1155 200 1155 120 1150 80 Z" />
              <line x1="1143" y1="160" x2="1167" y2="160" />
            </g>

            {/* Scattered dots / bubbles */}
            {[
              [200, 80, 2.5],
              [350, 420, 1.8],
              [600, 50, 3],
              [750, 440, 2],
              [900, 70, 2.2],
              [1000, 380, 1.5],
              [450, 460, 2],
              [160, 300, 1.6],
              [1100, 200, 1.8],
            ].map(([cx, cy, r], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="#C9A84C"
                opacity="0.18"
              />
            ))}

            {/* Thin arcing line across top */}
            <path
              d="M0 80 Q300 20 600 60 Q900 100 1200 40"
              stroke="#C9A84C"
              strokeWidth="0.6"
              opacity="0.07"
            />
            {/* Thin arcing line across bottom */}
            <path
              d="M0 430 Q400 480 700 450 Q900 430 1200 460"
              stroke="#C9A84C"
              strokeWidth="0.6"
              opacity="0.07"
            />
          </svg>
        </div>

        {/* Header */}
        <motion.div
          className="hiw-header"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hiw-eyebrow">Simple Process</span>
          <h2 className="hiw-title">How It Works</h2>
          <p className="hiw-subtitle">
            Order from licensed stores in three easy steps — no app download required
          </p>
        </motion.div>

        {/* Steps — sequential: step 1 → connector → step 2 → connector → step 3 */}
        <div className="hiw-steps" ref={ref}>
          {steps.map((step, i) => (
            <>
              {/* Step */}
              <motion.div
                key={step.number}
                className="hiw-step"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * STEP_DELAY,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Step number — clean pill, no overlap */}
                <span className="hiw-step-num-pill">{step.number}</span>

                {/* Emoji ring */}
                <div className="hiw-emoji-ring">{step.emoji}</div>

                <span className="hiw-step-label">Step {step.number}</span>
                <h3 className="hiw-step-title">{step.title}</h3>
                <p className="hiw-step-desc">{step.description}</p>
              </motion.div>

              {/* Connector — appears just after its left step */}
              {i < steps.length - 1 && (
                <motion.div
                  key={`conn-${i}`}
                  className="hiw-connector"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                  style={{ transformOrigin: "left" }}
                  transition={{
                    duration: 0.4,
                    delay: i * STEP_DELAY + 0.22,  // appears just after its step
                    ease: "easeOut",
                  }}
                >
                  <div className="hiw-connector-inner">
                    <div className="hiw-conn-dot" />
                    <div className="hiw-conn-line" />
                    <div className="hiw-conn-dot" />
                    <div className="hiw-conn-line" />
                    <div className="hiw-conn-dot" />
                  </div>
                </motion.div>
              )}
            </>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="hiw-cta-wrap"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: steps.length * STEP_DELAY + 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <button className="hiw-cta-btn" onClick={scrollToProducts}>
            🛒 &nbsp;Start Ordering
          </button>
        </motion.div>

      </section>
    </>
  );
}