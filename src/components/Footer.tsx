import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE_CONFIG, WHATSAPP_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-root {
          background: #0d0b09;
          position: relative;
          overflow: hidden;
        }

        /* Grain texture */
        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: 0.04;
          pointer-events: none;
          z-index: 0;
        }

        /* SVG deco layer */
        .footer-svg-deco {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .footer-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 72px 6vw 0;
        }

        /* ── Top: logo + tagline full width ── */
        .footer-brand-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 52px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(245, 240, 232, 0.07);
        }

        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #f5f0e8;
          line-height: 1;
          margin-bottom: 14px;
          text-decoration: none;
        }

        .footer-logo-dot { color: var(--gold); }

        .footer-tagline {
          font-family: 'Montserrat', sans-serif;
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: rgba(245, 240, 232, 0.35);
          line-height: 1.8;
          max-width: 340px;
        }

        /* ── Grid: 3 cols ── */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 56px;
        }

        .footer-col-heading {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
          display: block;
        }

        .footer-contact-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: rgba(245, 240, 232, 0.42);
          line-height: 1.5;
        }

        .footer-contact-icon {
          width: 14px;
          height: 14px;
          color: rgba(201, 168, 76, 0.55);
          flex-shrink: 0;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .footer-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: rgba(245, 240, 232, 0.38);
          text-decoration: none;
          transition: color 0.25s;
          display: inline-block;
        }

        .footer-link:hover { color: var(--gold); }

        .footer-wa-wrap {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .footer-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0a0806;
          background: var(--gold);
          padding: 12px 22px;
          text-decoration: none;
          margin-top: 4px;
          transition: box-shadow 0.3s, transform 0.15s;
          width: fit-content;
        }

        .footer-wa-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(201, 168, 76, 0.28);
        }

        .footer-wa-btn svg {
          width: 14px;
          height: 14px;
          fill: #0a0806;
          flex-shrink: 0;
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          border-top: 1px solid rgba(245, 240, 232, 0.06);
          padding: 22px 0 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .footer-legal-note {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(201, 168, 76, 0.55);
          text-align: center;
        }

        .footer-copy {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: rgba(245, 240, 232, 0.2);
          text-align: center;
        }

        .footer-rule {
          width: 40px;
          height: 1px;
          background: rgba(201, 168, 76, 0.3);
          margin: 6px auto 0;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
          .footer-wa-wrap { grid-column: 1 / -1; }
          .footer-brand-row { margin-bottom: 36px; padding-bottom: 36px; }
        }

        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr; gap: 24px; }
          .footer-inner { padding: 52px 5vw 0; }
          .footer-logo { font-size: 1.6rem; }
          .footer-tagline { font-size: 10px; max-width: 100%; }
          .footer-wa-btn { width: 100%; justify-content: center; }
          .footer-brand-row { margin-bottom: 28px; padding-bottom: 28px; }
          .footer-legal-note { font-size: 8px; letter-spacing: 0.16em; }
        }

        @media (max-width: 380px) {
          .footer-inner { padding: 44px 5vw 0; }
        }
      `}</style>

      <footer className="footer-root" id="footer">

        {/* ── SVG Bottle & Glass Illustrations ── */}
        <div className="footer-svg-deco" aria-hidden>
          <svg
            viewBox="0 0 1200 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Fade mask — keeps bottles from hitting the content area */}
              <linearGradient id="fadeLeft" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="30%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="fadeRight" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="70%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="maskLeft">
                <rect width="1200" height="420" fill="url(#fadeLeft)" />
              </mask>
              <mask id="maskRight">
                <rect width="1200" height="420" fill="url(#fadeRight)" />
              </mask>
            </defs>

            {/* ── Wine Bottle — far left ── */}
            <g opacity="0.13" stroke="var(--gold)" strokeWidth="1.1" fill="none" mask="url(#maskLeft)" transform="translate(-10, 20)">
              {/* Bottle body */}
              <path d="M55 420 C35 420 28 390 28 350 L28 200 C20 185 18 165 22 145 L22 100 C22 92 26 86 32 84 L32 50 C32 44 36 40 42 40 L68 40 C74 40 78 44 78 50 L78 84 C84 86 88 92 88 100 L88 145 C92 165 90 185 82 200 L82 350 C82 390 75 420 55 420 Z" />
              {/* Neck detail */}
              <line x1="32" y1="84" x2="78" y2="84" />
              <line x1="28" y1="100" x2="82" y2="100" />
              {/* Label outline */}
              <rect x="30" y="210" width="50" height="90" rx="3" />
              {/* Liquid level */}
              <line x1="29" y1="170" x2="81" y2="170" strokeDasharray="3 3" opacity="0.5" />
              {/* Cork */}
              <rect x="38" y="30" width="34" height="14" rx="3" fill="color-mix(in srgb, var(--gold), transparent 85%)" stroke="var(--gold)" />
            </g>

            {/* ── Beer Mug — left area ── */}
            <g opacity="0.10" stroke="var(--gold)" strokeWidth="1.1" fill="none" mask="url(#maskLeft)" transform="translate(130, 80)">
              {/* Mug body */}
              <path d="M10 280 L10 30 Q10 20 20 20 L110 20 Q120 20 120 30 L120 280 Q120 290 110 290 L20 290 Q10 290 10 280 Z" />
              {/* Handle */}
              <path d="M120 60 Q160 60 160 100 Q160 140 120 140" />
              {/* Foam top */}
              <path d="M10 20 Q20 5 35 15 Q50 0 65 12 Q80 2 95 14 Q108 4 120 20" />
              {/* Horizontal ridges */}
              <line x1="10" y1="120" x2="120" y2="120" strokeDasharray="4 4" opacity="0.4" />
              <line x1="10" y1="180" x2="120" y2="180" strokeDasharray="4 4" opacity="0.4" />
              <line x1="10" y1="240" x2="120" y2="240" strokeDasharray="4 4" opacity="0.4" />
            </g>

            {/* ── Whisky/Wine Glass — right area ── */}
            <g opacity="0.13" stroke="var(--gold)" strokeWidth="1.1" fill="none" mask="url(#maskRight)" transform="translate(960, 30)">
              {/* Bowl */}
              <path d="M20 10 C10 10 0 50 5 120 C8 160 25 190 55 200 C85 190 102 160 105 120 C110 50 100 10 90 10 Z" />
              {/* Stem */}
              <line x1="55" y1="200" x2="55" y2="310" />
              {/* Base */}
              <ellipse cx="55" cy="315" rx="38" ry="8" />
              {/* Liquid fill line */}
              <path d="M8 110 Q55 125 102 110" strokeDasharray="3 3" opacity="0.5" />
              {/* Reflection highlight */}
              <path d="M25 40 Q30 80 28 130" opacity="0.35" strokeWidth="0.8" />
            </g>

            {/* ── Tall Whisky Bottle — far right ── */}
            <g opacity="0.12" stroke="var(--gold)" strokeWidth="1.1" fill="none" mask="url(#maskRight)" transform="translate(1090, 0)">
              {/* Body */}
              <path d="M30 420 C15 420 10 395 10 360 L10 190 C4 175 2 158 6 140 L6 95 C6 88 10 83 16 82 L16 44 C16 38 20 34 26 34 L54 34 C60 34 64 38 64 44 L64 82 C70 83 74 88 74 95 L74 140 C78 158 76 175 70 190 L70 360 C70 395 65 420 50 420 Z" />
              {/* Shoulders */}
              <line x1="6" y1="140" x2="74" y2="140" />
              {/* Neck */}
              <line x1="16" y1="82" x2="64" y2="82" />
              {/* Label */}
              <rect x="12" y="200" width="56" height="100" rx="2" />
              {/* Cap */}
              <rect x="22" y="22" width="36" height="14" rx="2" fill="rgba(201,168,76,0.1)" />
            </g>

            {/* ── Champagne flute — centre-right ── */}
            <g opacity="0.08" stroke="var(--gold)" strokeWidth="1" fill="none" transform="translate(700, 20)">
              {/* Flute bowl — narrow tall */}
              <path d="M28 10 C22 10 14 30 14 100 C14 155 22 185 40 195 C58 185 66 155 66 100 C66 30 58 10 52 10 Z" />
              {/* Stem */}
              <line x1="40" y1="195" x2="40" y2="310" />
              {/* Base */}
              <ellipse cx="40" cy="314" rx="28" ry="6" />
              {/* Bubbles */}
              <circle cx="40" cy="160" r="2" opacity="0.5" />
              <circle cx="36" cy="130" r="1.5" opacity="0.4" />
              <circle cx="44" cy="100" r="1.5" opacity="0.4" />
              <circle cx="38" cy="70" r="2" opacity="0.3" />
            </g>

          </svg>
        </div>

        <div className="footer-inner">

          {/* Brand row */}
          <motion.div
            className="footer-brand-row"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/" className="footer-logo">
              Spiritz<span className="footer-logo-dot">.</span>
            </Link>
            <p className="footer-tagline">
              Order premium spirits from verified licensed stores in Lucknow — fast WhatsApp confirmation, no app required.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="footer-grid">

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="footer-col-heading">Get in Touch</span>
              <ul className="footer-contact-list">
                <li className="footer-contact-item">
                  <MapPin className="footer-contact-icon" />
                  Lucknow, Uttar Pradesh
                </li>
                <li className="footer-contact-item">
                  <Phone className="footer-contact-icon" />
                  {SITE_CONFIG.phoneNumber || "+91 73551 03401"}
                </li>
                <li className="footer-contact-item">
                  <Mail className="footer-contact-icon" />
                  {SITE_CONFIG.email}
                </li>
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="footer-col-heading">Legal</span>
              <ul className="footer-links-list">
                <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                <li><Link to="/disclaimer" className="footer-link">Disclaimer</Link></li>
                <li><Link to="/refund" className="footer-link">Refund Policy</Link></li>
              </ul>
            </motion.div>

            {/* Order CTA */}
            <motion.div
              className="footer-wa-wrap"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="footer-col-heading">Order Now</span>
              <p className="footer-tagline" style={{ marginBottom: "18px" }}>
                Ready to order? Tap below to connect directly on WhatsApp.
              </p>
              <a
                href={WHATSAPP_CONFIG.getWhatsAppUrl(WHATSAPP_CONFIG.defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-wa-btn"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order on WhatsApp
              </a>
            </motion.div>

          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <div className="footer-rule" />
            <p className="footer-legal-note">
              21+ Only &nbsp;·&nbsp; Drink Responsibly &nbsp;·&nbsp; Licensed Stores Only
            </p>
            <p className="footer-copy">
              © {new Date().getFullYear()} Spiritz. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}