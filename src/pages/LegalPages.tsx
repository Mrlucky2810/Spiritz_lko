import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

function LegalPage({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  useSEO({ title: `${title} | Spiritz`, description: subtitle });
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#faf9f7] pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <div>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "4px" }}>
              Legal
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 400, color: "var(--foreground)", margin: 0, lineHeight: 1.1 }}>
              {title}
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-border rounded-2xl shadow-sm p-6 sm:p-8"
        >
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10.5px", color: "#9a8d7e", marginBottom: "28px", letterSpacing: "0.03em" }}>
            {subtitle} &middot; Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 500, color: "var(--foreground)", margin: "28px 0 8px" }}>
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11.5px", color: "#5a5047", lineHeight: 1.9, letterSpacing: "0.02em", margin: "0 0 6px" }}>
      {children}
    </p>
  );
}

/* ══════════════════════════════ TERMS ══ */
export function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" subtitle="Please read these terms carefully before using Spiritz">
      <H2>1. Acceptance of Terms</H2>
      <P>By accessing or using the Spiritz platform — whether through our website or WhatsApp-based ordering service — you confirm that you are at least 21 years of age and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</P>

      <H2>2. Nature of Service</H2>
      <P>Spiritz is a technology-enabled intermediary platform that connects customers in Lucknow, Uttar Pradesh, with nearby licensed liquor retail stores (Government-licensed IMFL/beer shops). Spiritz does not manufacture, warehouse, distribute, or sell alcohol in any form. All product sales are executed by the respective licensed store.</P>

      <H2>3. Age Verification</H2>
      <P>The purchase and consumption of alcohol is legally prohibited for persons under 21 years of age in Uttar Pradesh. By placing an order through Spiritz, you declare that you are 21 years of age or older. We reserve the right to refuse service and cancel any order if age verification cannot be confirmed at the time of delivery.</P>

      <H2>4. Order Placement & Confirmation</H2>
      <P>Orders are initiated via the Spiritz website and confirmed through WhatsApp. A final order confirmation is provided by our team after verifying stock availability with the nearest licensed store. Placing an order on our platform does not constitute a guaranteed sale until the store confirms availability.</P>

      <H2>5. Pricing</H2>
      <P>Prices displayed on the platform are indicative and based on the latest MRP (Maximum Retail Price) as declared by the Uttar Pradesh government excise department. Actual pricing may vary slightly based on the specific licensed store fulfilling the order. Final pricing will always be confirmed before order dispatch.</P>

      <H2>6. Delivery & Pickup</H2>
      <P>Spiritz facilitates order coordination between customers and licensed stores. Delivery or pickup arrangements are made directly with the store partner. Spiritz does not operate its own delivery fleet. Service is available within Lucknow municipal limits only.</P>

      <H2>7. Cancellations</H2>
      <P>Orders may be cancelled before dispatch confirmation from the licensed store. Once a store has confirmed and dispatched the order, cancellation requests may not be accommodated. For cancellations, contact us immediately via WhatsApp at +91 73551 03401.</P>

      <H2>8. Prohibited Use</H2>
      <P>You agree not to misuse this platform for bulk commercial purchasing, resale, or any activity that violates applicable excise laws of Uttar Pradesh or the Excise Policy of the Government of India.</P>

      <H2>9. Governing Law</H2>
      <P>These Terms shall be governed by and construed in accordance with the laws of Uttar Pradesh, India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Lucknow.</P>

      <H2>10. Modifications</H2>
      <P>Spiritz reserves the right to modify these Terms at any time. Continued use of the platform after such changes constitutes your acceptance of the revised Terms.</P>
    </LegalPage>
  );
}

/* ══════════════════════════════ PRIVACY ══ */
export function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" subtitle="How Spiritz collects, uses, and protects your information">
      <H2>1. Information We Collect</H2>
      <P>When you place an order through Spiritz, we collect information you voluntarily provide via WhatsApp, including your full name, delivery address (within Lucknow), and mobile phone number. We do not collect payment card details, bank information, or any biometric data.</P>

      <H2>2. How We Use Your Information</H2>
      <P>Your information is used solely to coordinate your order with the appropriate licensed liquor store partner. We use your mobile number to send order updates over WhatsApp and to facilitate delivery logistics. We do not use your data for advertising, profiling, or any purpose beyond order fulfilment.</P>

      <H2>3. Data Sharing</H2>
      <P>Your name, address, and phone number are shared with the specific licensed store fulfilling your order. This is strictly necessary for delivery purposes. We do not sell, rent, or share your data with any third party for commercial, marketing, or analytical purposes.</P>

      <H2>4. WhatsApp Communication</H2>
      <P>Our ordering process is facilitated through WhatsApp (operated by Meta Platforms, Inc.). Any data shared through WhatsApp is also subject to WhatsApp's Privacy Policy and Terms of Service. We recommend reviewing those at whatsapp.com/legal before using our service.</P>

      <H2>5. Data Storage</H2>
      <P>Spiritz does not maintain a centralised database of customer orders. Order data exchanged via WhatsApp is stored within WhatsApp's messaging infrastructure. Cart data on the Spiritz website is stored locally in your browser's session memory and is cleared when you close the tab.</P>

      <H2>6. Cookies</H2>
      <P>The Spiritz website uses minimal session cookies to maintain cart state and improve browsing experience. No personally identifiable information is stored in cookies. You may disable cookies in your browser settings, though this may affect functionality.</P>

      <H2>7. Data Retention</H2>
      <P>We retain your order-related contact information only as long as necessary to complete and confirm your order. This data is not archived beyond the scope of a single transaction unless required by law.</P>

      <H2>8. Your Rights</H2>
      <P>You have the right to request deletion of your personal data, opt out of WhatsApp communication, or request a copy of the information we hold about you. To exercise these rights, contact us at hello@spiritz.in or WhatsApp us at +91 73551 03401.</P>

      <H2>9. Contact</H2>
      <P>For any privacy-related concerns, please email hello@spiritz.in or reach us on WhatsApp at +91 73551 03401. We aim to respond within 48 business hours.</P>
    </LegalPage>
  );
}

/* ══════════════════════════════ DISCLAIMER ══ */
export function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" subtitle="Important notices regarding the use of Spiritz">
      <H2>1. Intermediary Platform</H2>
      <P>Spiritz is strictly a technology platform that acts as a facilitator between customers and licensed liquor retailers in Lucknow, Uttar Pradesh. Spiritz is NOT a liquor retailer, distributor, importer, or manufacturer. All alcohol sales are made exclusively by Government-licensed IMFL/FL-2/beer shop licensees registered under the U.P. Excise Act.</P>

      <H2>2. Health Warning</H2>
      <P>Alcohol consumption is injurious to health. Excessive drinking causes liver disease, impairs judgment, and can be fatal. Spiritz strongly encourages responsible consumption. Do not consume alcohol if you are pregnant, on medication, operating heavy machinery, or driving a vehicle.</P>

      <H2>3. Legal Age</H2>
      <P>The legal age for consuming alcohol in Uttar Pradesh is 21 years. Spiritz strictly prohibits the facilitation of alcohol purchase for any individual below this age. If delivery personnel have reasonable doubt about a customer's age, they are authorised to request a government-issued photo ID and may refuse delivery.</P>

      <H2>4. Product Availability</H2>
      <P>Product listings and images on the Spiritz platform are for informational purposes only. Actual stock availability is subject to live inventory at the licensed store. Spiritz makes no warranty or guarantee regarding the continuous availability of any listed product.</P>

      <H2>5. Pricing Accuracy</H2>
      <P>Prices displayed on the platform are based on the latest Uttar Pradesh State Excise price list and may be subject to revisions by the state government without prior notice. Spiritz strives to keep prices updated but is not liable for discrepancies caused by government price revisions.</P>

      <H2>6. Geographic Limitation</H2>
      <P>Spiritz operates exclusively within the municipal limits of Lucknow, Uttar Pradesh, India. We do not facilitate, support, or enable alcohol orders outside this jurisdiction. Cross-border or inter-state alcohol transportation is strictly prohibited under applicable excise laws.</P>

      <H2>7. Limitation of Liability</H2>
      <P>Spiritz shall not be held liable for delays caused by third-party store partners, product quality complaints post-delivery, losses arising from incorrect contact information provided by the customer, or system unavailability. Our liability is strictly limited to coordinating the order connection.</P>

      <H2>8. Regulatory Compliance</H2>
      <P>Users of the Spiritz platform are solely responsible for ensuring their own compliance with all applicable laws regarding the legal purchase, possession, and consumption of alcohol in Uttar Pradesh, India.</P>
    </LegalPage>
  );
}

/* ══════════════════════════════ REFUND ══ */
export function RefundPage() {
  return (
    <LegalPage title="Refund Policy" subtitle="Understanding our cancellation and refund process">
      <H2>1. No Online Payment</H2>
      <P>Spiritz does not currently process any online payments. All transactions are cash-on-delivery arrangements handled directly between the customer and the licensed store partner. As no digital payment is collected by Spiritz, digital refunds are not applicable through our platform.</P>

      <H2>2. Order Cancellation</H2>
      <P>You may cancel your order at no cost before the licensed store has confirmed and dispatched it. To cancel, contact us immediately via WhatsApp at +91 73551 03401 with your order details. Cancellations after dispatch cannot be guaranteed and are at the discretion of the store partner.</P>

      <H2>3. Eligible Refund Scenarios</H2>
      <P>A refund or replacement consideration may be raised with the store partner in the following circumstances:</P>
      <P>• The incorrect product (brand, variant, or volume) was delivered.</P>
      <P>• The product was visibly damaged, tampered with, or had a broken seal upon delivery.</P>
      <P>• The order was confirmed but never fulfilled or delivered without explanation.</P>
      <P>Refund eligibility does not apply to: change of mind after delivery, products damaged due to mishandling after receipt, or products that have been opened.</P>

      <H2>4. Raising a Refund Request</H2>
      <P>To raise a concern, contact us via WhatsApp at +91 73551 03401 or email hello@spiritz.in within 2 hours of delivery. Please share your order details, the issue faced, and clear photographic evidence where applicable. We will coordinate with the licensed store partner on your behalf.</P>

      <H2>5. Resolution Timeline</H2>
      <P>Once a valid request is raised, Spiritz will liaise with the relevant store partner to investigate and provide a resolution within 24–48 business hours. The final resolution — replacement, partial refund, or rejection — rests with the licensed store partner as the seller of record.</P>

      <H2>6. Exclusions</H2>
      <P>Spiritz is not liable for refunds arising from: orders cancelled after dispatch, incorrect addresses or phone numbers provided by the customer, delays due to traffic or external conditions, or customer unavailability at the time of delivery.</P>

      <H2>7. Contact for Support</H2>
      <P>WhatsApp: +91 73551 03401 (available 10 AM – 10 PM daily)</P>
      <P>Email: hello@spiritz.in</P>
    </LegalPage>
  );
}
