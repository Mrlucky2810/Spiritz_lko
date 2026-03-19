import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface MobileStickyCartProps {
  onCartOpen: () => void;
}

export default function MobileStickyCart({ onCartOpen }: MobileStickyCartProps) {
  const { totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden px-4 pt-2"
          style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom, 16px))" }}
        >
          <button
            onClick={onCartOpen}
            className="w-full amber-gradient text-white font-bold py-4 rounded-2xl shadow-amber flex items-center justify-between px-5 border border-primary/20 backdrop-blur-sm active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-primary text-[9px] font-black rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              </div>
              <span>View Bag</span>
            </div>
            <span className="font-black text-lg">₹{totalPrice.toLocaleString()}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
