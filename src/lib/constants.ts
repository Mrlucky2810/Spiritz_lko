export const WHATSAPP_CONFIG = {
  phoneNumber: "917355103401",
  getWhatsAppUrl: (message: string) => 
    `https://wa.me/917355103401?text=${encodeURIComponent(message)}`,
  defaultMessage: "Hi, I want to order liquor in Lucknow",
};

export const SITE_CONFIG = {
  name: "Spiritz",
  location: "Lucknow",
  email: "hello@spiritz.in",
  phoneNumber: "+91 73551 03401",
  supportHours: "10 AM – 10 PM daily",
};
