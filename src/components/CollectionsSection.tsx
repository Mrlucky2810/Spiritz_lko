import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { categories } from "@/data/products";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function CollectionsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const scrollToProducts = (cat: string) => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("filterCategory", { detail: cat }));
  };

  return (
    <>
      <style>{`
        .collections-section {
          padding: 100px 6vw;
          background: #faf9f7;
        }

        .collections-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .collections-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 14px;
          display: block;
        }

        .collections-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.9rem, 3vw, 2.8rem);
          font-weight: 400;
          color: #1a1714;
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .collections-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cat-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          /* Refined aspect ratio — not too tall */
          aspect-ratio: 3 / 4;
          background: #e8e4df;
        }

        .cat-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
          display: block;
        }

        .cat-card:hover img {
          transform: scale(1.04);
        }

        .cat-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 8, 6, 0.82) 0%,
            rgba(10, 8, 6, 0.28) 45%,
            rgba(10, 8, 6, 0.04) 100%
          );
          transition: opacity 0.4s;
        }

        .cat-card:hover .cat-card-overlay {
          opacity: 0.9;
        }

        .cat-card-text {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 20px 22px;
        }

        .cat-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          color: #f5f0e8;
          line-height: 1.1;
          margin: 0 0 6px;
          letter-spacing: 0.01em;
        }

        .cat-explore {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.55);
          display: flex;
          align-items: center;
          gap: 5px;
          transition: color 0.3s, gap 0.3s;
        }

        .cat-card:hover .cat-explore {
          color: #C9A84C;
          gap: 8px;
        }

        @media (max-width: 900px) {
          .collections-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 520px) {
          .collections-section { padding: 56px 5vw; }
          .collections-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .cat-card { aspect-ratio: 3 / 4; border-radius: 12px; }
          .cat-name { font-size: 1.1rem; }
          .cat-explore { font-size: 9px; }
          .cat-card-text { padding: 14px 14px 16px; }
          .collections-header { margin-bottom: 28px; }
          .collections-title { font-size: 1.7rem; }
        }

        @media (max-width: 340px) {
          .collections-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="collections-section" id="collections">
        {/* Header */}
        <motion.div
          className="collections-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="collections-eyebrow">Curated For You</span>
          <h2 className="collections-title">Browse by Category</h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          className="collections-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              className="cat-card"
              variants={cardVariants}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={() => scrollToProducts(cat.id)}
            >
              <img src={cat.image} alt={cat.name} loading="lazy" />
              <div className="cat-card-overlay" />
              <div className="cat-card-text">
                <h3 className="cat-name">{cat.name}</h3>
                <span className="cat-explore">
                  Explore <span>→</span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}

