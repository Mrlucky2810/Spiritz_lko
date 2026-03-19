import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { SITE_CONFIG, WHATSAPP_CONFIG } from "@/lib/constants";

export default function CartPage() {
  useSEO({ title: "Your Cart | Spiritz", description: "Review your selected premium spirits and proceed to WhatsApp checkout." });
  const { items, totalPrice, updateQuantity, removeItem, totalItems } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const sendToWhatsApp = () => {
    const itemsList = items
      .map(i => `• ${i.name} x${i.quantity} — ₹${(i.price * i.quantity).toLocaleString()}`)
      .join("\n");
    const message =
      `🛒 *Order Details*\n\n${itemsList}\n\n` +
      `*Total: ₹${totalPrice.toLocaleString()}*\n\n` +
      `📍 *Location:* Lucknow\n🏠 *Address:* ${address || "Not provided"}\n` +
      `👤 *Name:* ${name || "Not provided"}\n📱 *Phone:* ${phone || "Not provided"}`;
    window.open(WHATSAPP_CONFIG.getWhatsAppUrl(message), "_blank");
  };

  return (
    <>
      <style>{`
        .cp-page {
          min-height: 100dvh;
          background: #f5f3ef;
          padding: 100px 0 80px;
        }

        .cp-wrap {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 6vw;
        }

        /* ── Header ── */
        .cp-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 44px;
        }

        .cp-back {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid #d4c9b8;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--muted-foreground);
          transition: all 0.25s;
          flex-shrink: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.07);
        }
        .cp-back:hover { border-color: var(--gold); color: var(--gold); }

        .cp-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          display: block;
          margin-bottom: 5px;
        }

        .cp-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 400;
          color: #1a1410;
          line-height: 1;
          letter-spacing: -0.01em;
          margin: 0;
        }

        /* ── Empty ── */
        .cp-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 80px 0;
          gap: 14px;
          text-align: center;
        }
        .cp-empty-icon { font-size: 3.5rem; opacity: 0.25; }
        .cp-empty-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          color: #1a1410;
          margin: 0;
        }
        .cp-empty-p {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: #8a7d6e;
          max-width: 200px;
          line-height: 1.7;
        }
        .cp-empty-cta {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: #1a1410;
          color: #f5f0e8;
          border: none;
          padding: 13px 28px;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.25s, transform 0.15s;
        }
        .cp-empty-cta:hover { background: var(--gold); color: #0a0806; transform: translateY(-1px); }

        /* ── Layout ── */
        .cp-layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 24px;
          align-items: start;
        }

        /* ═══════════════════════════
           LEFT — ITEMS
        ═══════════════════════════ */
        .cp-items-col {
          display: flex;
          flex-direction: column;
          gap: 0;
          background: #fff;
          border-radius: 12px;
          border: 1.5px solid #e0d8ce;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
        }

        /* Items column header strip */
        .cp-items-head {
          padding: 16px 20px 14px;
          border-bottom: 1.5px solid #e0d8ce;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cp-items-head-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #4a4035;
        }

        .cp-items-count {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: var(--gold);
          letter-spacing: 0.05em;
        }

        /* ── Single item row ── */
        .cp-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          border-bottom: 1px solid #ede8e0;
          transition: background 0.2s;
        }
        .cp-row:last-child { border-bottom: none; }
        .cp-row:hover { background: #faf8f4; }

        .cp-row-img {
          width: 64px;
          height: 64px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
          border: 1px solid #e0d8ce;
        }

        .cp-row-info { flex: 1; min-width: 0; }

        .cp-row-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: #1a1410;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.25;
          margin: 0 0 3px;
        }

        .cp-row-cat {
          font-family: 'Montserrat', sans-serif;
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9a8d7e;
          margin-bottom: 10px;
        }

        .cp-row-bottom {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        /* Stepper */
        .cp-stepper {
          display: flex;
          align-items: center;
          background: #f5f0e8;
          border: 1px solid #d4c9b8;
          border-radius: 5px;
          overflow: hidden;
        }

        .cp-step-btn {
          width: 28px;
          height: 26px;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8a7d6e;
          transition: background 0.18s, color 0.18s;
        }
        .cp-step-btn:hover { background: #ede8e0; color: var(--gold); }

        .cp-step-n {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #1a1410;
          width: 28px;
          text-align: center;
          border-left: 1px solid #d4c9b8;
          border-right: 1px solid #d4c9b8;
          line-height: 26px;
        }

        .cp-row-price {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1a1410;
          letter-spacing: -0.01em;
          margin-left: auto;
        }

        .cp-row-del {
          background: none;
          border: none;
          cursor: pointer;
          color: #c5bdb0;
          display: flex;
          padding: 4px;
          flex-shrink: 0;
          transition: color 0.2s;
          border-radius: 4px;
        }
        .cp-row-del:hover { color: #c0402a; background: rgba(192,64,42,0.06); }

        /* ═══════════════════════════
           RIGHT — SUMMARY
        ═══════════════════════════ */
        .cp-summary {
          position: sticky;
          top: 96px;
          background: #fff;
          border-radius: 12px;
          border: 1.5px solid #e0d8ce;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
        }

        /* Gold top bar */
        .cp-summary-bar {
          height: 4px;
          background: linear-gradient(to right, var(--gold), #f2da91, var(--gold));
        }

        .cp-summary-body { padding: 22px 22px 24px; }

        .cp-summary-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #4a4035;
          display: block;
          margin-bottom: 18px;
        }

        /* Breakdown rows */
        .cp-breakdown { margin-bottom: 16px; display: flex; flex-direction: column; gap: 9px; }

        .cp-brow {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
        }

        .cp-brow-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 400;
          color: #7a6e62;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }

        .cp-brow-val {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #1a1410;
          flex-shrink: 0;
        }

        /* Total */
        .cp-total-sep {
          height: 1.5px;
          background: #e0d8ce;
          margin: 0 0 16px;
        }

        .cp-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
        }

        .cp-total-lbl {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }

        .cp-total-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 500;
          color: #1a1410;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        /* Form */
        .cp-form-sep {
          height: 1px;
          background: #ede8e0;
          margin: 0 0 16px;
        }

        .cp-form-lbl {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #9a8d7e;
          display: block;
          margin-bottom: 12px;
        }

        .cp-input {
          width: 100%;
          background: #f8f5f0;
          border: 1.5px solid #d4c9b8;
          border-radius: 6px;
          padding: 11px 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: #1a1410;
          outline: none;
          box-sizing: border-box;
          margin-bottom: 9px;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .cp-input::placeholder { color: #a89b8c; }
        .cp-input:focus {
          border-color: var(--gold);
          background: #fff;
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--gold), transparent 88%);
        }

        /* CTA */
        .cp-cta {
          width: 100%;
          background: #1a1410;
          color: #f5f0e8;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 15px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 16px;
          transition: background 0.25s, transform 0.15s, box-shadow 0.25s;
        }
        .cp-cta:hover {
          background: var(--gold);
          color: #0a0806;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(201,168,76,0.3);
        }
        .cp-cta:hover .cp-wa-svg { fill: #0a0806; }
        .cp-cta:active { transform: translateY(0); }

        .cp-wa-svg {
          width: 14px;
          height: 14px;
          fill: #f5f0e8;
          flex-shrink: 0;
          transition: fill 0.25s;
        }

        .cp-note {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          color: #a89b8c;
          text-align: center;
          line-height: 1.65;
          margin-top: 10px;
          letter-spacing: 0.03em;
        }

        /* ── Responsive ── */
        @media (max-width: 820px) {
          .cp-layout { grid-template-columns: 1fr; }
          .cp-summary { position: static; }
        }

        @media (max-width: 600px) {
          .cp-page { padding-top: 80px; padding-bottom: 100px; }
          .cp-wrap { padding: 0 4vw; }
          .cp-header { margin-bottom: 28px; gap: 14px; }
          .cp-h1 { font-size: 1.6rem; }
          .cp-row { padding: 12px 14px; gap: 12px; }
          .cp-row-img { width: 54px; height: 54px; }
          .cp-items-head { padding: 12px 14px 10px; }
        }

        @media (max-width: 420px) {
          .cp-page { padding-top: 72px; }
          .cp-wrap { padding: 0 3.5vw; }
          .cp-h1 { font-size: 1.4rem; }
          .cp-row-img { width: 46px; height: 46px; border-radius: 6px; }
          .cp-row { padding: 10px 12px; gap: 10px; }
          .cp-summary-body { padding: 16px 16px 18px; }
          .cp-total-val { font-size: 1.6rem; }
          .cp-header { gap: 12px; }
        }
      `}</style>

      <div className="cp-page">
        <div className="cp-wrap">

          {/* Header */}
          <motion.div
            className="cp-header"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="cp-back" onClick={() => navigate(-1)} aria-label="Back">
              <ArrowLeft size={15} strokeWidth={1.5} />
            </button>
            <div>
              <span className="cp-label">Your Selection</span>
              <h1 className="cp-h1">Order Summary</h1>
            </div>
          </motion.div>

          {/* Empty */}
          {items.length === 0 ? (
            <motion.div className="cp-empty"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-[#fdfaf5] border border-[#f0ede8] flex items-center justify-center">
                  <span className="text-4xl grayscale opacity-40">🛒</span>
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary border-2 border-white"
                />
              </div>
              <h2 className="cp-empty-h">Your collection is empty</h2>
              <p className="cp-empty-p" style={{ maxWidth: "260px" }}>Discover our curated selection of fine spirits and perfumes for immediate delivery in {SITE_CONFIG.location}.</p>
              <button className="cp-empty-cta" onClick={() => navigate("/")}>Explore Collection</button>
            </motion.div>
          ) : (
            <div className="cp-layout">

              {/* ── Items ── */}
              <motion.div
                className="cp-items-col"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="cp-items-head">
                  <span className="cp-items-head-title">Items in your bag</span>
                  <span className="cp-items-count">{totalItems} {totalItems === 1 ? "item" : "items"}</span>
                </div>

                <AnimatePresence initial={false}>
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      className="cp-row"
                      layout
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, transition: { duration: 0.18 } }}
                      transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img src={item.image} alt={item.name} className="cp-row-img" loading="lazy" />

                      <div className="cp-row-info">
                        <p className="cp-row-name">{item.name}</p>
                        <p className="cp-row-cat">{item.category}</p>
                        <div className="cp-row-bottom">
                          <div className="cp-stepper">
                            <button className="cp-step-btn" onClick={() => updateQuantity(item.id, -1)}>
                              <Minus size={9} strokeWidth={2.5} />
                            </button>
                            <motion.span
                              key={item.quantity}
                              className="cp-step-n"
                              initial={{ scale: 1.3, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.15 }}
                            >
                              {item.quantity}
                            </motion.span>
                            <button className="cp-step-btn" onClick={() => updateQuantity(item.id, 1)}>
                              <Plus size={9} strokeWidth={2.5} />
                            </button>
                          </div>
                          <span className="cp-row-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>

                      <button className="cp-row-del" onClick={() => removeItem(item.id)} aria-label="Remove">
                        <Trash2 size={14} strokeWidth={1.4} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* ── Summary ── */}
              <motion.div
                className="cp-summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="cp-summary-bar" />
                <div className="cp-summary-body">
                  <span className="cp-summary-title">Price Breakdown</span>

                  <div className="cp-breakdown">
                    {items.map(item => (
                      <div key={item.id} className="cp-brow">
                        <span className="cp-brow-name">{item.name} ×{item.quantity}</span>
                        <span className="cp-brow-val">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="cp-total-sep" />
                  <div className="cp-total-row">
                    <span className="cp-total-lbl">Order Total</span>
                    <motion.span
                      key={totalPrice}
                      className="cp-total-val"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ₹{totalPrice.toLocaleString()}
                    </motion.span>
                  </div>

                  <div className="cp-form-sep" />
                  <span className="cp-form-lbl">Delivery Details</span>

                  <input className="cp-input" type="text" placeholder="Your Name"
                    value={name} onChange={e => setName(e.target.value)} />
                  <input className="cp-input" type="text" placeholder="Address in Lucknow"
                    value={address} onChange={e => setAddress(e.target.value)} />
                  <input className="cp-input" type="tel" placeholder="Phone Number"
                    value={phone} onChange={e => setPhone(e.target.value)} />

                  <button className="cp-cta" onClick={sendToWhatsApp}>
                    <svg className="cp-wa-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Confirm on WhatsApp
                  </button>

                  <p className="cp-note">Orders fulfilled by licensed stores only · 21+ only · Support: {SITE_CONFIG.supportHours}</p>
                </div>
              </motion.div>

            </div>
          )}

        </div>
      </div>
    </>
  );
}