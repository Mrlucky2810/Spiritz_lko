import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/lib/constants";
import { useCart } from "@/context/CartContext";
import { useLocation } from "react-router-dom";

export default function FloatingWhatsApp() {
  const { totalItems } = useCart();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const isCartPage = location.pathname === "/cart";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Shift up if MobileStickyCart is visible (mobile + totalItems > 0 and not on cart page)
  const shouldShiftUp = isMobile && totalItems > 0 && !isCartPage;

  return (
    <motion.a
      href={WHATSAPP_CONFIG.getWhatsAppUrl(WHATSAPP_CONFIG.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: shouldShiftUp ? -70 : 0 
      }}
      transition={{ 
        delay: 1.5, 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        y: { type: "spring", stiffness: 300, damping: 30 }
      }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 pulse-amber"
      style={{ boxShadow: "0 0 0 0 rgba(34,197,94,0.4)" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </motion.a>
  );
}
