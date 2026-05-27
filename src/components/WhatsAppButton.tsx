import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923478094332?text=Hello%20Zeshan%20Dry%20Fruit!%20I%20would%20like%20to%20place%20an%20order."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green text-primary-foreground rounded-full p-4 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
      aria-label="Order via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
