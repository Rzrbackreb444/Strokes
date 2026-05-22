import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import {
  Building2,
  Car,
  Users,
  FlaskConical,
  Heart,
  ArrowRight,
  Mail,
  CheckCircle2,
} from "lucide-react";

const visionItems = [
  {
    icon: <Building2 className="h-8 w-8 text-accent" />,
    phase: "Phase 2",
    title: "The Stroke Lyfe Recovery Center",
    description:
      "A dedicated rehabilitation facility purpose-built for stroke survivors — part intensive clinic, part community retreat, part research site. Nothing like it currently exists.",
    details: [
      "Intensive neuroplasticity programming — 6+ hours per day, the dose the brain actually needs",
      "On-site TMS, CIMT, VR therapy, and brain-computer interface training",
      "Residential retreat component: survivors spend days or weeks recovering alongside peers",
      "Caregiver integration — family members welcomed as full participants",
      "Research partnerships that generate outcome data advancing the whole field",
    ],
    why: "Standard rehab gives survivors 13 minutes of active therapy per day before insurance cuts them off. We're building the place that takes over where the medical system stops.",
    testId: "card-vision-center",
  },
  {
    icon: <Car className="h-8 w-8 text-accent" />,
    phase: "Phase 2",
    title: "Vehicle Independence Program",
    description:
      "Funding adaptive driving evaluations and vehicle modifications so survivors can drive themselves to their own appointments — and reclaim the independence that stroke takes away.",
    details: [
      "Funded CDRS (Certified Driving Rehab Specialist) evaluations for qualifying survivors",
      "Equipment grants for hand controls, spinner knobs, swivel seats, and left-foot accelerators",
      "Partnerships with adaptive vehicle modification companies for reduced-cost installs",
      "Coordination with state vocational rehab offices to layer available funding",
    ],
    why: "Insurance doesn't cover adaptive vehicle modifications. A basic hand control setup runs $800-$2,000. A full wheelchair-accessible conversion can reach $60,000. We fund what insurance won't.",
    testId: "card-vision-vehicle",
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    phase: "Phase 1 — Active",
    title: "Social Recovery & Peer Connection",
    description:
      "Stroke devastates social life. Friends disappear. Events feel impossible. We're building the programs that put life back into living — and these are running now.",
    details: [
      "Profile-matched peer mentoring: survivors paired with someone who had a similar stroke profile at a similar life stage",
      "Community events — both virtual and eventually in-person at the Recovery Center",
      "Structured programming for identity, purpose, and social confidence rebuilding",
      "Specific resources for young survivors (under 50) navigating careers, kids, and decades ahead",
    ],
    why: "The social and psychological aftermath of stroke is one of its most devastating consequences — and one of the least-funded. We address it directly.",
    testId: "card-vision-social",
  },
  {
    icon: <FlaskConical className="h-8 w-8 text-accent" />,
    phase: "Phase 2–3",
    title: "Experimental Recovery Research",
    description:
      "The treatments that push recovery past the standard ceiling already exist. What's missing is a place to deliver them systematically and a data infrastructure to prove what works.",
    details: [
      "On-site research protocols in partnership with academic institutions",
      "Outcome tracking across all Stroke Lyfe programs — contributing to the national evidence base",
      "Evaluation of emerging technologies: BCI, TMS, high-dose VR, hyperbaric oxygen",
      "Publication of findings to advance what every stroke survivor's care looks like in the future",
    ],
    why: "Nick recovered to 90%+ when medicine said 30% was the ceiling. That outcome should be reproducible. Building the evidence base that makes it reproducible is one of our core goals.",
    testId: "card-vision-research",
  },
];

export default function Vision() {
  return (
    <div>
      <SEO
        title="Our Vision — What Stroke Lyfe Is Building for Every Survivor"
        description="Stroke Lyfe is building a rehabilitation facility, a vehicle independence program, social recovery programs, and research partnerships. Here's the full vision — and how every donation moves it forward."
        path="/vision"
      />

      {/* HERO */}
      <section className="py-20 bg-foreground text-background" data-testid="section-vision-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">The Future</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
            The world we're building for stroke survivors.
          </h1>
          <p className="mt-6 text-background/70 max-w-2xl text-lg leading-relaxed">
            I'm Nick Kremers. I had a severe stroke at 36. Insurance gave me 60 days and discharged me in a wheelchair. Seven and a half years later, I'm at 90%+ recovery — and I've spent every year since building what should have existed when I needed it.
          </p>
          <p className="mt-4 text-background/70 max-w-2xl text-lg leading-relaxed">
            This is what Stroke Lyfe is going to build. We need everyone's help to get there.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button asChild size="lg" data-testid="button-vision-donate">
              <Link href="/donate">
                Help Build This
                <Heart className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/60 text-white hover:bg-white/10 hover:text-white" data-testid="button-vision-contact">
              <Link href="/contact">
                Talk to Nick
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* NICK'S MESSAGE */}
      <section className="py-16 bg-muted" data-testid="section-vision-message">
        <div className="container mx-auto px-4 max-w-4xl">
          <blockquote className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug text-center mb-6">
            "There is so much I want to do. A recovery facility. A retreat where survivors can come together and feel human again. A program that gets survivors back behind the wheel of a car. Research that pushes the absolute limit of what recovery looks like. I refuse to accept that what exists today is as good as it gets."
          </blockquote>
          <p className="text-center text-muted-foreground font-medium">— Nick Kremers, Founder & 7.5-Year Stroke Survivor</p>
          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline" data-testid="button-vision-read-story">
              <Link href="/about">Read Nick's story <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* VISION ITEMS */}
      <section className="py-20 bg-background" data-testid="section-vision-programs">
        <div className="container mx-auto px-4 max-w-6xl space-y-10">
          <div className="text-center mb-4">
            <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">What We're Building</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Every program. Every goal. No vagueness.</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              This is not a wishlist. It's a roadmap. Each item below is a defined program with a clear purpose, a funding model, and a timeline tied to donor support.
            </p>
          </div>

          {visionItems.map((item) => (
            <Card key={item.title} className="overflow-hidden" data-testid={item.testId}>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 md:p-10 flex flex-col justify-start">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-0.5">{item.phase}</p>
                        <h3 className="font-serif text-2xl font-bold text-foreground">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-5 text-sm">{item.description}</p>
                    <div className="bg-accent/5 border border-accent/15 rounded-lg p-4">
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">Why this matters:</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.why}</p>
                    </div>
                    <Button asChild variant="outline" className="self-start mt-6" data-testid={`button-${item.testId}-donate`}>
                      <Link href="/donate">Fund this program</Link>
                    </Button>
                  </div>
                  <div className="bg-muted p-8 md:p-10">
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">What it includes</h4>
                    <ul className="space-y-3">
                      {item.details.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CALL FOR HELP */}
      <section className="py-20 bg-foreground text-background" data-testid="section-vision-help">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">We Need Everyone's Help</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-background leading-tight mb-6">
                This vision doesn't happen without you.
              </h2>
              <p className="text-background/70 leading-relaxed mb-4">
                I am one person. I had a severe stroke. I built my way back with discipline, stubbornness, and the help of people who believed the ceiling I was given wasn't real. I'm building Stroke Lyfe because I know how many other survivors are out there hitting the same wall, with even fewer resources than I had.
              </p>
              <p className="text-background/70 leading-relaxed mb-8">
                Every dollar donated — $25 or $25,000 — moves this forward. Every story shared, every email forwarded, every conversation had about stroke recovery and what it actually requires. I need every tool in every toolbox. If you have skills, connections, real estate, equipment, or just a genuine belief that survivors deserve better than 13 minutes of therapy per day — I want to talk to you.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" data-testid="button-help-donate">
                  <Link href="/donate">Donate Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/60 text-white hover:bg-white/10 hover:text-white" data-testid="button-help-contact">
                  <Link href="/contact">Contact Nick</Link>
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Donate", desc: "Any amount, any reason. Every dollar goes to programs or the capital fund.", href: "/donate" },
                { label: "Share our story", desc: "Tell one person about Stroke Lyfe. Peer-to-peer reach is how we grow.", href: "/blog" },
                { label: "Gift a survivor's recovery", desc: "Know a stroke survivor who needs support? Gift them a scholarship directly.", href: "/gift" },
                { label: "Partner with us", desc: "Healthcare organizations, researchers, businesses — let's talk about what's possible.", href: "/contact" },
                { label: "Volunteer your skills", desc: "Medical, legal, financial, marketing, or simply lived experience with stroke.", href: "/contact" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="block group">
                  <div className="p-4 rounded-lg border border-background/20 hover:border-primary/60 hover:bg-white/5 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-background text-sm">{item.label}</p>
                      <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-background/60">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT NICK DIRECTLY */}
      <section className="py-16 bg-background" data-testid="section-vision-contact">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
            <Mail className="h-7 w-7 text-accent" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
            Want to talk to Nick directly?
          </h2>
          <p className="text-muted-foreground mb-2 leading-relaxed">
            Donors, partners, researchers, other survivors, media — reach out. Nick responds personally to emails about the mission, the vision, partnership opportunities, and anything related to what we're building.
          </p>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            If you've had a stroke and want to share your story, ask for help, or just talk to someone who's been there — that inbox is open too.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="mailto:nick@strokelyfe.org"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-lg"
              data-testid="link-nick-email"
            >
              <Mail className="h-5 w-5" />
              nick@strokelyfe.org
            </a>
            <span className="hidden sm:block text-muted-foreground">·</span>
            <Button asChild variant="outline" data-testid="button-vision-contact-form">
              <Link href="/contact">Use the contact form</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-muted border-t border-border" data-testid="section-vision-final-cta">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
            Be part of what we're building.
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Stroke Lyfe Inc. is a 501(c)(3) public charity (EIN: 99-1313589). Donations are tax-deductible. 87 cents of every dollar goes to programs.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" data-testid="button-vision-cta-donate">
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" data-testid="button-vision-cta-blog">
              <Link href="/blog">Read our blog</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
