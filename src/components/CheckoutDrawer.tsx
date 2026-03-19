import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CheckoutDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CheckoutDrawer({ open, onClose }: CheckoutDrawerProps) {
  const { items, totalPrice, updateQuantity, removeItem, clearCart, totalItems } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const sendToWhatsApp = () => {
    const itemsList = items
      .map(i => `• ${i.name} x${i.quantity} — ₹${(i.price * i.quantity).toLocaleString()}`)
      .join("\n");

    const message =
      `🛒 *Order Details*\n\n` +
      `${itemsList}\n\n` +
      `*Total: ₹${totalPrice.toLocaleString()}*\n\n` +
      `📍 *Location:* Lucknow\n` +
      `🏠 *Address:* ${address || "Not provided"}\n` +
      `👤 *Name:* ${name || "Not provided"}\n` +
      `📱 *Phone:* ${phone || "Not provided"}`;

    const url = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer - bottom on mobile, right on desktop */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-card z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h2 className="font-bold text-lg text-foreground">Your Cart</h2>
                <p className="text-muted-foreground text-sm">{totalItems} items • ₹{totalPrice.toLocaleString()}</p>
              </div>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors">
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                  <MessageCircle className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm font-medium">Your cart is empty</p>
                  <p className="text-xs mt-1">Browse our collection and add your favorite spirits!</p>
                </div>
              )}

              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-3 p-3 bg-background rounded-xl"
                  >
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 bg-muted rounded-lg">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:bg-border rounded-l-lg transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:bg-border rounded-r-lg transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-primary">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="self-start p-1 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Checkout Form */}
            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Address (Lucknow)"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
                />

                {/* Total */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-foreground font-bold">Order Total</span>
                  <span className="text-xl font-black text-primary">₹{totalPrice.toLocaleString()}</span>
                </div>

                <button
                  onClick={sendToWhatsApp}
                  className="w-full amber-gradient text-primary-foreground font-bold py-3.5 rounded-xl shadow-amber hover:shadow-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  Confirm Order on WhatsApp
                </button>

                <p className="text-[10px] text-muted-foreground text-center leading-tight">
                  By confirming, you agree to our terms. Orders fulfilled by licensed stores only.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
