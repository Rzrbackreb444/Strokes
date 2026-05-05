import { Link } from "wouter";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NotFound from "@/pages/not-found";
import SEO from "@/components/SEO";

type Section =
  | { type: "p"; content: string }
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "ul"; items: string[] }
  | { type: "blockquote"; content: string }
  | { type: "cta"; label: string; href: string; sub?: string };

interface Post {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  readTime: string;
  author: string;
  publishedAt: string;
  sections: Section[];
}

export const BLOG_POSTS: Post[] = [
  {
    slug: "donate-stroke-recovery-academy",
    title: "Donate to Stroke Recovery Academy: How Your Gift Changes a Life",
    description:
      "When you donate to Stroke Lyfe, your dollars fund direct survivor scholarships into the Stroke Recovery Academy. Here's exactly what that looks like — and why it matters.",
    tag: "Donation",
    date: "May 5, 2026",
    publishedAt: "2026-05-05",
    readTime: "5 min read",
    author: "Nick Kremers",
    sections: [
      {
        type: "p",
        content:
          "When Nick Kremers had his stroke at 26, insurance said he was 'recovered enough' after 60 days of inpatient rehab. He wasn't. Not even close. The Stroke Recovery Academy (SRA) was built to fill exactly that gap — the years of intensive recovery that insurance won't fund but survivors desperately need.",
      },
      {
        type: "p",
        content:
          "When you donate to Stroke Lyfe, your dollars go directly toward funding survivor scholarships into SRA's programs. Here's exactly what that looks like.",
      },
      {
        type: "h2",
        content: "What the Stroke Recovery Academy Does",
      },
      {
        type: "p",
        content:
          "SRA is an intensive, evidence-based recovery program built around three things insurance ignores: neuroplasticity training, motivational coaching, and community support. Most stroke survivors receive an average of 13 minutes of physical therapy per day during inpatient rehab. The SRA model flips that — survivors get structured daily programming, AI-assisted coaching tools, peer mentorship, and 1:1 guidance.",
      },
      {
        type: "ul",
        items: [
          "Survivor Tier ($97/mo): Core curriculum, AI coaching tools, survivor community",
          "Mentored Tier ($297/mo): Everything above plus group coaching calls",
          "Elite Tier ($997/mo): Full access plus personalized 1:1 coaching with Nick",
        ],
      },
      {
        type: "p",
        content:
          "Most survivors can't afford any of these on their own. That's where your donation comes in.",
      },
      {
        type: "h2",
        content: "How Scholarship Funding Works",
      },
      {
        type: "p",
        content:
          "Every dollar donated to Stroke Lyfe Inc. (the 501(c)(3)) goes into a scholarship fund. Survivors apply for need-based scholarships — some partial, some full — to access SRA programming they couldn't otherwise afford. The nonprofit board reviews applications and allocates funds transparently, with all financials published in our annual report.",
      },
      {
        type: "blockquote",
        content:
          "When $97 comes in as a donation, it funds one survivor for one month — daily coaching prompts, a 200+ video recovery library, live Q&A sessions, and the singular experience of knowing they're not alone.",
      },
      {
        type: "h2",
        content: "The Research Component",
      },
      {
        type: "p",
        content:
          "Beyond scholarships, Stroke Lyfe funds ongoing research partnerships. We document outcomes — recovery milestones, quality-of-life improvements, functional gains — from scholarship recipients. This data feeds back into the academic literature on post-acute stroke rehabilitation, advancing the field's understanding of what's possible beyond the first 90 days.",
      },
      {
        type: "p",
        content:
          "Your donation doesn't just help the survivor in front of you. It advances the science that helps every survivor who comes after.",
      },
      {
        type: "cta",
        label: "Donate Today",
        href: "/donate",
        sub: "Tax-deductible. EIN 99-1313589. You'll receive a personal note from Nick.",
      },
    ],
  },
  {
    slug: "stroke-lyfe-mission",
    title: "The Mission Behind Stroke Lyfe: Motivation, Research, and Real Recovery",
    description:
      "Stroke Lyfe exists to enrich the lives of stroke survivors through motivation and to further research in recovery advances. Here's what that means in practice.",
    tag: "Mission",
    date: "May 5, 2026",
    publishedAt: "2026-05-05",
    readTime: "4 min read",
    author: "Nick Kremers",
    sections: [
      {
        type: "p",
        content:
          "In 2016, Nick Kremers woke up in a hospital unable to move the left side of his body. He was 26. Doctors gave him the same speech every stroke survivor hears: 'You'll regain most function in the first 6 months. After that, it slows down.' What they didn't say was that the slowdown was partly structural — most survivors lose access to intensive therapy right when they need it most, because insurance stops paying.",
      },
      {
        type: "p",
        content:
          "Nick didn't accept that. He spent the next seven years self-educating on neuroplasticity, rebuilding gait function that doctors said was permanent, and documenting everything. In 2023, he founded Stroke Lyfe Inc. to turn that experience into a mission.",
      },
      {
        type: "h2",
        content: "The Mission Statement",
      },
      {
        type: "blockquote",
        content:
          "To enrich the lives of stroke survivors through motivation and to further research in recovery advances.",
      },
      {
        type: "p",
        content: "That's two things, and both matter equally.",
      },
      {
        type: "h2",
        content: "Enriching Lives Through Motivation",
      },
      {
        type: "p",
        content:
          "Recovery from stroke is 50% physical and 50% mental. Survivors face depression at rates 3x higher than the general population. They face caregiver strain, identity loss, financial devastation, and the particular grief of being 'too recovered' to need help but not recovered enough to live the life they had.",
      },
      {
        type: "p",
        content:
          "Survivors who engage in structured programs — who have accountability, community, and someone who's been through it — recover more function, faster, than survivors who go it alone. The evidence is clear. Stroke Lyfe funds that: coaching, community, scholarships into the Stroke Recovery Academy, and the ongoing presence of Nick's example.",
      },
      {
        type: "h2",
        content: "Furthering Research in Recovery Advances",
      },
      {
        type: "p",
        content:
          "The science of post-acute stroke recovery is underfunded relative to acute care. Most research dollars go to preventing strokes or treating them in the ER. Far less goes to understanding what helps survivors rebuild function 1, 3, or 7 years later.",
      },
      {
        type: "p",
        content:
          "Stroke Lyfe is building the evidence base. We document recovery outcomes from scholarship recipients, partner with researchers studying neuroplasticity and behavior change, and publish everything. The goal is to prove — with data — that the recovery ceiling most survivors are handed is artificial.",
      },
      {
        type: "h2",
        content: "Why Now",
      },
      {
        type: "p",
        content:
          "We're a new organization. That means every dollar is magnified. Early donations fund the first scholarships, prove the model, and create the foundation for a much larger impact over the next decade. Give when it's early, and your name is part of the story of what Stroke Lyfe became.",
      },
      {
        type: "cta",
        label: "Support the Mission",
        href: "/donate",
        sub: "Give for any reason. Every dollar enriches the life of a stroke survivor.",
      },
    ],
  },
  {
    slug: "stroke-recovery-gap",
    title: "The Stroke Recovery Gap: What Happens After Discharge (And Why It Matters)",
    description:
      "After discharge, most stroke survivors face a sharp drop-off in support right when the brain is most capable of change. This is the recovery gap — and what Stroke Lyfe is doing about it.",
    tag: "Recovery",
    date: "May 5, 2026",
    publishedAt: "2026-05-05",
    readTime: "6 min read",
    author: "Nick Kremers",
    sections: [
      {
        type: "p",
        content:
          "Stroke is the leading cause of long-term disability in the United States. About 800,000 Americans have a stroke every year. What most people don't know is that the majority of recovery doesn't happen in the hospital — it happens, or fails to happen, at home.",
      },
      {
        type: "p",
        content:
          "After discharge, survivors face what researchers call the 'post-acute gap': a period where clinical support drops off dramatically but the brain is still capable of significant recovery. This is the gap Stroke Lyfe exists to fill.",
      },
      {
        type: "h2",
        content: "What the Research Actually Says",
      },
      {
        type: "p",
        content:
          "The old model held that neuroplasticity was largely limited to the first 6 months. That model is now considered outdated. Current evidence shows:",
      },
      {
        type: "ul",
        items: [
          "Neuroplasticity remains active for years after stroke",
          "Intensive, repetitive practice produces functional gains at 1, 2, and 5+ years post-stroke",
          "Psychosocial support significantly predicts recovery outcomes",
          "Access to therapy — not just time since stroke — is the primary variable separating survivors who recover from those who plateau",
        ],
      },
      {
        type: "p",
        content: "The barrier isn't biology. It's access.",
      },
      {
        type: "h2",
        content: "The Insurance Problem",
      },
      {
        type: "p",
        content:
          "Medicare and most private insurance cover acute inpatient rehab (typically 2–6 weeks) and a limited course of outpatient therapy (often 60 visits per benefit period). Once those benefits are exhausted, coverage for ongoing rehabilitation is minimal. The result: survivors who need years of consistent, intensive practice receive months of intermittent therapy — then go home with a packet of exercises.",
      },
      {
        type: "h2",
        content: "What Fills the Gap",
      },
      {
        type: "p",
        content:
          "Some survivors fill it themselves, as Nick did — researching, experimenting, building self-directed recovery programs. But that requires time, resources, and an extraordinary amount of motivation in the face of a system that's told you you're done.",
      },
      {
        type: "p",
        content:
          "The Stroke Recovery Academy was built as a structured answer: evidence-based programming, community support, and expert coaching — accessible at a fraction of clinical cost. Your donation makes that accessible to survivors who can't pay out of pocket.",
      },
      {
        type: "h2",
        content: "You Are Not Too Late",
      },
      {
        type: "blockquote",
        content:
          "Nick's biggest recovery wins came in years 4 through 7 — not the first year. If you're a survivor reading this, you are not too late. You are not too recovered.",
      },
      {
        type: "cta",
        label: "Help Close the Gap",
        href: "/donate",
        sub: "Your donation funds scholarships for survivors who can't afford recovery on their own.",
      },
    ],
  },
  {
    slug: "5-ways-donation-helps",
    title: "5 Ways Your Donation to Stroke Lyfe Directly Helps Survivors",
    description:
      "Giving to a nonprofit can feel abstract. Here are five concrete things your donation to Stroke Lyfe actually does — for real survivors, right now.",
    tag: "Donation",
    date: "May 5, 2026",
    publishedAt: "2026-05-05",
    readTime: "4 min read",
    author: "Nick Kremers",
    sections: [
      {
        type: "p",
        content:
          "Giving to a nonprofit can feel abstract. You write a check. You get a receipt. Something good happens... somewhere. Stroke Lyfe is built differently. Here are five concrete things your donation does.",
      },
      {
        type: "h2",
        content: "1. Funds a Survivor Scholarship",
      },
      {
        type: "p",
        content:
          "A $97 donation funds one survivor's access to the Stroke Recovery Academy for one month — coaching tools, community, a video library built around real recovery science, and live Q&A sessions. A $297 donation funds three months of Mentored programming. These aren't hypothetical survivors. We have a waitlist. When donations come in, people on that list get access.",
      },
      {
        type: "h2",
        content: "2. Provides Motivation at the Right Moment",
      },
      {
        type: "p",
        content:
          "Stroke survivors face a 30–40% risk of depression in the first year. Depression directly inhibits the motivation to do the repetitive practice that drives neuroplastic recovery — creating a loop where loss of function leads to less practice, which leads to less recovery. Community, accountability, and lived experience break that loop.",
      },
      {
        type: "h2",
        content: "3. Funds Recovery Research",
      },
      {
        type: "p",
        content:
          "Every scholarship recipient who goes through SRA programming is an opportunity to document outcomes. We track functional milestones, quality-of-life measures, and engagement over time. That data gets shared with research partners and eventually published — building the evidence base that changes insurance policy.",
      },
      {
        type: "h2",
        content: "4. Keeps the Platform Accessible",
      },
      {
        type: "p",
        content:
          "Operating costs are real. Infrastructure, platform licensing, administrative overhead — these have to be funded so that scholarship dollars go to survivors rather than overhead. Operational donations keep the lights on.",
      },
      {
        type: "h2",
        content: "5. Signals That This Matters",
      },
      {
        type: "p",
        content:
          "Nonprofits live and die by early donors. When organizations have 50 donors, they attract 500. When they have 500, they attract foundation grants, government funding, and corporate partnerships. Your early gift does double duty: it helps today's survivors and builds the credibility that helps tomorrow's.",
      },
      {
        type: "cta",
        label: "Donate Now",
        href: "/donate",
        sub: "Know exactly where your money goes. Tax-deductible. EIN 99-1313589.",
      },
    ],
  },
  {
    slug: "neuroplasticity-stroke-recovery",
    title: "Neuroplasticity After Stroke: The Science That Gives Survivors Hope",
    description:
      "The old model said recovery stops at 6 months. The science says otherwise. Here's what neuroplasticity actually means for stroke survivors — and why it changes everything.",
    tag: "Science",
    date: "May 5, 2026",
    publishedAt: "2026-05-05",
    readTime: "6 min read",
    author: "Nick Kremers",
    sections: [
      {
        type: "p",
        content:
          "For most of the 20th century, the medical consensus on stroke recovery was discouraging: what wasn't regained in the first six months was unlikely to be regained at all. The brain, it was believed, was largely fixed after childhood. Damage was damage. That consensus has been overturned — and for stroke survivors, the implications are profound.",
      },
      {
        type: "h2",
        content: "What Is Neuroplasticity?",
      },
      {
        type: "p",
        content:
          "Neuroplasticity refers to the brain's ability to reorganize itself — to form new neural connections, strengthen existing pathways, and reroute functions around damaged tissue. It's how stroke survivors relearn to walk, speak, or use an affected limb. It's also why recovery can continue years after a stroke, not just in the weeks following the event.",
      },
      {
        type: "ul",
        items: [
          "Synaptic strengthening: Repeated practice strengthens connections between neurons, making pathways more efficient",
          "Cortical remapping: Functions once controlled by damaged regions migrate to adjacent, undamaged areas",
          "Axonal sprouting: In some cases, neurons grow new connections to bypass damaged circuits",
        ],
      },
      {
        type: "p",
        content:
          "These are not metaphors. They are measurable, observable changes in brain structure — documented by fMRI, PET scans, and decades of controlled research.",
      },
      {
        type: "h2",
        content: "The Intensity-Dependence of Recovery",
      },
      {
        type: "p",
        content:
          "The crucial finding: neuroplastic change is dose-dependent. The brain reorganizes in response to practice. More practice — more repetitions, more consistent effort, more structured engagement — produces more change. This is why the post-acute gap is so consequential. When survivors lose access to intensive therapy, they lose the primary input that drives continued recovery.",
      },
      {
        type: "blockquote",
        content:
          "It's not that recovery has stopped. It's that the stimulus has been removed. Restore the stimulus — and recovery resumes.",
      },
      {
        type: "h2",
        content: "Nick's Recovery: What Years 4–7 Actually Looked Like",
      },
      {
        type: "p",
        content:
          "Nick achieved significant gait and motor function gains 4–7 years post-stroke — through deliberate, self-directed practice long after conventional medicine had written off further progress. He rebuilt drop foot. He walked distances doctors said weren't possible. The neuroplasticity was there. The stimulus was the only question.",
      },
      {
        type: "h2",
        content: "What This Means for Donors",
      },
      {
        type: "p",
        content:
          "When you donate to Stroke Lyfe, you're funding the application of this science. Every scholarship into the Stroke Recovery Academy creates the conditions for continued neuroplastic recovery — structured practice, motivational support, expert coaching. The science says recovery is possible far beyond what the current standard of care assumes. Your donation makes it accessible.",
      },
      {
        type: "cta",
        label: "Put the Science to Work",
        href: "/donate",
        sub: "Fund a survivor's scholarship and directly support evidence-based recovery.",
      },
    ],
  },
];

function renderSection(section: Section, index: number) {
  switch (section.type) {
    case "h2":
      return <h2 key={index} className="font-serif text-2xl font-bold text-foreground mt-10 mb-4">{section.content}</h2>;
    case "h3":
      return <h3 key={index} className="font-serif text-xl font-bold text-foreground mt-8 mb-3">{section.content}</h3>;
    case "p":
      return <p key={index} className="text-foreground/80 leading-relaxed mb-4">{section.content}</p>;
    case "ul":
      return (
        <ul key={index} className="list-disc list-outside pl-6 space-y-2 mb-4 text-foreground/80">
          {section.items.map((item, i) => <li key={i} className="leading-relaxed">{item}</li>)}
        </ul>
      );
    case "blockquote":
      return (
        <blockquote key={index} className="border-l-4 border-primary pl-5 py-1 my-6 italic text-foreground/70 text-lg leading-relaxed">
          {section.content}
        </blockquote>
      );
    case "cta":
      return (
        <div key={index} className="mt-10 p-6 bg-primary/5 border border-primary/15 rounded-xl text-center">
          <Button asChild size="lg">
            <Link href={section.href}>{section.label}</Link>
          </Button>
          {section.sub && <p className="text-xs text-muted-foreground mt-3">{section.sub}</p>}
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return <NotFound />;

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        publishedAt={post.publishedAt}
        author={post.author}
      />
      <div>
        {/* Hero */}
        <section className="py-16 bg-foreground text-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <Link href="/blog" className="inline-flex items-center gap-1 text-background/60 hover:text-background text-sm mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="text-xs">{post.tag}</Badge>
              <span className="text-background/50 text-xs flex items-center gap-1">
                <Calendar className="h-3 w-3" />{post.date}
              </span>
              <span className="text-background/50 text-xs flex items-center gap-1">
                <Clock className="h-3 w-3" />{post.readTime}
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">{post.title}</h1>
            <p className="text-background/70 text-lg leading-relaxed">{post.description}</p>
            <p className="mt-4 text-sm text-background/50">By {post.author} — Founder, Stroke Lyfe</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <article className="prose-lg max-w-none">
              {post.sections.map((s, i) => renderSection(s, i))}
            </article>

            {/* Divider + More Posts */}
            <div className="mt-16 pt-10 border-t border-border">
              <h2 className="font-serif text-xl font-bold text-foreground mb-6">More from Stroke Lyfe</h2>
              <div className="space-y-4">
                {BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3).map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`} className="block group">
                    <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/50 transition-all">
                      <Tag className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{related.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{related.tag} · {related.readTime}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <Button asChild variant="outline">
                  <Link href="/blog">All posts</Link>
                </Button>
                <Button asChild>
                  <Link href="/donate">Donate now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
