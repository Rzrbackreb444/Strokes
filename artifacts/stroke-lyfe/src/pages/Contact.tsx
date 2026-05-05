import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContact } from "@workspace/api-client-react";
import { Mail } from "lucide-react";

const topics = [
  { value: "general", label: "General inquiry" },
  { value: "scholarship", label: "Scholarship application" },
  { value: "donation", label: "Donation question" },
  { value: "press", label: "Press / media" },
  { value: "volunteer", label: "Volunteering" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", topic: "general", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const submitContact = useSubmitContact({
    mutation: {
      onSuccess: () => {
        setSubmitted(true);
        setForm({ name: "", email: "", topic: "general", message: "" });
      },
      onError: () => {
        toast({ title: "Couldn't send message", description: "Try again in a moment or email us directly.", variant: "destructive" });
      },
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submitContact.mutate({ name: form.name, email: form.email, topic: form.topic, message: form.message });
  }

  return (
    <div>
      {/* HERO */}
      <section className="py-20 bg-foreground text-background" data-testid="section-contact-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Get in Touch</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">We answer real emails.</h1>
          <p className="mt-4 text-background/70 max-w-xl text-lg">
            No ticket system. No bot. Nick or a team member will get back to you within 48 hours.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" data-testid="section-contact-form">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <Card data-testid="card-contact-success">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Message received.</h2>
                    <p className="text-muted-foreground">We'll get back to you within 48 hours. If it's urgent, email us directly at hello@strokelyfe.org.</p>
                    <Button className="mt-6" variant="outline" onClick={() => setSubmitted(false)} data-testid="button-send-another">
                      Send another message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <form onSubmit={handleSubmit} data-testid="form-contact" className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            className="mt-1"
                            data-testid="input-contact-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                            className="mt-1"
                            data-testid="input-contact-email"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="topic">Topic</Label>
                        <Select value={form.topic} onValueChange={(v) => setForm((prev) => ({ ...prev, topic: v }))}>
                          <SelectTrigger id="topic" className="mt-1" data-testid="select-contact-topic">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {topics.map((t) => (
                              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          rows={5}
                          required
                          className="mt-1"
                          data-testid="input-contact-message"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={submitContact.isPending}
                        data-testid="button-contact-submit"
                      >
                        {submitContact.isPending ? "Sending..." : "Send message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-muted rounded-lg p-5">
                <h3 className="font-serif font-bold text-foreground mb-4">Reach us directly</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">General</p>
                    <a href="mailto:hello@strokelyfe.org" className="text-sm text-primary hover:underline" data-testid="link-email-general">hello@strokelyfe.org</a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Donations</p>
                    <a href="mailto:donate@strokelyfe.org" className="text-sm text-primary hover:underline" data-testid="link-email-donate">donate@strokelyfe.org</a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Press &amp; Media</p>
                    <a href="mailto:press@strokelyfe.org" className="text-sm text-primary hover:underline" data-testid="link-email-press">press@strokelyfe.org</a>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-5">
                <h3 className="font-serif font-bold text-foreground mb-2">Mailing address</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Stroke Lyfe Inc.<br />
                  622 South River Rd.<br />
                  Lavaca, AR 72941
                </p>
              </div>

              <div className="bg-muted rounded-lg p-5">
                <h3 className="font-serif font-bold text-foreground mb-2">Response time</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We respond to all messages within 48 business hours. Scholarship inquiries are prioritized and typically answered same-day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
