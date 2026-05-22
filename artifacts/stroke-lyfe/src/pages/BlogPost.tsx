import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Calendar, Clock, Tag, Share2, Link2, Check, X } from "lucide-react";
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
    slug: "stroke-social-isolation",
    title: "The Social Aftermath of Stroke: What Nobody Talks About",
    description:
      "After stroke, the physical losses get attention. The social losses — friends who disappear, events that feel impossible, an identity that no longer fits — get almost none. This is the conversation that needs to happen.",
    tag: "Social Life",
    date: "May 22, 2026",
    publishedAt: "2026-05-22",
    readTime: "6 min read",
    author: "Nick Kremers",
    sections: [
      {
        type: "p",
        content:
          "Two months after my stroke, I noticed something nobody had warned me about. The friends who had texted every day in the hospital — they stopped. Not all of them. But many. The invitations to things dried up. People didn't know what to say. I didn't know what to say. A mutual silence settled in, and with it came something more painful than anything happening in my left arm.",
      },
      {
        type: "p",
        content:
          "I had lost part of my social life. And unlike the physical deficits — which everyone acknowledged, which came with therapy plans and measurements and goals — this loss was invisible. Nobody gave me a timeline for rebuilding my friendships. Nobody put 'social identity reconstruction' on the discharge paperwork.",
      },
      {
        type: "h2",
        content: "Why This Happens",
      },
      {
        type: "p",
        content:
          "Stroke changes you visibly. You may walk differently, speak differently, move differently. And our culture doesn't handle visible difference well. People who care about you genuinely don't know what to do. They're afraid of saying the wrong thing. They assume you're tired, or in pain, or not up for company. They step back to give you space — and then that space becomes permanent.",
      },
      {
        type: "p",
        content:
          "There's also the practical reality: the places you used to go together are harder now. Loud restaurants are exhausting when you're managing post-stroke fatigue or auditory processing changes. Concerts are inaccessible with mobility challenges. Casual sports leagues, weekend hikes, the standing Thursday dinner — the architecture of your social life was built for a person who no longer exists in the same form.",
      },
      {
        type: "h2",
        content: "The Identity Dimension",
      },
      {
        type: "p",
        content:
          "Here's what makes it more complicated: you may not recognize yourself either. The person who was outgoing, who initiated plans, who held a career and a role and a place in a social ecosystem — that person is in transition. Some of those traits come back. Some change. Some are replaced by something new that your old friends don't know how to meet.",
      },
      {
        type: "blockquote",
        content:
          "You're grieving a version of yourself while simultaneously trying to become whoever comes next. That's an enormous amount to carry. And it's almost entirely invisible to the medical system.",
      },
      {
        type: "p",
        content:
          "Post-stroke depression — which affects 30–40% of survivors in the first year — is partly a neurological consequence of brain injury. But it's also a rational response to genuine loss. You've lost capabilities, roles, relationships, and the sense of who you are. That deserves to be named and addressed directly, not just managed with medication.",
      },
      {
        type: "h2",
        content: "Post-Stroke Fatigue: The Social Saboteur",
      },
      {
        type: "p",
        content:
          "One of the most underreported stroke consequences is fatigue — a specific, neurological exhaustion that is categorically different from normal tiredness. Post-stroke fatigue can make a two-hour dinner feel like running a marathon. It can make social events — which require attention, processing, conversation management, emotional attunement — genuinely depleting in ways that are hard to explain to someone who hasn't experienced it.",
      },
      {
        type: "p",
        content:
          "When you cancel plans repeatedly because you're too exhausted, people stop asking. When you leave events early because you've hit a wall, it reads as disinterest. The social withdrawal that post-stroke fatigue produces gets misread as personality change, depression, or simple unavailability. And so the isolation compounds.",
      },
      {
        type: "h2",
        content: "Young Survivors Carry This Differently",
      },
      {
        type: "p",
        content:
          "If you had your stroke under 50, the social dimension of stroke is especially acute. Your peers aren't navigating disability. They're building careers, raising children, traveling. The gap between your life and theirs can feel insurmountable — even if your functional recovery is progressing well. The social reference points don't match. The conversation subjects diverge. The ease that used to exist in friendships requires work you may not have capacity for.",
      },
      {
        type: "p",
        content:
          "This is one of the reasons why peer connection — matching survivors with others who have lived something similar at a similar age and life stage — is one of the most impactful things we do at Stroke Lyfe. Not a therapist. Not a volunteer. A person who had a stroke in their 30s or 40s and rebuilt a life, and is willing to walk alongside you while you build yours.",
      },
      {
        type: "h2",
        content: "What Actually Helps",
      },
      {
        type: "ul",
        items: [
          "Peer connection with matched survivors — not support groups of mixed ages/profiles, but genuine 1:1 matching with someone who lived something similar",
          "Naming the grief explicitly — with a therapist, a peer, or in writing. Social identity loss is real loss. It deserves acknowledgment.",
          "Rebuilding social architecture at your current capacity, not your pre-stroke capacity — shorter events, quieter environments, lower stakes",
          "Being honest with the people in your life about what you can and can't do — and letting them meet you there",
          "Finding new communities built around your current life, not your old one",
        ],
      },
      {
        type: "p",
        content:
          "Stroke Lyfe exists in part because the medical system doesn't address any of this. We do. If you're a survivor navigating the social aftermath — or a family member watching someone you love withdraw — reach out. This is exactly what we're here for.",
      },
      {
        type: "cta",
        label: "Connect with Stroke Lyfe",
        href: "/contact",
        sub: "Or donate to fund peer connection programs for survivors who can't afford them.",
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
  {
    slug: "seven-years-after-stroke-nick-kremers",
    title: "Seven and a Half Years After My Stroke: What I Know Now — and What I'm Building",
    description:
      "Nick Kremers was predicted 30% recovery after a severe stroke at 36. Seven and a half years later, he's at 90%+. This is what he learned — and why it led him to build Stroke Lyfe.",
    tag: "Founder's Story",
    date: "May 22, 2026",
    publishedAt: "2026-05-22",
    readTime: "9 min read",
    author: "Nick Kremers",
    sections: [
      {
        type: "p",
        content:
          "December 3, 2018. That's the date everything changed. I was 36 years old — by every measure at the prime of my life. By the time I reached the hospital, I had sustained one of the most severe ischemic strokes the attending neurologist said he had seen in a patient my age. The prognosis he delivered, carefully and professionally, was 30% recovery. I would likely never walk normally again. The deficits I had at discharge — they told me — represented the new floor of my life.",
      },
      {
        type: "p",
        content:
          "I'm writing this seven and a half years later from a standing desk. I walk. I work. I built a company, then a nonprofit. I'm at 90%+ by every functional measure they gave me when I left that hospital in a wheelchair. And I want to tell you exactly how that happened — and exactly what I'm building now, because of it.",
      },
      {
        type: "h2",
        content: "What the Medical System Gave Me — and What It Didn't",
      },
      {
        type: "p",
        content:
          "Insurance authorized 60 days of inpatient rehabilitation. That's it. The standard post-acute stroke protocol in the United States averages roughly 13 minutes of active physical therapy per day during inpatient stays — a figure documented in peer-reviewed research that should be unconscionable, but isn't, because that's simply the system. When I was discharged, I was categorized as 'recovered enough' to no longer qualify for inpatient care. I was still in a wheelchair.",
      },
      {
        type: "p",
        content:
          "Outpatient therapy followed, for a few months, until those benefits ran out too. And then I was on my own — at 36, with two kids, a body that wasn't mine anymore, and a stack of discharge papers telling me that what I'd regained was roughly what I was going to keep.",
      },
      {
        type: "blockquote",
        content:
          "The prognosis they give you at discharge is a floor, not a ceiling. The medical system is telling you what it can afford to fund — not what your brain is capable of.",
      },
      {
        type: "h2",
        content: "The Years Nobody Tells You About",
      },
      {
        type: "p",
        content:
          "Years one through three were the grinding years. I worked with neuroplasticity research on my own — reading studies, finding practitioners who believed in intensive long-term recovery, finding a community of survivors who were still working on their recovery years after their strokes. I learned what constraint-induced movement therapy was. I learned what dose-dependent practice meant. I stopped asking when I would plateau and started asking how much more I could push.",
      },
      {
        type: "p",
        content:
          "I also hit the wall that almost every survivor hits: isolation. The friends who showed up at the hospital were mostly gone by year two. The social architecture of my pre-stroke life — built around someone who could walk into a bar, drive himself to a game, work a full-time job without exhaustion — didn't accommodate the person I was becoming. That social loss was as hard as anything physical. Nobody talks about it enough, and nobody funds programs for it.",
      },
      {
        type: "h2",
        content: "What Actually Drove the Recovery",
      },
      {
        type: "p",
        content:
          "Three things moved the needle in ways that surprised me. First: intensity. Neuroplastic recovery is dose-dependent. The brain reorganizes in response to practice — more practice, more reorganization. Every week I wasn't doing structured, repetitive, intensive work was a week I was leaving recovery on the table. Second: motivation. Recovery is miserable. The only thing that keeps you going through the miserable days is a reason to keep going that you actually believe in. For me that was my kids, and eventually, the realization that I might be able to help others. Third: community. Connecting with other survivors — people who understood not just the clinical symptoms but the psychological ones — was irreplaceable. Not a support group. A real relationship with someone who had been where I was and come out the other side.",
      },
      {
        type: "h2",
        content: "Why I Built Stroke Lyfe",
      },
      {
        type: "p",
        content:
          "I built Stroke Recovery Academy to give survivors access to the recovery model that worked for me — intensive, neuroplasticity-driven, with real coaching and a real community. Then I built Stroke Lyfe Inc. (EIN: 99-1313589) as the 501(c)(3) nonprofit to fund access for every survivor who couldn't afford it. Because the gap isn't knowledge. Most of us can find the information. The gap is money, access, and the specific kind of support — motivation, peer connection, social recovery — that the medical system doesn't fund at all.",
      },
      {
        type: "p",
        content:
          "But scholarships are only the beginning. I want to build a rehabilitation facility — a real one, purpose-built for stroke survivors, with experimental recovery technologies, a community environment, and a social program for survivors who've lost their social lives alongside their motor function. I want to fund vehicle modifications so survivors can drive again, because the day you can drive yourself to a doctor's appointment is the day you start feeling human again. I want to do so much that insurance doesn't cover and philanthropy has largely ignored. That's what Stroke Lyfe is for.",
      },
      {
        type: "h2",
        content: "Frequently Asked Questions",
      },
      {
        type: "h3",
        content: "Can you fully recover from a severe stroke?",
      },
      {
        type: "p",
        content:
          "Full functional recovery from a severe stroke is uncommon by traditional medical definitions, but significant recovery — far beyond initial prognoses — is achievable for many survivors who maintain access to intensive, consistent practice and the right support. I was predicted 30% recovery and have reached 90%+, more than seven years post-stroke. The brain continues to reorganize in response to practice long after stroke — the limiting factor for most survivors isn't neurological potential, it's access to the intensity and duration of practice that drives recovery.",
      },
      {
        type: "h3",
        content: "How long does stroke recovery take?",
      },
      {
        type: "p",
        content:
          "Recovery from stroke is not time-limited. The outdated six-month plateau model has been revised by decades of neuroplasticity research. The brain continues to reorganize and recover in response to structured practice for years — sometimes decades — after a stroke. Most survivors plateau not because their brains stop responding, but because they lose access to the intensity of practice that drives recovery when insurance coverage ends. Continued effort, the right tools, and sustained motivation determine long-term outcomes far more than the calendar does.",
      },
      {
        type: "h3",
        content: "What is Stroke Lyfe Inc. and how does it help survivors?",
      },
      {
        type: "p",
        content:
          "Stroke Lyfe Inc. (EIN: 99-1313589) is a federally recognized 501(c)(3) nonprofit founded by stroke survivor Nick Kremers. The organization funds survivor scholarships to recovery programs, peer connection services, motivational coaching tools, and caregiver support — and is building toward a dedicated rehabilitation facility and vehicle independence program. Donations are tax-deductible. Financial records are published on the Transparency page.",
      },
      {
        type: "cta",
        label: "Help Build What Should Have Existed",
        href: "/donate",
        sub: "Every dollar funds a program the medical system doesn't. Tax-deductible. EIN 99-1313589.",
      },
    ],
  },
  {
    slug: "stroke-lyfe-recovery-center-vision",
    title: "The Stroke Lyfe Recovery Center: The Facility We're Building — and Why Nothing Like It Exists",
    description:
      "Stroke Lyfe is building a dedicated rehabilitation and recovery center for stroke survivors — part intensive clinic, part community retreat, part research site. Here's the vision, the plan, and how donations build it.",
    tag: "Vision",
    date: "May 22, 2026",
    publishedAt: "2026-05-22",
    readTime: "7 min read",
    author: "Nick Kremers",
    sections: [
      {
        type: "p",
        content:
          "Every stroke survivor I've spoken with over the past seven years has hit the same wall. They leave the hospital or inpatient facility with a list of outpatient appointments and the unspoken understanding that the healthcare system is finished with them. The appointments trickle down from three days a week to two, then one, then none. And then they're managing the rest of their recovery — potentially years of it — entirely on their own, with whatever they can piece together from YouTube videos, Facebook groups, and the occasional telehealth session.",
      },
      {
        type: "p",
        content:
          "The Stroke Lyfe Recovery Center is the answer to that wall. It's a facility I've been designing in my head since about year two of my own recovery, when I understood clearly what I needed and couldn't find anywhere that it existed. I'm describing it here because I want you to see what your donation is building toward — and because I believe we will build it.",
      },
      {
        type: "h2",
        content: "What the Center Will Do",
      },
      {
        type: "p",
        content:
          "The Stroke Lyfe Recovery Center will function simultaneously as an intensive rehabilitation clinic, a community retreat, and a research site. Those three functions are inseparable — and combining them is exactly what makes it different from anything that currently exists.",
      },
      {
        type: "ul",
        items: [
          "Intensive neuroplasticity programming: Daily structured practice in a high-repetition, expert-guided environment — the kind of intensity that drives documented brain reorganization, not the watered-down versions covered by insurance",
          "Experimental recovery technologies: On-site access to transcranial magnetic stimulation (TMS), constraint-induced movement therapy (CIMT), virtual reality rehabilitation, and brain-computer interface training — currently accessible only at major research hospitals or expensive private clinics",
          "Community and social recovery: A residential retreat component where survivors can spend extended time — days or weeks — recovering in a peer environment, rebuilding social confidence and connection with people who understand",
          "Caregiver integration: Partners and family members welcomed as full participants, not afterthoughts — because the research is clear that caregiver support dramatically improves survivor outcomes",
          "Research and outcome tracking: Every participant's recovery data contributes to a growing evidence base. The Center becomes a site that advances what's known about long-term stroke recovery, not just for our participants but for the field",
        ],
      },
      {
        type: "h2",
        content: "Why the Environment Matters",
      },
      {
        type: "p",
        content:
          "Conventional outpatient rehab happens in clinical spaces designed for efficiency, not recovery. You drive yourself in, park, wait, do your 45 minutes, drive home. The environment communicates that this is a transaction — you are a patient completing a visit, not a person rebuilding a life.",
      },
      {
        type: "p",
        content:
          "The Recovery Center is designed around the opposite principle. The social environment is part of the treatment. Eating dinner with other survivors who are in the same process you are — comparing notes, sharing strategies, laughing at the shared absurdity of this experience — is not supplementary to recovery. It is recovery, in dimensions the clinical system can't reach. The social isolation of stroke is one of its most devastating and least-addressed consequences. A dedicated community environment addresses it directly.",
      },
      {
        type: "blockquote",
        content:
          "The day a survivor spends a week surrounded by people who know exactly what they're going through — that's a day that changes their relationship to recovery. You stop feeling like you're failing alone. You start feeling like you're part of something.",
      },
      {
        type: "h2",
        content: "How Donations Build It",
      },
      {
        type: "p",
        content:
          "The Recovery Center is a multi-phase capital project. The foundation is being built now — through scholarships, coaching programs, and the organizational infrastructure that demonstrates Stroke Lyfe's capacity to execute at scale. When we can show donors what we've built with early funding, we can make a credible case for the capital raise that funds the facility itself.",
      },
      {
        type: "p",
        content:
          "Your donation today is phase one. It funds programs that help survivors right now — and it builds the organizational track record that unlocks the philanthropic capital for phase two. Major donors, foundations, and institutional funders want to see evidence of execution before they write seven-figure checks. Every scholarship funded, every survivor served, every story documented is that evidence.",
      },
      {
        type: "h2",
        content: "Frequently Asked Questions",
      },
      {
        type: "h3",
        content: "What is the Stroke Lyfe Recovery Center?",
      },
      {
        type: "p",
        content:
          "The Stroke Lyfe Recovery Center is a planned dedicated rehabilitation facility for stroke survivors — combining intensive neuroplasticity programming, experimental recovery technologies, community retreat, and ongoing research under one roof. Unlike standard outpatient rehab, it is designed for the long-term recovery phase that insurance doesn't cover, and will serve as both a clinical environment and a social community for survivors.",
      },
      {
        type: "h3",
        content: "When will the Stroke Lyfe Recovery Center open?",
      },
      {
        type: "p",
        content:
          "The Recovery Center is a multi-year fundraising goal. Phase one — building organizational infrastructure, funding scholarships, establishing program outcomes — is underway now. Phase two involves facility acquisition and build-out, with a target of 3-5 years from today given adequate donor support. Every donation today accelerates that timeline.",
      },
      {
        type: "h3",
        content: "What experimental stroke recovery treatments will be available at the Center?",
      },
      {
        type: "p",
        content:
          "The planned treatment menu includes transcranial magnetic stimulation (TMS), constraint-induced movement therapy (CIMT), virtual reality rehabilitation, brain-computer interface (BCI) training, and high-intensity neuroplasticity programs that far exceed standard therapy volumes. All approaches are evidence-based with documented safety profiles. The Center will also serve as a research site, generating outcome data that advances the field for all survivors.",
      },
      {
        type: "cta",
        label: "Help Build the Recovery Center",
        href: "/donate",
        sub: "Your donation today builds the foundation for everything we're creating. Tax-deductible. EIN 99-1313589.",
      },
    ],
  },
  {
    slug: "driving-after-stroke-vehicle-modifications",
    title: "Driving After Stroke: The Vehicle Independence Program Stroke Lyfe Is Building",
    description:
      "Losing the ability to drive after a stroke is losing independence. Stroke Lyfe is building a Vehicle Independence Program to fund adaptive driving evaluations and vehicle modifications for survivors who can't afford them.",
    tag: "Independence",
    date: "May 22, 2026",
    publishedAt: "2026-05-22",
    readTime: "7 min read",
    author: "Nick Kremers",
    sections: [
      {
        type: "p",
        content:
          "The day your neurologist tells you that you can't drive is one of the most underestimated losses in stroke recovery. People nod sympathetically when you mention it, then quickly move on. But losing your driver's license after a stroke isn't just inconvenient. It is losing the ability to get to your own medical appointments without scheduling around someone else's calendar. It's not being able to pick up your kids from school. It's a quiet, daily reminder that you are dependent on other people for things that used to require no thought at all.",
      },
      {
        type: "p",
        content:
          "For many survivors — particularly those with right-side weakness, visual field deficits, or processing speed changes — the path back to driving runs through adaptive equipment. Hand controls. Spinner knobs. Left-foot accelerator pedals. Swivel seats. Vehicle lift systems. Technology that exists, that works, and that most insurance plans — including Medicare — refuse to cover.",
      },
      {
        type: "h2",
        content: "The Cost Barrier Nobody Talks About",
      },
      {
        type: "p",
        content:
          "Before a survivor can even begin the process of returning to driving, they typically need a formal evaluation from a certified driving rehabilitation specialist (CDRS) — a specialist trained to assess visual field, reaction time, cognitive processing, and physical control in a vehicle context. These evaluations run $300-$600. They are rarely covered by insurance. For a survivor living on disability income, that's a month of groceries.",
      },
      {
        type: "p",
        content:
          "If the evaluation recommends adaptive equipment, costs escalate significantly. Basic hand controls — which allow a survivor with leg weakness to control throttle and brake via a lever mechanism — typically cost $800-$2,000 installed. More complex modifications run much higher: full wheelchair-accessible vehicle conversions can reach $30,000-$60,000. A power swivel seat, $2,000-$5,000. A left-foot accelerator, $500-$1,500.",
      },
      {
        type: "ul",
        items: [
          "Driver evaluation by certified driving rehab specialist (CDRS): $300-$600 — rarely covered by insurance",
          "Hand controls (push-pull or push-right-angle): $800-$2,000 installed",
          "Steering spinner / knob for one-handed control: $300-$800",
          "Left-foot accelerator: $500-$1,500",
          "Power swivel seat for easier entry/exit: $2,000-$5,000",
          "Full wheelchair-accessible vehicle conversion: $20,000-$60,000",
        ],
      },
      {
        type: "h2",
        content: "What the Stroke Lyfe Vehicle Independence Program Will Do",
      },
      {
        type: "p",
        content:
          "Stroke Lyfe is building a Vehicle Independence Program to fund access to adaptive driving evaluations and equipment for survivors who cannot afford them. This is not a distant vision — it is a defined program that our donation base is actively building toward. In the near term, we plan to fund driving evaluations for qualifying survivors on a grant basis. As the program scales, we will fund equipment grants for adaptive vehicle modifications.",
      },
      {
        type: "p",
        content:
          "We're also exploring partnerships with adaptive vehicle modification companies, CDRS professionals who want to provide sliding-scale evaluations, and state vocational rehabilitation offices that can layer funding on top of Stroke Lyfe grants. The program is designed to meet survivors where insurance stops.",
      },
      {
        type: "blockquote",
        content:
          "The day you drive yourself to your own doctor's appointment — without calling anyone, without arranging anything, without depending on anyone — is the day you start feeling like yourself again. That's what we're funding.",
      },
      {
        type: "h2",
        content: "Why Independence Changes Everything",
      },
      {
        type: "p",
        content:
          "The research on transportation access and health outcomes is unambiguous: people who cannot reliably get to medical appointments have worse outcomes. Missed follow-up visits. Delayed interventions. Deteriorating physical conditioning from reduced mobility. The isolation that compounds depression. For stroke survivors, whose long-term recovery depends on consistent access to therapy, coaching, and community — transportation access isn't peripheral. It's central.",
      },
      {
        type: "p",
        content:
          "Beyond the clinical dimension, driving represents something the clinical literature doesn't always capture: identity. The stroke survivor who can drive herself to the gym, to her daughter's soccer game, to lunch with a friend — that person is reclaiming her life in the most concrete possible way. It signals to herself and everyone around her that stroke doesn't get to define the boundaries of what she can do.",
      },
      {
        type: "h2",
        content: "Frequently Asked Questions",
      },
      {
        type: "h3",
        content: "Can stroke survivors drive again?",
      },
      {
        type: "p",
        content:
          "Many stroke survivors are able to return to driving, though requirements vary by state and individual. Most states require medical clearance and a formal driving evaluation by a certified driving rehabilitation specialist (CDRS). The evaluation assesses visual field, reaction time, cognitive processing, and physical control. Survivors with right-side weakness, visual field deficits, or processing speed changes often qualify for adaptive equipment that enables safe driving. The Stroke Lyfe Vehicle Independence Program is building toward funding these evaluations and equipment for survivors who cannot afford them.",
      },
      {
        type: "h3",
        content: "What vehicle modifications help stroke survivors drive?",
      },
      {
        type: "p",
        content:
          "Common adaptive vehicle modifications for stroke survivors include: hand controls (push-pull or push-right-angle mechanisms for throttle and brake), spinner knobs for one-handed steering, left-foot accelerator pedals for survivors with right-side weakness, swivel seats for easier vehicle entry and exit, and wheelchair lift systems for those with mobility equipment. The appropriate modifications depend on the specific deficits resulting from the stroke and are determined during a formal CDRS evaluation.",
      },
      {
        type: "h3",
        content: "Does insurance cover vehicle modifications for stroke survivors?",
      },
      {
        type: "p",
        content:
          "In most cases, no. Medicare and standard private insurance plans do not cover adaptive vehicle modifications or the CDRS evaluations that determine what modifications are needed. Some state vocational rehabilitation programs provide partial coverage for modifications that enable employment. The Stroke Lyfe Vehicle Independence Program is specifically designed to fund the gap that insurance leaves — starting with evaluations, scaling to equipment grants.",
      },
      {
        type: "cta",
        label: "Fund the Vehicle Independence Program",
        href: "/donate",
        sub: "Your donation today builds the program that puts stroke survivors back behind the wheel.",
      },
    ],
  },
  {
    slug: "experimental-stroke-recovery-treatments",
    title: "Experimental Stroke Recovery: The Treatments Pushing Past What Medicine Says Is Possible",
    description:
      "The standard of care says stroke recovery plateaus at six months. The research — and Nick Kremers's own experience — says otherwise. Here's what experimental stroke recovery looks like, and why a dedicated facility changes everything.",
    tag: "Science",
    date: "May 22, 2026",
    publishedAt: "2026-05-22",
    readTime: "8 min read",
    author: "Nick Kremers",
    sections: [
      {
        type: "p",
        content:
          "I was told I'd reached my recovery ceiling about 18 months after my stroke. My insurance coverage had run out. My outpatient therapy schedule had dwindled to nothing. Neurologically speaking, by the prevailing standard of care, I was supposed to be at or near my final outcome — the permanent expression of whatever function the stroke had left me with. I kept going anyway. And what I found — on my own, through my own research, through a community of survivors and clinicians who refused to accept the same ceiling — fundamentally changed what I believe is possible.",
      },
      {
        type: "p",
        content:
          "This post is about the treatments pushing the frontier of stroke recovery: what they are, what the evidence says, what I've experienced personally, and why building a dedicated facility to deliver them systematically is one of Stroke Lyfe's core goals.",
      },
      {
        type: "h2",
        content: "Constraint-Induced Movement Therapy (CIMT)",
      },
      {
        type: "p",
        content:
          "CIMT has one of the strongest evidence bases in stroke rehabilitation research. The principle is elegant: restrict the unaffected limb — typically with a mitt or sling — and force the affected limb to perform the work. The result is a massive increase in repetitions with the affected limb, which drives neuroplastic reorganization at a rate that conventional therapy can't approach. A standard CIMT protocol involves 6 hours of intensive therapy per day for 10 consecutive weekdays. Compare that to the 13-minute average in standard inpatient care.",
      },
      {
        type: "p",
        content:
          "The research outcomes are significant. A landmark randomized controlled trial published in the Journal of the American Medical Association showed that chronic stroke patients — those more than a year post-stroke — showed clinically meaningful improvement after CIMT, with gains maintained at two-year follow-up. The barrier to CIMT is access: the intensity and duration of the protocol make it impractical in standard outpatient settings.",
      },
      {
        type: "h2",
        content: "Transcranial Magnetic Stimulation (TMS)",
      },
      {
        type: "p",
        content:
          "TMS uses precisely targeted magnetic fields to stimulate or inhibit specific regions of the brain. In stroke rehabilitation, TMS is used to modulate the balance between the affected and unaffected hemispheres — reducing over-activity in the unaffected hemisphere that can suppress recovery signals from damaged regions, or directly stimulating motor cortex areas linked to the affected limb.",
      },
      {
        type: "p",
        content:
          "Multiple meta-analyses have shown TMS produces statistically significant improvements in upper limb motor function in chronic stroke patients. It's offered at major academic medical centers, typically as part of research protocols. That means most survivors — particularly those outside major metropolitan areas — cannot access it. The Stroke Lyfe Recovery Center is planned to include TMS as a standard offering, not a research privilege.",
      },
      {
        type: "h2",
        content: "Virtual Reality Rehabilitation",
      },
      {
        type: "p",
        content:
          "VR rehabilitation creates immersive environments where survivors can perform high-repetition movement tasks — reaching, grasping, balance training — in contexts that are engaging enough to sustain the intensity required for neuroplastic change. The research shows two advantages over conventional therapy: survivors complete more repetitions in a given session, and the engaging environment reduces the perception of effort, which improves compliance over time.",
      },
      {
        type: "p",
        content:
          "Systems like the MindMaze and XRHealth platforms have FDA clearance and documented clinical outcomes. Consumer VR platforms are increasingly being adapted for rehabilitation use, potentially making high-repetition motor training accessible at home. The Recovery Center will use clinical-grade VR systems for intensive in-facility programming, and we're exploring pathways to fund home-system access for survivors after they leave.",
      },
      {
        type: "h2",
        content: "Brain-Computer Interface Training",
      },
      {
        type: "p",
        content:
          "Brain-computer interface (BCI) technology translates detected neural signals — the brain's attempt to initiate movement — into actual movement of an affected limb, via robotics or electrical stimulation. The critical principle: when the brain's intention to move is immediately paired with actual movement of the target limb, the closed feedback loop accelerates neuroplastic reorganization in ways that voluntary effort alone cannot achieve.",
      },
      {
        type: "p",
        content:
          "BCI-based stroke rehabilitation is still largely in the research phase, but early trial data is compelling. Several devices have received FDA breakthrough designation. The technology is moving fast, and a dedicated facility positioned to integrate emerging BCI tools will be able to offer survivors access to the next generation of recovery technology as it becomes clinically available.",
      },
      {
        type: "h2",
        content: "Why a Dedicated Facility Is the Key",
      },
      {
        type: "p",
        content:
          "None of the above treatments are theoretical. They exist. The problem is access. CIMT requires dedicated space, trained practitioners, and 6-hour daily sessions that no standard outpatient clinic can accommodate. TMS requires capital equipment and expertise. VR rehabilitation requires systems. BCI training requires specialty hardware and programming. Each individually is inaccessible for most survivors. A dedicated facility that integrates all of them — where an intensive two-week stay can combine CIMT with daily TMS, VR sessions, and peer support — is the delivery model that makes the science accessible.",
      },
      {
        type: "blockquote",
        content:
          "The treatments that can push recovery far beyond the standard ceiling already exist. The missing piece is a place — purpose-built, properly staffed, fully equipped — to deliver them.",
      },
      {
        type: "h2",
        content: "Frequently Asked Questions",
      },
      {
        type: "h3",
        content: "What are the most effective experimental stroke recovery treatments?",
      },
      {
        type: "p",
        content:
          "The approaches with the strongest evidence for chronic stroke recovery — those with documented outcomes in peer-reviewed research — include: constraint-induced movement therapy (CIMT), transcranial magnetic stimulation (TMS), virtual reality rehabilitation for motor and balance training, and emerging brain-computer interface (BCI) protocols. High-intensity neuroplasticity programs that exceed standard therapy volumes by 5-10x also show significant outcomes in trials. All of these are evidence-based with documented safety profiles.",
      },
      {
        type: "h3",
        content: "Can stroke recovery happen years after the stroke?",
      },
      {
        type: "p",
        content:
          "Yes. Neuroplastic recovery has been documented years — and in some cases more than a decade — after stroke. The critical variable is continued practice intensity, not time. Most survivors plateau because they lose access to the intensity of practice that drives recovery — not because their brains stop responding. Research from institutions including the University of Southern California and NINDS has documented meaningful improvements in chronic stroke patients (those 1+ years post-stroke) using high-intensity protocols.",
      },
      {
        type: "h3",
        content: "Are experimental stroke treatments covered by insurance?",
      },
      {
        type: "p",
        content:
          "Most experimental stroke treatments — including CIMT in its intensive form, TMS for stroke motor rehabilitation, clinical VR rehabilitation, and BCI training — are not covered by standard insurance. TMS has limited coverage for depression; stroke motor rehabilitation applications remain largely out-of-pocket. This is precisely why Stroke Lyfe's donor-funded model and planned Recovery Center are essential: to make evidence-based experimental treatments accessible regardless of insurance status.",
      },
      {
        type: "cta",
        label: "Fund the Future of Stroke Recovery",
        href: "/donate",
        sub: "Your donation funds the programs and facility that make experimental recovery accessible. Tax-deductible. EIN 99-1313589.",
      },
    ],
  },
  {
    slug: "what-your-stroke-lyfe-donation-builds",
    title: "What Your Donation to Stroke Lyfe Inc. Actually Builds: The Complete Vision",
    description:
      "Most nonprofit donation pages show you a button. We want to show you the full picture — every program, every goal, every dollar accounted for. Here's exactly what Stroke Lyfe is building and why every donation moves it forward.",
    tag: "Donation",
    date: "May 22, 2026",
    publishedAt: "2026-05-22",
    readTime: "8 min read",
    author: "Nick Kremers",
    sections: [
      {
        type: "p",
        content:
          "Most nonprofit donation pages show you a number and a button. We want to do something different. Stroke Lyfe Inc. (EIN: 99-1313589) is a 501(c)(3) public charity founded by stroke survivor Nick Kremers — and we want every donor to understand exactly what they're funding, why it matters, and how it connects to a vision that is genuinely different from anything that currently exists in the stroke recovery space.",
      },
      {
        type: "p",
        content:
          "This post lays out the complete picture: what we're doing today, what we're building tomorrow, and what every dollar between $25 and $100,000 actually enables. Transparency isn't just a policy for us — it's a founding value.",
      },
      {
        type: "h2",
        content: "What Donations Fund Today",
      },
      {
        type: "ul",
        items: [
          "$25 — One week of daily motivation tools, mindset content, and social connection resources for a survivor currently in our programs",
          "$50 — One month of peer community and social programming access for a survivor who would otherwise be isolated",
          "$97 — One full Survivor Scholarship into a recovery program: coaching, community, AI tools, and accountability for one month",
          "$150 — A peer mentor match for a survivor — connecting them to someone who has lived a similar stroke profile and is willing to walk alongside their recovery",
          "$297 — A Mentored Scholarship: three months of group coaching, accountability check-ins, and structured recovery programming",
          "$997 — An Elite Scholarship: personalized 1:1 coaching with Nick Kremers, a custom recovery plan, and lifetime program access for one survivor",
          "$1,000 — Full access to every Stroke Lyfe program for ten survivors for one month — we'll send you their first names",
        ],
      },
      {
        type: "h2",
        content: "What Donations Build Tomorrow",
      },
      {
        type: "p",
        content:
          "Every dollar above our immediate program costs goes into the capital fund for Stroke Lyfe's long-term vision. Here is what that vision consists of — in full:",
      },
      {
        type: "ul",
        items: [
          "The Stroke Lyfe Recovery Center: A dedicated rehabilitation facility combining intensive neuroplasticity programming, experimental treatments (TMS, CIMT, VR therapy, BCI), and a community retreat environment where survivors can spend extended time recovering alongside peers",
          "The Vehicle Independence Program: Funded driving evaluations by certified rehabilitation specialists, and equipment grants for adaptive vehicle modifications — so survivors can drive themselves to their own appointments and reclaim their independence",
          "Expanded Peer Connection: Profile-matched survivor pairs across the country, supported by a structured program and regular community events — both virtual and eventually in-person at the Recovery Center",
          "Social Recovery Programs: Structured programming specifically for the social and identity dimensions of stroke recovery — the losses that insurance doesn't acknowledge and philanthropy has mostly ignored",
          "Research Partnerships: Outcome data collected across all Stroke Lyfe programs, shared with academic partners to advance what the field knows about long-term stroke recovery",
        ],
      },
      {
        type: "h2",
        content: "Why This Organization — and Why Now",
      },
      {
        type: "p",
        content:
          "Nick Kremers had his stroke on December 3, 2018, at age 36. He was predicted 30% recovery. He's at 90%+ more than seven years later. He built Stroke Recovery Academy to give survivors access to the intensive, neuroplasticity-driven recovery model that worked for him. He built Stroke Lyfe Inc. to fund access for every survivor who couldn't afford it — and to build the programs and facilities that the medical system has never adequately funded.",
      },
      {
        type: "p",
        content:
          "What makes this organization different is not just the programs — it's the founder. Nick isn't a healthcare executive or a nonprofit professional. He is a survivor who refused the ceiling he was given, rebuilt his function through sheer intensity and refusal to give up, and then turned his recovery into a platform for every other survivor who deserves the same chance. The E-E-A-T of Stroke Lyfe is a person who has lived every program we're building.",
      },
      {
        type: "blockquote",
        content:
          "I don't want to run a scholarship fund. I want to change what's possible for stroke survivors — physically, socially, and economically. Your donation is the foundation that makes that possible.",
      },
      {
        type: "h2",
        content: "How We Use Your Money",
      },
      {
        type: "p",
        content:
          "87 cents of every dollar donated to Stroke Lyfe goes directly to programs. The remaining 13 cents covers operational costs: payment processing, financial compliance, and the administrative infrastructure required to maintain our 501(c)(3) status. We publish our financial allocation annually. We do not pay board members. Our financials are filed with the IRS and available on our Transparency page.",
      },
      {
        type: "h2",
        content: "Frequently Asked Questions",
      },
      {
        type: "h3",
        content: "Is Stroke Lyfe Inc. a legitimate nonprofit?",
      },
      {
        type: "p",
        content:
          "Yes. Stroke Lyfe Inc. (EIN: 99-1313589) is a federally recognized 501(c)(3) public charity registered in Arkansas. Donations are tax-deductible to the fullest extent of the law. Our financial records are published on our Transparency page and filed annually with the IRS. The organization was founded by Nick Kremers, a stroke survivor, and is governed by an independent board of directors.",
      },
      {
        type: "h3",
        content: "How does Stroke Lyfe use donations?",
      },
      {
        type: "p",
        content:
          "87 cents of every dollar goes directly to programs: survivor scholarships, peer connection, motivation tools, caregiver support, and the capital fund for the Recovery Center and Vehicle Independence Program. 13 cents covers operations including payment processing, compliance, and administrative infrastructure. Program allocation is published in our annual report. No board members receive compensation.",
      },
      {
        type: "h3",
        content: "What is the difference between Stroke Lyfe and Stroke Recovery Academy?",
      },
      {
        type: "p",
        content:
          "Stroke Recovery Academy (SRA) is a platform that provides intensive recovery programming, AI coaching, exercise libraries, and community for stroke survivors. Stroke Lyfe Inc. is the 501(c)(3) nonprofit founded to fund access to SRA and other recovery resources for survivors who cannot afford them — and to build broader programs (Vehicle Independence, Recovery Center, social recovery, research) that operate independently of SRA. Nick Kremers founded both organizations.",
      },
      {
        type: "h3",
        content: "Can I donate in honor of someone who had a stroke?",
      },
      {
        type: "p",
        content:
          "Yes. The Stroke Lyfe donation form includes a tribute option — you can make a gift in honor or memory of someone, and optionally send them (or their family) a notification email. Tribute donations are fully tax-deductible and go to the same programs as all other donations. A receipt is sent to your email address.",
      },
      {
        type: "cta",
        label: "Donate Now and Help Build This",
        href: "/donate",
        sub: "Every dollar is a brick in what we're building. Tax-deductible. EIN 99-1313589. 87 cents on the dollar goes to programs.",
      },
    ],
  },
  {
    slug: "why-donate-stroke-lyfe",
    title: "Why I Built a Nonprofit to Fund What Insurance Won't: Nick Kremers on Where Every Stroke Lyfe Dollar Goes",
    description:
      "Stroke Lyfe Inc. (EIN: 99-1313589) was founded by stroke survivor Nick Kremers to fund what the medical system doesn't: scholarships, vehicle independence, research, and community. Here's exactly where your donation goes — and why there's no ceiling on what's possible.",
    tag: "Giving",
    date: "May 22, 2026",
    readTime: "12 min read",
    author: "Nick Kremers",
    publishedAt: "2026-05-22",
    sections: [
      {
        type: "h2",
        content: "The Day I Realized Insurance Was Never the Answer",
      },
      {
        type: "p",
        content:
          "After 60 days of inpatient rehabilitation — the amount my insurance authorized — I was discharged. Not because I was recovered. Not because the ceiling was in sight. Because the policy said 60 days, and 60 days was done. I was still using a wheelchair. I still couldn't use my left hand reliably. And the medical system's parting message was essentially: good luck. In the years that followed, I learned that the money to fund real stroke recovery absolutely exists. It's simply pointed in every direction except toward the survivors who need it most. That realization is why Stroke Lyfe Inc. exists.",
      },
      {
        type: "h2",
        content: "What Stroke Lyfe Is — and What It Isn't",
      },
      {
        type: "p",
        content:
          "Stroke Lyfe Inc. (EIN: 99-1313589) is a federally recognized 501(c)(3) nonprofit I founded in Lavaca, Arkansas after building Stroke Recovery Academy from a wheelchair. The nonprofit exists for one reason: to fund the recovery resources the medical system doesn't cover and philanthropy has largely ignored. We're not a hospital. We don't provide clinical care. We fund what comes after the clinical system stops — the coaching, the community, the motivation, the peer connection, the vehicle modifications, the research. The things that actually determine long-term outcomes for stroke survivors.",
      },
      {
        type: "h2",
        content: "The 87-Cent Promise: Where Your Dollar Actually Goes",
      },
      {
        type: "p",
        content:
          "87 cents of every donated dollar goes directly to programs. The remaining 13 cents covers essential administrative and operational costs. We don't compensate board members. We publish financial records annually. When you donate to Stroke Lyfe, here's what your money funds:",
      },
      {
        type: "ul",
        items: [
          "Survivor Scholarships — funding access to recovery coaching and community programs for survivors who can't afford them",
          "Peer Mentor Matches — connecting survivors with other survivors who've lived what they're living, in the same body, with the same fears",
          "Social Recovery Programs — because isolation after stroke is as neurologically damaging as the injury itself",
          "Vehicle Independence Program — evaluations and adaptive modifications that let survivors drive again; insurance won't pay for these",
          "Recovery Research — supporting neuroplasticity research and experimental treatment development",
          "Caregiver Resources — because the people who hold survivors together are burning out and need support too",
          "Hospital Book Program — putting The Stroke Recovery Revolution in the hands of survivors at rehab facilities before they go home",
        ],
      },
      {
        type: "h2",
        content: "There Is No Cap on What's Possible",
      },
      {
        type: "p",
        content:
          "When someone asks 'how much should I give?' the honest answer is: give what genuinely moves the needle for you. $25 funds a week of motivation tools and resources for one survivor. $97 funds a full Survivor Scholarship for a month. $1,000 funds ten survivors for an entire month — and I'll send you their first names. $10,000 moves the needle toward the rehabilitation facility I've been designing since I was in a wheelchair: a real, purpose-built place with experimental recovery technology, a community environment, and a social program for survivors who've lost their social lives along with their motor function. There is no ceiling on this mission — only on what the funding allows us to build.",
      },
      {
        type: "blockquote",
        content:
          "The prognosis they give you at discharge is a floor, not a ceiling. That principle applies to stroke recovery — and it applies to what a well-funded nonprofit can build.",
      },
      {
        type: "h2",
        content: "Donation-Powered Giveaways: What the Community Gets Back",
      },
      {
        type: "p",
        content:
          "As Stroke Lyfe grows, so does what we give back. Through my TikTok (@nickkremers) and Facebook (@NicholasKremersSr), I run community giveaways for stroke survivors and caregivers: recovery products, adaptive equipment, books, program access, and more. The bigger the community giving, the bigger and more frequent those giveaways become. This isn't a marketing tactic — it's what happens when a nonprofit is run by a survivor who remembers exactly what it felt like to need resources and not be able to afford them. Follow along. The giveaways are real, and they grow with the mission.",
      },
      {
        type: "h2",
        content: "Give for Any Reason — Including No Reason at All",
      },
      {
        type: "p",
        content:
          "You don't need a personal story to donate. You don't need a specific reason. We don't require one. You can give in honor of a loved one who had a stroke, in memory of someone who didn't make it, in support of a survivor you know, in solidarity with the 800,000 Americans who have a stroke every year — or simply because the mission resonates and you have the means. Every dollar, for any reason, goes directly to the programs.",
      },
      {
        type: "h2",
        content: "Frequently Asked Questions",
      },
      {
        type: "h3",
        content: "Is a donation to Stroke Lyfe Inc. tax-deductible?",
      },
      {
        type: "p",
        content:
          "Yes. Stroke Lyfe Inc. (EIN: 99-1313589) is a federally recognized 501(c)(3) public charity. Donations are tax-deductible to the fullest extent allowed by law. You'll receive an email receipt for any donation, which serves as your documentation for tax purposes. For major gifts, we recommend speaking with a tax advisor about strategies including Donor Advised Funds and IRA Qualified Charitable Distributions.",
      },
      {
        type: "h3",
        content: "Can I donate monthly instead of one-time?",
      },
      {
        type: "p",
        content:
          "Yes, and monthly giving is the most impactful option. The Stroke Lyfe donation form has a one-time and monthly toggle. Monthly gifts provide predictable funding that lets us make multi-month scholarship commitments — which is what actually drives long-term recovery for survivors. A $25/month gift funds a Survivor Scholarship every four months. A $100/month gift sustains ongoing coaching access for a survivor as long as you give.",
      },
      {
        type: "h3",
        content: "Is there a maximum donation amount?",
      },
      {
        type: "p",
        content:
          "No. There is no maximum donation. Stroke Lyfe accepts gifts of any size. For major gifts — $10,000 and above — we work directly with donors on naming opportunities, program sponsorships, and other ways to make the gift meaningful and impactful. Email nick@strokelyfe.org directly for those conversations.",
      },
      {
        type: "h3",
        content: "Can I donate in honor or memory of someone?",
      },
      {
        type: "p",
        content:
          "Yes. The Stroke Lyfe donation form includes a tribute section. Enter the name of the person you're honoring or remembering, and optionally add a notification email to let them (or their family) know about the tribute gift. Tribute donations go to the same programs as all other gifts and are fully tax-deductible.",
      },
      {
        type: "cta",
        label: "Donate Now — Any Amount, Any Reason",
        href: "/donate",
        sub: "Tax-deductible. EIN 99-1313589. 87 cents of every dollar goes directly to programs. Secure checkout via Stripe.",
      },
    ],
  },
  {
    slug: "stroke-lyfe-scholarships-how-they-work",
    title: "Stroke Lyfe Survivor Scholarships: Who Qualifies, What They Cover, and How to Apply",
    description:
      "Stroke Lyfe Inc. funds Survivor Scholarships for stroke survivors who can't afford recovery coaching, community programs, and peer support. No income minimum to apply. Nick reviews every application personally within 72 hours.",
    tag: "Programs",
    date: "May 22, 2026",
    readTime: "10 min read",
    author: "Nick Kremers",
    publishedAt: "2026-05-22",
    sections: [
      {
        type: "h2",
        content: "Why Survivor Scholarships Exist",
      },
      {
        type: "p",
        content:
          "The recovery model that worked for me — intensive, neuroplasticity-driven, coaching-based — is not free. Stroke Recovery Academy, the peer community, the accountability systems, the coaching resources: these cost money to build and to sustain. I knew from the beginning that if I built something that worked but only rich survivors could access it, I hadn't solved the problem. I'd just built a better version of what already exists: good things for the people who can already afford good things. Stroke Lyfe Survivor Scholarships exist to close that gap. They're how we make sure that what works isn't gated by what someone's bank account happens to look like after a stroke destroyed their income.",
      },
      {
        type: "h2",
        content: "Three Scholarship Tiers",
      },
      {
        type: "p",
        content:
          "Stroke Lyfe offers three scholarship levels, each designed to match different stages of need and recovery intensity:",
      },
      {
        type: "ul",
        items: [
          "Survivor Scholarship ($97/month value) — Recovery coaching tools, peer community access, motivation content, and social programming. This is the foundation every survivor needs: the daily accountability, the people who understand, and the resources to keep showing up.",
          "Mentored Scholarship ($297/month value) — Everything in the Survivor Scholarship, plus structured group coaching, accountability partnerships, and identity recovery work. For survivors who need more than a community — they need someone checking on them.",
          "Elite Scholarship ($997/month value) — Full access to every Stroke Lyfe program, including personalized 1:1 coaching, custom recovery plan design, lifetime program access, and direct contact with Nick. For survivors in critical stages of recovery who need intensive, individualized support.",
        ],
      },
      {
        type: "h2",
        content: "What Each Scholarship Covers",
      },
      {
        type: "p",
        content:
          "Stroke Lyfe scholarships fund access to the following programs, depending on the scholarship level:",
      },
      {
        type: "ul",
        items: [
          "Stroke Recovery Academy curriculum — the neuroplasticity-based recovery education program Nick built from his own recovery",
          "Peer mentor matching — connection with a survivor who's lived the same deficits, the same grief, and the same recovery fight",
          "Group coaching sessions — structured accountability with a cohort of survivors at similar stages",
          "Social recovery programming — community events, check-ins, and peer support designed to reverse the isolation that strokes create",
          "Mindset and motivation content — daily tools built around the psychology of long-term recovery",
          "Caregiver resources — support and guidance for the family members and partners who carry the recovery alongside the survivor",
        ],
      },
      {
        type: "h2",
        content: "Who Qualifies",
      },
      {
        type: "p",
        content:
          "Any stroke survivor who cannot afford access to recovery programs qualifies to apply. We don't require income documentation. We don't have a minimum or maximum time post-stroke. We don't exclude survivors based on deficit type, geography, or the severity of the stroke. Tell us your situation honestly. We respond honestly about what we can offer. If funding is available, you receive access immediately. If it isn't, you're placed on the waitlist and notified the moment a scholarship opens.",
      },
      {
        type: "blockquote",
        content:
          "I've never met a stroke survivor who didn't deserve access to recovery. I've met thousands who couldn't afford it. That's the problem we're solving.",
      },
      {
        type: "h2",
        content: "How to Apply",
      },
      {
        type: "p",
        content:
          "The application is straightforward. You'll be asked for basic contact information, your location, how long ago your stroke occurred, your current therapy access situation, what programs interest you, and — most importantly — your story. What happened, what your current challenges are, and what would change for you if you had access to coaching and community. Nick reviews every application personally, typically within 72 hours. You'll hear back with a clear answer.",
      },
      {
        type: "h2",
        content: "How to Donate to Fund a Scholarship",
      },
      {
        type: "p",
        content:
          "Scholarships are funded entirely by donations. A $97 donation funds one Survivor Scholarship for a month. A $297 donation funds one Mentored Scholarship for a month. A $997 donation funds one Elite Scholarship. Monthly donors are the backbone of the program — a $97/month gift funds a survivor continuously, with no gap. The waitlist shrinks every time a new donation comes in, and the names on that waitlist are real people who applied because they need what we have and couldn't afford it on their own.",
      },
      {
        type: "h2",
        content: "Frequently Asked Questions",
      },
      {
        type: "h3",
        content: "Do scholarship recipients pay anything?",
      },
      {
        type: "p",
        content:
          "No. Stroke Lyfe scholarships cover the full cost of program access for the scholarship period. Recipients don't pay anything. Scholarships are funded entirely by donors. We do ask that scholarship recipients stay engaged with the program — not as a condition of continuing access, but because engagement is what drives recovery outcomes.",
      },
      {
        type: "h3",
        content: "How long does a scholarship last?",
      },
      {
        type: "p",
        content:
          "Initial scholarships are typically one to three months, depending on the scholarship level and available funding. We review scholarship continuations based on the survivor's progress and ongoing funding availability. Survivors on the Elite Scholarship track may receive lifetime program access if their situation warrants it and funding supports it. We don't cut survivors off without communication — if a scholarship is expiring, we tell you in advance and work with you on options.",
      },
      {
        type: "h3",
        content: "Can a caregiver apply on behalf of a stroke survivor?",
      },
      {
        type: "p",
        content:
          "Yes. Caregivers can submit an application on behalf of a survivor who can't complete the form independently. Include the survivor's information as the primary applicant and note in the story field that you're completing the form on their behalf. If you have questions, email nick@strokelyfe.org directly.",
      },
      {
        type: "h3",
        content: "What if funding isn't available when I apply?",
      },
      {
        type: "p",
        content:
          "You're placed on the waitlist and notified immediately when a scholarship becomes available. Waitlist position is generally first-applied, first-served, though we give priority to survivors in acute need. The waitlist shrinks every time a new donation funds a scholarship — which is why donor support is directly linked to how quickly survivors get access.",
      },
      {
        type: "cta",
        label: "Apply for a Survivor Scholarship",
        href: "/apply",
        sub: "No income minimum. No documentation required. Nick reviews every application personally within 72 hours.",
      },
    ],
  },
  {
    slug: "are-donations-to-stroke-lyfe-tax-deductible",
    title: "Is a Donation to Stroke Lyfe Tax-Deductible? Your Complete Guide for Arkansas Donors and Beyond",
    description:
      "Yes — donations to Stroke Lyfe Inc. (EIN: 99-1313589) are fully tax-deductible. Here's everything Arkansas donors and national supporters need to know about charitable deductions, IRA giving, Donor Advised Funds, and in-kind donations.",
    tag: "Giving",
    date: "May 22, 2026",
    readTime: "9 min read",
    author: "Nick Kremers",
    publishedAt: "2026-05-22",
    sections: [
      {
        type: "h2",
        content: "The Short Answer",
      },
      {
        type: "p",
        content:
          "Yes. Donations to Stroke Lyfe Inc. are fully tax-deductible. We are a federally recognized 501(c)(3) public charity (EIN: 99-1313589), headquartered in Lavaca, Arkansas. Every dollar you donate — by credit card, check, bank transfer, stock, or Donor Advised Fund — qualifies for a federal charitable deduction and, in most states including Arkansas, a state income tax deduction as well. You'll receive a donation receipt by email for every gift, which is your documentation for tax purposes.",
      },
      {
        type: "h2",
        content: "The Federal Deduction: How It Works",
      },
      {
        type: "p",
        content:
          "If you itemize deductions on your federal income tax return (using Schedule A), you can deduct charitable cash contributions to Stroke Lyfe Inc. up to 60% of your Adjusted Gross Income (AGI) for the tax year. Cash contributions include credit card, check, ACH transfer, and online payments. Donations of appreciated property (such as stock) are generally deductible up to 30% of AGI at fair market value, with the added benefit that you avoid capital gains tax on the appreciation. Unused deductions can be carried forward for up to five years. For donors who take the standard deduction ($14,600 single / $29,200 married filing jointly in 2024), a Donor Advised Fund strategy can bundle multiple years of giving into a single deductible event — talk to your tax advisor about this.",
      },
      {
        type: "h2",
        content: "Arkansas State Tax Deduction",
      },
      {
        type: "p",
        content:
          "Arkansas allows taxpayers who itemize on their state return to deduct charitable contributions following federal rules. If you donate to Stroke Lyfe and itemize on your Arkansas state return (Form AR1), the same donation that qualifies federally qualifies for the Arkansas deduction. Arkansas has a graduated income tax rate, so the state-level benefit depends on your income bracket — consult a local tax professional for the precise number. What matters is that supporting a River Valley Arkansas nonprofit produces tax benefits at both the federal and state level for Arkansas residents.",
      },
      {
        type: "h2",
        content: "IRA Qualified Charitable Distributions (QCDs)",
      },
      {
        type: "p",
        content:
          "If you are 70½ or older, you can make a Qualified Charitable Distribution (QCD) directly from your IRA to Stroke Lyfe Inc. QCDs are excluded from your taxable income entirely — which is better than a standard deduction for many donors at that income level. The annual QCD limit is $105,000 per individual in 2024 ($210,000 per married couple). QCDs also count toward your Required Minimum Distribution (RMD), so they're an especially efficient giving vehicle for retirees who don't need their RMD income. To make a QCD to Stroke Lyfe, instruct your IRA custodian to send a check directly to Stroke Lyfe Inc. at 622 South River Rd., Lavaca, AR 72941, with EIN 99-1313589 noted on the check.",
      },
      {
        type: "h2",
        content: "Donor Advised Funds",
      },
      {
        type: "p",
        content:
          "If you have a Donor Advised Fund (DAF) at Fidelity Charitable, Schwab Charitable, Vanguard Charitable, or any community foundation, you can grant directly to Stroke Lyfe Inc. from your DAF. Search for 'Stroke Lyfe Inc.' or use EIN 99-1313589 to find us. DAF grants are not tax-deductible at the time of the grant (you already took the deduction when you funded the DAF), but they're an excellent way to support Stroke Lyfe if you've already set aside charitable assets.",
      },
      {
        type: "h2",
        content: "In-Kind Donations: Books, Equipment, and Products",
      },
      {
        type: "p",
        content:
          "Stroke Lyfe also accepts in-kind donations — physical goods that support our programs. If you're donating recovery equipment, adaptive devices, or other tangible items, the fair market value of those items is generally deductible as a charitable contribution. In-kind donations of $500 or more require IRS Form 8283. We're especially looking for recovery equipment, adaptive tools, and copies of The Stroke Recovery Revolution for our hospital donation program. Contact nick@strokelyfe.org to coordinate in-kind donations.",
      },
      {
        type: "h2",
        content: "Corporate Matching Donations",
      },
      {
        type: "p",
        content:
          "Many employers match employee charitable donations through corporate matching programs. If your employer offers matching, check whether Stroke Lyfe Inc. (EIN: 99-1313589) qualifies — most corporate matching programs accept any IRS-recognized 501(c)(3). A $100 personal donation matched 1:1 becomes a $200 donation to Stroke Lyfe at no additional cost to you. Some programs match 2:1 or higher. Check your HR department or benefits portal for details.",
      },
      {
        type: "h2",
        content: "Frequently Asked Questions",
      },
      {
        type: "h3",
        content: "Do I need a receipt for every donation?",
      },
      {
        type: "p",
        content:
          "For cash donations of $250 or more, the IRS requires a written acknowledgment from the charity. Stroke Lyfe sends an email receipt for every donation, which includes the date, amount, and a statement that no goods or services were provided in exchange (or, for tribute gifts, notes what was provided). For cash donations under $250, a bank statement or credit card record is sufficient, though our emailed receipt provides cleaner documentation. Keep all receipts for at least three years after filing.",
      },
      {
        type: "h3",
        content: "Can businesses deduct donations to Stroke Lyfe?",
      },
      {
        type: "p",
        content:
          "Yes. Corporate donations to Stroke Lyfe Inc. are deductible as charitable contributions on the business's tax return. The deduction limit is 10% of taxable income for C corporations, and donations flow through to individual returns for S corporations, partnerships, and sole proprietorships (subject to the individual 60% AGI limit). Businesses can also deduct sponsorship expenses as business expenses if there's a clear business benefit — consult your accountant for the right treatment for your specific situation.",
      },
      {
        type: "h3",
        content: "Is a tribute donation deductible even though it honors someone else?",
      },
      {
        type: "p",
        content:
          "Yes. A tribute donation — made in honor or memory of another person — is deductible to the person who makes the donation, not the person being honored. The donor receives the full deduction. The honored person receives no tax benefit (and no tax liability). The donation receipt goes to the donor's email address.",
      },
      {
        type: "h3",
        content: "What if I donated but didn't receive a receipt?",
      },
      {
        type: "p",
        content:
          "Email donate@strokelyfe.org with the date, amount, and email address you used to donate. We'll resend your receipt within 24 hours. If you provided an email at checkout, the receipt was sent automatically — check your spam folder first.",
      },
      {
        type: "cta",
        label: "Make a Tax-Deductible Donation Today",
        href: "/donate",
        sub: "Stroke Lyfe Inc. — EIN: 99-1313589 — 501(c)(3) Public Charity. Donations deductible to the fullest extent of the law.",
      },
    ],
  },
  {
    slug: "stroke-recovery-academy-strokelyfe-connection",
    title: "Stroke Recovery Academy and Stroke Lyfe: How Nick Built Both — and Why Every Donation Bridges the Gap",
    description:
      "Stroke Recovery Academy is Nick Kremers's for-profit coaching platform for stroke survivors. Stroke Lyfe Inc. is the nonprofit that funds access for survivors who can't afford it. Here's how the two connect — and why that matters for your donation.",
    tag: "Recovery",
    date: "May 22, 2026",
    readTime: "11 min read",
    author: "Nick Kremers",
    publishedAt: "2026-05-22",
    sections: [
      {
        type: "h2",
        content: "I Built It from a Wheelchair — Then Made It Free for the Survivors Who Need It Most",
      },
      {
        type: "p",
        content:
          "I built Stroke Recovery Academy in Fort Smith, Arkansas while I was still in a wheelchair. Not because I had funding. Not because someone told me the market was ready for a stroke recovery platform. Because I had spent years figuring out what actually worked — the neuroplasticity principles, the accountability systems, the mirror therapy protocols, the mindset frameworks — and I couldn't find a single platform that combined them into something a real survivor could use every day. So I built it. And then I realized I'd built it for the survivors who could afford it. That wasn't enough.",
      },
      {
        type: "h2",
        content: "What Stroke Recovery Academy Is",
      },
      {
        type: "p",
        content:
          "Stroke Recovery Academy (strokerecoveryacademy.com) is a membership platform built entirely around intensive, accountability-driven stroke recovery. It's not information alone — the internet has information. It's the system that wraps around the information: daily check-ins, peer accountability, a community of survivors who are actually doing the work, and the Sasquatch Coach, an AI trained on my voice and recovery philosophy that's available 24/7. The platform includes:",
      },
      {
        type: "ul",
        items: [
          "Recovery Academy — a 33-chapter curriculum covering neuroplasticity, mirror therapy, constraint-induced movement, drop foot protocols, speech recovery, cognitive rehab, and the psychology of long-term comeback",
          "Daily Exercise Library — 34 therapeutic exercises derived from Nick's exact recovery methods, trackable and progressable",
          "Sasquatch Coach AI — a 24/7 accountability AI trained on the Sasquatch Method, designed to notice when you've gone quiet and bring you back in",
          "The 66-Day Challenge — a structured program with daily missions across three phases, built around habit formation and momentum",
          "Survivor Community Wall — film your progress, share your wins, connect with survivors at Day 3 and Day 700",
          "Accountability Pods — small groups of 3–5 survivors checking in together and holding each other accountable",
        ],
      },
      {
        type: "h2",
        content: "The Gap That Created Stroke Lyfe",
      },
      {
        type: "p",
        content:
          "Stroke Recovery Academy costs money because building, hosting, and maintaining a platform of that quality costs money. That's not an apology — quality costs something. But after building SRA, I kept running into survivors who found the platform, understood what it could do for them, and couldn't afford access. Survivors on fixed incomes. Survivors whose stroke had ended their careers. Survivors who were already financially devastated by medical bills, caregiving costs, and the economic wreckage that a stroke leaves behind. The gap between who needed SRA and who could afford SRA was real and growing. Stroke Lyfe Inc. is the bridge.",
      },
      {
        type: "blockquote",
        content:
          "I can't build a recovery platform that only serves survivors who already had money. That's not solving the problem — it's a better version of what already exists.",
      },
      {
        type: "h2",
        content: "How Your Donation Funds Access",
      },
      {
        type: "p",
        content:
          "Donations to Stroke Lyfe Inc. fund Survivor Scholarships that cover the cost of Stroke Recovery Academy membership and associated programming. A $97 donation funds one survivor's Survivor Scholarship for a month — full platform access, peer community, coaching tools, and accountability systems. A $297 donation funds a Mentored Scholarship, which adds structured group coaching and accountability partnership. The survivors on our scholarship waitlist applied because they did the research, they understand what SRA can do for their recovery, and they couldn't afford it. Your donation removes the barrier.",
      },
      {
        type: "h2",
        content: "The Book: Expanding the Mission Beyond the Platform",
      },
      {
        type: "p",
        content:
          "The Stroke Recovery Revolution is a book I've been writing for survivors who don't have platform access — and for the hospitals, rehab facilities, and care teams who work with survivors every day. The book covers the same principles as the academy curriculum: neuroplasticity, the recovery techniques, the mindset frameworks, the science, and Nick's personal story from 0% to 90%+ function. Stroke Lyfe is building a hospital donation program to put this book in the hands of survivors at rehab facilities before they go home. Because the information that changes everything shouldn't require a subscription — it should be there on the bedside table when a survivor is still in the hospital wondering if any of this is going to work.",
      },
      {
        type: "h2",
        content: "Frequently Asked Questions",
      },
      {
        type: "h3",
        content: "What's the difference between Stroke Recovery Academy and Stroke Lyfe?",
      },
      {
        type: "p",
        content:
          "Stroke Recovery Academy (strokerecoveryacademy.com) is a for-profit membership platform where stroke survivors pay for access to the curriculum, daily exercises, Sasquatch Coach AI, and community. Stroke Lyfe Inc. (strokelyfe.org) is the 501(c)(3) nonprofit that funds scholarships for survivors who can't afford SRA membership. They're run by the same founder — me — but operate independently, with separate financials and separate governance. Donations to Stroke Lyfe fund the scholarship program and broader programs; they don't fund SRA operations.",
      },
      {
        type: "h3",
        content: "Can I get access to Stroke Recovery Academy without paying?",
      },
      {
        type: "p",
        content:
          "If you can't afford SRA access, apply for a Stroke Lyfe Survivor Scholarship at strokelyfe.org/apply. Nick reviews every application personally within 72 hours. If a scholarship is available and you qualify, you receive access immediately at no cost. If no scholarship is available, you're placed on the waitlist and notified when one opens.",
      },
      {
        type: "h3",
        content: "Is Stroke Recovery Academy evidence-based?",
      },
      {
        type: "p",
        content:
          "The principles in SRA are grounded in decades of neuroplasticity research — the same science that underlies constraint-induced movement therapy, mirror therapy, and the neuroplastic mechanisms now recognized in clinical stroke rehabilitation. What makes SRA different is the delivery: instead of clinical sessions that end when insurance runs out, SRA is a daily system designed for sustained, self-directed practice over months and years. Nick's own recovery — from a wheelchair at 30% prognosis to 90%+ function at 7.5 years post-stroke — is the proof-of-concept. The platform applies the science through a system a survivor can use at home, every day, indefinitely.",
      },
      {
        type: "cta",
        label: "Support Survivor Scholarship Access",
        href: "/donate",
        sub: "$97 funds one full Survivor Scholarship. $297 funds a Mentored Scholarship. Every dollar removes a barrier.",
      },
    ],
  },
  {
    slug: "arkansas-stroke-nonprofit-river-valley",
    title: "From the River Valley to Nationwide: How an Arkansas Stroke Survivor Is Changing What's Possible in Recovery",
    description:
      "Nick Kremers had a stroke in Fort Smith, Arkansas at age 36 and was told to accept 30% recovery. He reached 90%+. Now he's building Stroke Lyfe Inc. — an Arkansas-rooted nonprofit serving survivors nationwide — from Lavaca in the River Valley.",
    tag: "Community",
    date: "May 22, 2026",
    readTime: "10 min read",
    author: "Nick Kremers",
    publishedAt: "2026-05-22",
    sections: [
      {
        type: "h2",
        content: "This Started in Fort Smith",
      },
      {
        type: "p",
        content:
          "December 3, 2018. I was 36 years old, living in Fort Smith, Arkansas, when a massive ischemic stroke took out the left side of my brain and the right side of my body. The River Valley — the stretch of western Arkansas that runs along the Arkansas River from Fort Smith east through Van Buren, Alma, Dyer, and Lavaca — is where my story started. It's where I relearned to walk. It's where I figured out what neuroplasticity actually means in practice. And it's where I decided that what happened to me — and what I figured out on my own — shouldn't be locked behind a paycheck that a stroke already took from most survivors.",
      },
      {
        type: "h2",
        content: "Arkansas Has a Stroke Problem — and Not Enough Solutions",
      },
      {
        type: "p",
        content:
          "Arkansas sits in the heart of the Stroke Belt — the cluster of southeastern and south-central states with stroke rates significantly higher than the national average. Arkansas's stroke mortality rate is among the highest in the country. The state has high rates of the primary stroke risk factors: hypertension, diabetes, obesity, and smoking. The River Valley specifically — Sebastian County, Crawford County, Franklin County — has communities that are medically underserved, where access to specialist care after stroke is limited, follow-up PT is often unavailable after insurance ends, and the gap between hospital discharge and functional recovery is filled by nothing except willpower and whatever a family can manage on their own. This isn't a criticism of the care teams in this region — St. Edward's Mercy, UAMS Fort Smith, Conway Regional all have dedicated professionals working with real resource constraints. The problem isn't the clinicians. It's the system they're operating inside.",
      },
      {
        type: "h2",
        content: "Why Arkansas-Based Giving Matters",
      },
      {
        type: "p",
        content:
          "When an Arkansas resident donates to Stroke Lyfe Inc., they're supporting an organization that was born here, is headquartered here (622 South River Rd., Lavaca, AR 72941), and is directly building programs to serve survivors in this region. For Arkansas donors who itemize deductions, contributions to Stroke Lyfe are deductible on both federal and state returns — so every dollar you give also reduces your Arkansas income tax liability. That's a meaningful incentive to support a homegrown nonprofit over a national one with no roots in the communities you care about.",
      },
      {
        type: "blockquote",
        content:
          "I've met survivors in the River Valley who had no idea what neuroplasticity was when I talked to them — not because they weren't smart enough to understand, but because nobody ever explained it. Nobody told them that the brain keeps responding to practice long after the six-month cutoff. That's what we're fixing.",
      },
      {
        type: "h2",
        content: "The Hospital Book Program: Putting Recovery Knowledge at Bedside",
      },
      {
        type: "p",
        content:
          "One of the most immediate programs Stroke Lyfe is building is the hospital book donation initiative. The Stroke Recovery Revolution — the book I've written about the recovery model that took me from 0% to 90%+ — will be donated to stroke units and rehab facilities so that survivors have access to real recovery information before they're discharged into uncertainty. River Valley facilities are our starting point: St. Edward's Mercy Medical Center, UAMS Fort Smith, and the rehabilitation units associated with each. From there, we scale nationally. A $25 donation to Stroke Lyfe funds a book for a hospital unit. A $500 donation puts a case of books in a regional stroke center. Those books change what survivors believe is possible on the day they need to believe something.",
      },
      {
        type: "h2",
        content: "Speaking Engagements: Shattering Medical Myths in Person",
      },
      {
        type: "p",
        content:
          "I'm available to speak at hospitals, rehab facilities, survivor groups, nonprofit events, churches, civic organizations, and corporate wellness programs throughout the River Valley and nationally. The talk covers my story, the neuroscience behind what I did, and the practical recovery principles that any survivor — regardless of deficit type, time post-stroke, or prior medical prognosis — can apply. If you're associated with an Arkansas organization that could benefit from this conversation, reach out at nick@strokelyfe.org. I'm particularly interested in speaking at facilities that work directly with stroke survivors, because those rooms are full of people who need to hear what's actually possible — not what a discharge prognosis told them to expect.",
      },
      {
        type: "h2",
        content: "Giveaways for the Community: Social Media Meets Recovery",
      },
      {
        type: "p",
        content:
          "Through my TikTok (@nickkremers) and Facebook (@NicholasKremersSr), I reach survivors and caregivers nationwide — over 90,000 across the community. As Stroke Lyfe grows, I run community giveaways that put recovery products, adaptive equipment, program access, and books directly in the hands of survivors who need them. The more the community gives, the bigger the giveaways — recovery tools, book donations, product packages, program scholarships. If you're in the River Valley and you're a survivor or caregiver, follow along. The giveaways are real and they're built for people like you.",
      },
      {
        type: "h2",
        content: "How to Support Stroke Lyfe as an Arkansas Resident",
      },
      {
        type: "ul",
        items: [
          "Donate at strokelyfe.org/donate — tax-deductible at both federal and Arkansas state levels (EIN: 99-1313589)",
          "Apply for a scholarship if you're a stroke survivor who needs program access: strokelyfe.org/apply",
          "Share the mission — tell your church, your civic group, your doctor's office, or your employer about Stroke Lyfe",
          "Inquire about a speaking engagement — nick@strokelyfe.org",
          "Follow @nickkremers on TikTok and Facebook for giveaways, updates, and daily recovery content",
          "Ask your employer about corporate donation matching — your HR department can check if Stroke Lyfe (EIN: 99-1313589) qualifies",
        ],
      },
      {
        type: "h2",
        content: "Frequently Asked Questions",
      },
      {
        type: "h3",
        content: "Is Stroke Lyfe really based in Arkansas?",
      },
      {
        type: "p",
        content:
          "Yes. Stroke Lyfe Inc. is headquartered at 622 South River Rd., Lavaca, AR 72941 — in the River Valley, Sebastian County, Arkansas. Nick Kremers, the founder, lives and works in the River Valley. The organization is incorporated in Arkansas and registered as a federally recognized 501(c)(3) public charity (EIN: 99-1313589).",
      },
      {
        type: "h3",
        content: "Can Arkansas hospitals participate in the book donation program?",
      },
      {
        type: "p",
        content:
          "Yes. Arkansas hospitals, rehabilitation facilities, outpatient therapy clinics, and stroke support groups can participate in the Stroke Lyfe hospital book donation program. Contact nick@strokelyfe.org with your facility name, contact person, and estimated patient volume. We're prioritizing River Valley facilities first, then expanding statewide and nationally.",
      },
      {
        type: "h3",
        content: "Is Nick Kremers available for speaking engagements in Arkansas?",
      },
      {
        type: "p",
        content:
          "Yes. Nick is based in the River Valley and is available for in-person speaking engagements throughout western Arkansas and the River Valley area, with travel for appropriate events statewide and nationally. Engagements at hospitals, rehab facilities, survivor groups, and civic organizations are prioritized. Email nick@strokelyfe.org with your event details and audience. Speaking fees are negotiable and may be waived for nonprofits and survivor support organizations.",
      },
      {
        type: "h3",
        content: "How can local businesses support Stroke Lyfe?",
      },
      {
        type: "p",
        content:
          "River Valley businesses can support Stroke Lyfe in several ways: direct charitable donations (tax-deductible as a business expense or charitable contribution), employee donation matching programs, sponsoring a scholarship ($97/month per survivor), or partnering on community events and giveaways. For business partnership inquiries, email nick@strokelyfe.org. We're also happy to speak at corporate wellness events and business association meetings for organizations interested in the mission.",
      },
      {
        type: "cta",
        label: "Support a River Valley Nonprofit — Donate Now",
        href: "/donate",
        sub: "Tax-deductible in Arkansas and federally. EIN: 99-1313589. 87 cents on the dollar goes directly to programs.",
      },
    ],
  },
];

const SITE_URL_CLIENT = "https://strokelyfe.org";

function extractFaqs(sections: Section[]): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];
  let inFaq = false;
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    if (s.type === "h2" && s.content === "Frequently Asked Questions") { inFaq = true; continue; }
    if (inFaq && s.type === "h2") break;
    if (inFaq && s.type === "h3") {
      const next = sections[i + 1];
      if (next && next.type === "p") { faqs.push({ q: s.content, a: next.content }); i++; }
    }
  }
  return faqs;
}

function ScrollDonateBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("donate-bar-dismissed")) { setDismissed(true); return; }
    const onScroll = () => {
      if ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight > 0.75) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (dismissed || !visible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-foreground text-background border-t border-background/20 shadow-2xl">
      <div className="container mx-auto px-4 max-w-3xl py-3 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-background/90 flex-1 leading-snug">
          Recovery like Nick's should be possible for everyone. Help fund it.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Button asChild size="sm"><Link href="/donate">Donate now</Link></Button>
          <button
            onClick={() => { setDismissed(true); sessionStorage.setItem("donate-bar-dismissed", "1"); }}
            className="text-background/50 hover:text-background transition-colors p-1 rounded"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

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
  const [copied, setCopied] = useState(false);

  if (!post) return <NotFound />;

  const postUrl = `${SITE_URL_CLIENT}/blog/${post.slug}`;
  const faqs = extractFaqs(post.sections);
  const faqSchema: object[] = faqs.length > 0
    ? [{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(({ q, a }) => ({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": { "@type": "Answer", "text": a },
        })),
      }]
    : [];

  function handleCopy() {
    navigator.clipboard.writeText(postUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        publishedAt={post.publishedAt}
        author={post.author}
        extraSchemas={faqSchema}
      />
      <ScrollDonateBar />
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

            {/* Social sharing */}
            <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-3" data-testid="section-share">
              <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Share2 className="h-4 w-4 text-muted-foreground" /> Share:
              </span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}&via=strokelyfe`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs border border-border rounded-md px-3 py-1.5 hover:border-primary hover:text-primary transition-colors font-medium"
                data-testid="button-share-twitter"
              >
                X / Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs border border-border rounded-md px-3 py-1.5 hover:border-primary hover:text-primary transition-colors font-medium"
                data-testid="button-share-facebook"
              >
                Facebook
              </a>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs border border-border rounded-md px-3 py-1.5 hover:border-primary hover:text-primary transition-colors font-medium"
                data-testid="button-share-copy"
              >
                {copied
                  ? <><Check className="h-3.5 w-3.5 text-accent" /> Copied!</>
                  : <><Link2 className="h-3.5 w-3.5" /> Copy link</>
                }
              </button>
            </div>

            {/* Divider + More Posts */}
            <div className="mt-10 pt-10 border-t border-border">
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
