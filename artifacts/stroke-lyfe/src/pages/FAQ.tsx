import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    section: "About Stroke Lyfe",
    items: [
      {
        q: "What is Stroke Lyfe?",
        a: "Stroke Lyfe Inc. is a 501(c)(3) nonprofit founded by stroke survivor Nick Kremers. Our mission is to give every stroke survivor access to real recovery tools — regardless of income or insurance status. We fund scholarships into Stroke Recovery Academy and connect survivors to each other and to family support resources.",
      },
      {
        q: "Is Stroke Lyfe the same as Stroke Recovery Academy?",
        a: "No. Stroke Recovery Academy is a for-profit recovery platform built by Nick Kremers. Stroke Lyfe Inc. is the nonprofit. Donations to Stroke Lyfe are tax-deductible and go directly toward funding survivor access to the Academy. The two organizations are separate.",
      },
      {
        q: "Is Stroke Lyfe a real nonprofit?",
        a: "Yes. Stroke Lyfe Inc. is registered as a 501(c)(3) public charity with EIN 99-1313589, verified on GuideStar / Candid. We are based in Lavaca, Arkansas and are in our first year of operation.",
      },
    ],
  },
  {
    section: "Donating",
    items: [
      {
        q: "Is my donation tax-deductible?",
        a: "Yes. Donations to Stroke Lyfe Inc. are tax-deductible to the fullest extent of the law. EIN: 99-1313589. You will receive a receipt for your records.",
      },
      {
        q: "Where does my money go?",
        a: "87 cents of every dollar goes directly to survivor programs — primarily funding scholarships into Stroke Recovery Academy. 9% covers operations and 4% covers fundraising. These are our intended allocations; as a new nonprofit we will publish actual figures in our annual report.",
      },
      {
        q: "Can I make a recurring donation?",
        a: "Yes. Monthly giving is available on our Donate page. Monthly donors are the backbone of what we're building — they let us commit to survivors on the waitlist with confidence.",
      },
      {
        q: "Can I donate in honor or memory of someone?",
        a: "Yes. On the Donate page you can add a tribute name and a notification email. We will reach out to that person (or their family) to let them know.",
      },
      {
        q: "Can I gift a scholarship directly to a specific survivor?",
        a: "Yes. Visit our Gift page to fund a scholarship for a named person or for the next survivor on the waitlist. You'll receive a notification when they activate their access.",
      },
    ],
  },
  {
    section: "For Survivors",
    items: [
      {
        q: "How do I apply for a scholarship?",
        a: "Contact us at hello@strokelyfe.org or use the contact form. There's no formal application — just reach out, tell us your situation, and we'll work through the waitlist in order. No application fees, ever.",
      },
      {
        q: "What does a scholarship cover?",
        a: "Scholarships fund access to Stroke Recovery Academy at one of three tiers: $97 (Survivor), $297 (Mentored — 3 months of group coaching), or $997 (Elite — 1:1 coaching with Nick and a custom recovery plan). We fund the tier that best fits your needs.",
      },
      {
        q: "I had my stroke years ago. Is it too late?",
        a: "No. Neuroplasticity doesn't have a deadline. Nick's biggest recovery wins came in years four through seven — not the first year. You are not too late. You are not too recovered.",
      },
      {
        q: "How do I submit my recovery story?",
        a: "Visit our Submit Story page. We review every submission personally and reach out before anything is published. Your story could be the thing that gets someone else through tomorrow.",
      },
    ],
  },
  {
    section: "For Families & Caregivers",
    items: [
      {
        q: "Does Stroke Lyfe have resources for caregivers?",
        a: "Yes. Our Family Support program provides guides, toolkits, and a private community for partners, parents, and children navigating recovery alongside a survivor. Caregiver grief is real and your questions deserve real answers.",
      },
      {
        q: "My loved one had a stroke. Where do I start?",
        a: "Start by contacting us — hello@strokelyfe.org. We can point you to the right resources based on where you are in the process. If you're in the early days post-discharge, we especially want to hear from you.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start justify-between gap-4 py-4 group"
        data-testid={`faq-item-${q.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
      >
        <span className="font-medium text-foreground text-sm leading-relaxed">{q}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="text-sm text-muted-foreground leading-relaxed pb-4 pr-8">{a}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div>
      <section className="py-20 bg-foreground text-background" data-testid="section-faq-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Questions</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Frequently asked questions.</h1>
          <p className="mt-4 text-background/70 max-w-xl text-lg">
            Can't find what you're looking for? Email us at <a href="mailto:hello@strokelyfe.org" className="text-primary hover:underline">hello@strokelyfe.org</a> — we answer real emails.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" data-testid="section-faq-list">
        <div className="container mx-auto px-4 max-w-3xl space-y-12">
          {faqs.map((section) => (
            <div key={section.section}>
              <h2 className="font-serif text-xl font-bold text-foreground mb-2">{section.section}</h2>
              <div className="bg-muted rounded-lg px-5">
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-muted border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">We respond within 48 hours. Scholarship inquiries are answered same-day.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild data-testid="button-faq-contact">
              <Link href="/contact">Contact us</Link>
            </Button>
            <Button asChild variant="outline" data-testid="button-faq-donate">
              <Link href="/donate">Donate</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
