import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface NavbarProps {
  onCartOpen: () => void;
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [prevCount, setPrevCount] = useState(0);
  const [cartBump, setCartBump] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // On non-homepage routes, always show the opaque nav (no hero behind it)
  const isOpaque = scrolled || location.pathname !== "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (totalItems > prevCount) {
      setCartBump(true);
      setTimeout(() => setCartBump(false), 400);
    }
    setPrevCount(totalItems);
  }, [totalItems]);

  const scrollToFooter = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" }), 300);
    } else {
      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        .navbar-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          /* Promote navbar to its own GPU compositing layer */
          will-change: transform;
          transform: translateZ(0);
        }

        .navbar-inner {
          width: 100%;
          padding: 0 6vw;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          /* Animate only cheap props: background, border */
          transition: background 0.4s ease, border-color 0.4s ease, height 0.35s ease;
          border-bottom: 1px solid transparent;
        }

        .navbar-inner.scrolled {
          height: 60px;
          background: rgba(6, 5, 4, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: rgba(201,168,76,0.12);
        }

        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f5f0e8;
          text-decoration: none;
          line-height: 1;
          transition: color 0.3s;
        }

        .nav-logo .dot {
          color: #C9A84C;
        }

        .nav-logo:hover { color: #fff; }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-contact {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.45);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.3s;
        }

        .nav-contact:hover { color: rgba(245, 240, 232, 0.85); }

        /* Thin vertical divider */
        .nav-divider {
          width: 1px;
          height: 18px;
          background: rgba(245, 240, 232, 0.12);
        }

        .nav-cart-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 9px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 0;
          transition: opacity 0.3s;
        }

        .nav-cart-btn:hover { opacity: 0.75; }

        .cart-icon {
          width: 18px;
          height: 18px;
          color: #f5f0e8;
          flex-shrink: 0;
        }

        .cart-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.5);
          transition: color 0.3s;
          display: none;
        }

        @media (min-width: 640px) {
          .cart-label { display: block; }
        }

        .nav-cart-btn:hover .cart-label { color: rgba(245,240,232,0.9); }

        .cart-badge {
          position: absolute;
          top: 2px;
          right: -10px;
          width: 16px;
          height: 16px;
          background: #C9A84C;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 600;
          color: #0a0806;
          letter-spacing: 0;
        }

        @media (max-width: 480px) {
          .nav-contact { display: none; }
          .nav-divider { display: none; }
        }
      `}</style>

      <motion.div
        className="navbar-root"
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className={`navbar-inner ${isOpaque ? "scrolled" : ""}`}>

          {/* Logo */}
          <Link to="/" className="nav-logo">
            Spiritz<span className="dot">.</span>
          </Link>

          {/* Right */}
          <div className="nav-right">
            <button className="nav-contact" onClick={scrollToFooter}>
              Contact
            </button>

            <div className="nav-divider" />

            <motion.button
              className="nav-cart-btn"
              onClick={onCartOpen}
              animate={cartBump ? { y: [0, -4, 0] } : {}}
              transition={{ duration: 0.35, ease: "easeOut" }}
              aria-label="Open cart"
            >
              {/* Minimal bag icon */}
              <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>

              <span className="cart-label">Bag</span>

              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  className="cart-badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </motion.button>
          </div>

        </nav>
      </motion.div>
    </>
  );
}