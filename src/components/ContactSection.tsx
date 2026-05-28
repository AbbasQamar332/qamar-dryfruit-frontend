import { useState } from "react";
import { Phone, MapPin, Clock, Mail, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useCreateMessage, useSettings } from "@/hooks/useData";

function splitCsv(s?: string | null) {
  if (!s) return [];
  return String(s)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}


export default function ContactSection() {
  const createMessage = useCreateMessage();
  const { data: settings } = useSettings();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMessage.mutateAsync(form);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      toast.error(err.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Contact Us
          </h2>
          <p className="text-muted-foreground mt-3">We&apos;d love to hear from you</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Phone,
                title: "Phone",
                lines: splitCsv(settings?.phone_numbers),
              },
              {
                icon: Mail,
                title: "Email",
                lines: splitCsv(settings?.email_addresses),
              },
              {
                icon: MapPin,
                title: "Location",
                lines: settings?.physical_address ? [String(settings.physical_address)] : ["Gilgit Baltistan, Pakistan"],
              },
              {
                icon: Clock,
                title: "Working Hours",
                lines: ["Mon - Sat: 9:00 AM - 8:00 PM"],
              },
            ]
              .filter((c) => c.lines.length > 0)
              .map((c) => (
                <div key={c.title} className="bg-card rounded-xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{c.title}</h3>
                  {c.lines.map((line) => (
                    <p key={line} className="text-sm text-muted-foreground">{line}</p>
                  ))}
                </div>
              ))}
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full" disabled={createMessage.isPending}>
                {createMessage.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

