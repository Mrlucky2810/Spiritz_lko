import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/context/CartContext";
import { products } from "@/data/products";

const CATEGORIES = ["All", "Beer", "Whisky", "Vodka", "Rum"];

function CartButton({ product }: { product: Product }) {
  const { addItem, updateQuantity, getQuantity } = useCart();
  const qty = getQuantity(product.id);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {qty === 0 ? (
        <motion.button
          key="add"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          onClick={() => addItem(product)}
          className="pc-add-btn"
        >
          + Add to Cart
        </motion.button>
      ) : (
        <motion.div
          key="qty"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="pc-qty-row"
        >
          <button
            onClick={() => updateQuantity(product.id, -1)}
            className="pc-qty-btn"
          >
            <Minus size={13} />
          </button>
          <motion.span
            key={qty}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
            className="pc-qty-num"
          >
            {qty}
          </motion.span>
          <button
            onClick={() => updateQuantity(product.id, 1)}
            className="pc-qty-btn"
          >
            <Plus size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      className="pc-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
    >
      {/* Image */}
      <div className="pc-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="pc-img"
        />
        {product.badge && (
          <span className="pc-badge">{product.badge}</span>
        )}
        <span className="pc-cat-tag">{product.category}</span>
      </div>

      {/* Body */}
      <div className="pc-body">
        <h3 className="pc-name">{product.name}</h3>
        <div className="pc-price-row">
          <span className="pc-price">₹{product.price.toLocaleString()}</span>
          <span className="pc-unit">/ bottle</span>
        </div>
        <CartButton product={product} />
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const handler = (e: Event) => {
      const cat = (e as CustomEvent).detail as string;
      const label = CATEGORIES.find(c => c.toLowerCase() === cat.toLowerCase());
      if (label) setActiveCategory(label);
    };
    window.addEventListener("filterCategory", handler);
    return () => window.removeEventListener("filterCategory", handler);
  }, []);

  const filtered = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      <style>{`
        .ps-section {
          padding: 100px 6vw;
          background: #fff;
        }

        /* ── Header ── */
        .ps-header {
          text-align: center;
          margin-bottom: 44px;
        }

        .ps-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #C9A84C;
          display: block;
          margin-bottom: 12px;
        }

        .ps-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.9rem, 3vw, 2.75rem);
          font-weight: 400;
          color: #1a1714;
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 10px;
        }

        .ps-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: rgba(26, 23, 20, 0.4);
          margin: 0;
        }

        /* ── Filter Pills ── */
        .ps-filters {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }

        .ps-filter-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 9px 22px;
          border-radius: 100px;
          border: 1px solid rgba(26, 23, 20, 0.12);
          background: transparent;
          color: rgba(26, 23, 20, 0.45);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .ps-filter-btn:hover {
          border-color: rgba(201, 168, 76, 0.5);
          color: #1a1714;
        }

        .ps-filter-btn.active {
          background: #1a1714;
          border-color: #1a1714;
          color: #f5f0e8;
        }

        /* ── Grid ── */
        .ps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Card ── */
        .pc-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(26, 23, 20, 0.07);
          display: flex;
          flex-direction: column;
          cursor: default;
          transition: box-shadow 0.3s ease;
        }

        .pc-card:hover {
          box-shadow: 0 12px 40px rgba(26, 23, 20, 0.1);
        }

        .pc-img-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #f0ede8;
        }

        .pc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.65s ease;
          display: block;
        }

        .pc-card:hover .pc-img {
          transform: scale(1.04);
        }

        .pc-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background: #1a1714;
          color: #f5f0e8;
          padding: 4px 10px;
          border-radius: 100px;
        }

        .pc-cat-tag {
          position: absolute;
          top: 10px;
          right: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.92);
          color: rgba(26,23,20,0.6);
          padding: 4px 10px;
          border-radius: 100px;
          backdrop-filter: blur(4px);
        }

        /* ── Card body ── */
        .pc-body {
          padding: 16px 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 0;
          flex: 1;
        }

        .pc-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 500;
          color: #1a1714;
          line-height: 1.2;
          margin: 0 0 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pc-price-row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 14px;
        }

        .pc-price {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #C9A84C;
          letter-spacing: -0.01em;
        }

        .pc-unit {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 400;
          color: rgba(26, 23, 20, 0.35);
          letter-spacing: 0.03em;
        }

        /* ── Add to Cart button ── */
        .pc-add-btn {
          width: 100%;
          background: #1a1714;
          color: #f5f0e8;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.25s, transform 0.15s;
          margin-top: auto;
        }

        .pc-add-btn:hover {
          background: #2d2820;
        }

        .pc-add-btn:active {
          transform: scale(0.98);
        }

        /* ── Qty stepper ── */
        .pc-qty-row {
          display: flex;
          align-items: center;
          border: 1px solid rgba(201, 168, 76, 0.3);
          border-radius: 6px;
          overflow: hidden;
          margin-top: auto;
        }

        .pc-qty-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #C9A84C;
          transition: background 0.2s;
        }

        .pc-qty-btn:hover {
          background: rgba(201, 168, 76, 0.08);
        }

        .pc-qty-num {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1a1714;
          width: 28px;
          text-align: center;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .ps-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
          .ps-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .ps-section { padding: 60px 5vw 80px; }
          .ps-header { margin-bottom: 32px; }
          .ps-filters { margin-bottom: 32px; gap: 6px; }
          .ps-filter-btn { padding: 7px 16px; font-size: 9px; }
          .ps-title { font-size: 1.7rem; }
        }

        @media (max-width: 480px) {
          .ps-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .ps-section { padding: 52px 4vw 72px; }
          .pc-body { padding: 12px 12px 14px; }
          .pc-name { font-size: 1rem; }
          .pc-price { font-size: 0.95rem; }
          .pc-add-btn { padding: 10px; font-size: 9px; }
          .ps-subtitle { display: none; }
        }

        @media (max-width: 340px) {
          .ps-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="ps-section" id="products">

        {/* Header */}
        <motion.div
          className="ps-header"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="ps-eyebrow">Our Selection</span>
          <h2 className="ps-title">Featured Products</h2>
          <p className="ps-subtitle">Order from Nearby Licensed Liquor Stores in Lucknow</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="ps-filters"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`ps-filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="ps-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

      </section>
    </>
  );
}