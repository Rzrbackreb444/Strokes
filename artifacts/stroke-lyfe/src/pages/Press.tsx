import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { Mail, Download, ArrowRight } from "lucide-react";

const stats = [
  { value: "7.5 yrs", label: "Nick's post-stroke journey" },
  { value: "30%", label: "Recovery prognosis at discharge" },
  { value: "90%+", label: "Functional recovery achieved" },
  { value: "99-1313589", label: "EIN — 501(c)(3) nonprofit" },
];

const keyFacts = [
  "Nick Kremers had a severe ischemic stroke on December 3, 2018, at age 36",
  "He was discharged from inpatient rehab in a wheelchair with a 30% recovery prognosis",
  "U.S. inpatient stroke rehab averages roughly 13 minutes of active physical therapy per day; insurance authorized 60 days then stopped",
  "Nick achieved 90%+ functional recovery over 7.5 years through intensive, self-directed neuroplasticity work",
  "He founded Stroke Recovery Academy to give other survivors access to the intensive coaching model that worked for him",
  "He then founded Stroke Lyfe Inc. (EIN: 99-1313589) as the 501(c)(3) nonprofit to fund access for survivors who can't afford programs",
  "Stroke Lyfe is building toward a dedicated rehabilitation facility, a vehicle independence program, and expanded research partnerships",
  "87 cents of every donated dollar goes directly to programs; financials are published annually",
];

export default function Press() {
  return (
    <div>
      <SEO
        title="Press & Media — Stroke Lyfe Inc."
        description="Media resources, key facts, and press contact for Stroke Lyfe Inc. and founder Nick Kremers — a stroke survivor predicted 30% recovery who achieved 90%+."
        path="/press"
      />

      <section className="py-20 bg-foreground text-background" data-testid="section-press-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Press & Media</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold max-w-3xl leading-tight">
            A survivor's story. A nonprofit's mission. The facilities that don't exist yet — but will.
          </h1>
          <p className="mt-6 text-background/70 max-w-xl text-lg leading-relaxed">
            Nick Kremers is available for interviews on stroke recovery, neuroplasticity science, nonprofit philanthropy, and the policy gaps that leave survivors underserved. Response within 24 hours.
          </p>
          <a
            href="mailto:press@strokelyfe.org"
            className="mt-8 inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
            data-testid="link-press-email"
          >
            <Mail className="h-4 w-4" />
            press@strokelyfe.org
          </a>
        </div>
      </section>

      <section className="py-10 bg-muted border-b border-border" data-testid="section-press-stats">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background" data-testid="section-press-content">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">About Nick Kremers</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nick Kremers had a severe ischemic stroke on December 3, 2018, at age 36. He was discharged from inpatient rehabilitation in a wheelchair, with a medical prognosis of 30% functional recovery. Insurance covered 60 days of inpatient care — then stopped.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Over the following seven and a half years, Nick pursued intensive neuroplasticity-based recovery on his own: studying constraint-induced movement therapy, finding practitioners who believed in long-term recovery, and connecting with a community of survivors still working years after their strokes. He reached 90%+ functional recovery by every metric used at discharge.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In 2023, Nick founded Stroke Recovery Academy to give other survivors access to the intensive, coaching-based recovery model that worked for him. He then founded Stroke Lyfe Inc. (EIN: 99-1313589) as the 501(c)(3) nonprofit arm — to fund access for survivors who cannot afford programs, and to build the facilities and infrastructure the medical system has never adequately funded.
                </p>
                <blockquote className="border-l-4 border-primary pl-5 py-1 italic text-foreground/70 text-lg leading-relaxed">
                  "The prognosis they give you at discharge is a floor, not a ceiling. The medical system is telling you what it can afford to fund — not what your brain is capable of."
                  <footer className="text-sm text-muted-foreground mt-2 not-italic font-medium">— Nick Kremers, Founder & 7.5-Year Stroke Survivor</footer>
                </blockquote>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-5">Key Facts for Press</h2>
                <ul className="space-y-3">
                  {keyFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="font-bold text-primary shrink-0 mt-0.5 w-6">{String(i + 1).padStart(2, "0")}</span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">About Stroke Lyfe Inc.</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Stroke Lyfe Inc. (EIN: 99-1313589) is a federally recognized 501(c)(3) public charity headquartered in Lavaca, Arkansas. The organization funds survivor scholarships to recovery programs, peer connection services, social recovery programming, and caregiver resources — and is building toward a dedicated rehabilitation facility and vehicle independence program for stroke survivors.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  87 cents of every donated dollar goes directly to programs. Financial records are published annually and filed with the IRS. The organization does not compensate board members.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Suggested Story Angles</h2>
                <ul className="space-y-3">
                  {[
                    "The 13-minute problem: Why standard stroke rehab falls catastrophically short, and what one survivor is building to fix it",
                    "Neuroplasticity at 7 years: The outdated six-month recovery ceiling and the science that's replacing it",
                    "Adaptive driving and independence: The $40,000 gap insurance won't cover for stroke survivors who want to drive again",
                    "Philanthropic gaps in stroke recovery: Why the stroke space is underfunded compared to cancer, heart disease, and Alzheimer's",
                    "The social aftermath of stroke: Why isolation may be as damaging as the neurological injury — and what Stroke Lyfe is doing about it",
                  ].map((angle, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-primary font-bold shrink-0">→</span>
                      {angle}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-5">
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-serif font-bold text-foreground mb-3">Press contact</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Press & Media</p>
                      <a href="mailto:press@strokelyfe.org" className="text-sm text-primary hover:underline" data-testid="link-press-contact-email">press@strokelyfe.org</a>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Nick directly</p>
                      <a href="mailto:nick@strokelyfe.org" className="text-sm text-primary hover:underline">nick@strokelyfe.org</a>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">We respond to all media inquiries within 24 hours. Nick is available for phone, video, or in-person interviews.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <h3 className="font-serif font-bold text-foreground mb-2">Media kit</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">High-resolution logo files, Nick's photo, and Stroke Lyfe brand assets are available on request.</p>
                  <a
                    href="mailto:press@strokelyfe.org?subject=Media kit request — Stroke Lyfe"
                    className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
                  >
                    <Download className="h-4 w-4" /> Request media kit
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <h3 className="font-serif font-bold text-foreground mb-3">Organization details</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Stroke Lyfe Inc.</p>
                    <p>EIN: 99-1313589</p>
                    <p>501(c)(3) Public Charity</p>
                    <p>Founded: 2023</p>
                    <p className="mt-2">622 South River Rd.<br />Lavaca, AR 72941</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <h3 className="font-serif font-bold text-foreground mb-3">Read more</h3>
                  <div className="space-y-2">
                    {[
                      { href: "/blog/seven-years-after-stroke-nick-kremers", label: "Nick's 7.5-year story" },
                      { href: "/vision", label: "Vision & future plans" },
                      { href: "/about", label: "About Stroke Lyfe" },
                      { href: "/transparency", label: "Financial transparency" },
                      { href: "/blog", label: "All blog posts" },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" /> {link.label}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="bg-muted rounded-lg p-5">
                <p className="text-sm font-semibold text-foreground mb-2">Help fund the mission</p>
                <p className="text-xs text-muted-foreground mb-3">Tax-deductible donations support everything we're building.</p>
                <Button asChild size="sm" className="w-full" data-testid="button-press-donate">
                  <Link href="/donate">Donate to Stroke Lyfe</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
