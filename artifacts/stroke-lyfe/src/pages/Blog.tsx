import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const posts = [
  {
    slug: "too-recovered",
    title: "The 'Too Recovered' Problem Nobody Talks About",
    excerpt: "Nick was still in a wheelchair when insurance said he was done. Here's the story of what happened after — and why 'too recovered' is the most dangerous phrase in stroke rehabilitation.",
    tag: "Recovery",
    date: "Coming soon",
  },
  {
    slug: "years-4-7",
    title: "Why Years 4–7 Were Nick's Biggest Wins",
    excerpt: "Everyone focuses on the first year post-stroke. But the breakthroughs that changed Nick's life most came years later. This is what neuroplasticity actually looks like over time.",
    tag: "Founder's Story",
    date: "Coming soon",
  },
  {
    slug: "caregiver-grief",
    title: "Caregiver Grief: What It Is and Why It's Valid",
    excerpt: "The person you love is still here, but changed. That grief doesn't have a name in most medical literature. We're naming it here — and giving it the space it deserves.",
    tag: "Caregivers",
    date: "Coming soon",
  },
  {
    slug: "drop-foot",
    title: "Rebuilding Drop Foot: What Nick's Recovery Actually Looked Like",
    excerpt: "Drop foot is one of the most frustrating post-stroke challenges. Nick rebuilt his gait function years after his stroke. This is the honest account of how.",
    tag: "Recovery",
    date: "Coming soon",
  },
];

export default function Blog() {
  return (
    <div>
      <section className="py-20 bg-foreground text-background" data-testid="section-blog-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Blog</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Honest writing about stroke recovery.</h1>
          <p className="mt-4 text-background/70 max-w-xl text-lg leading-relaxed">
            No corporate wellness fluff. No "stay positive" platitudes. Real writing about what recovery actually looks like — written by someone who's been through it.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" data-testid="section-blog-list">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-10 text-sm text-foreground/70">
            <strong className="text-foreground">Blog launching soon.</strong> Posts are being written now. Subscribe to our newsletter on the <Link href="/contact" className="text-primary hover:underline">Contact page</Link> to be notified when we publish.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card key={post.slug} className="opacity-60 cursor-default">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{post.tag}</Badge>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-2 leading-snug">{post.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Have something to say?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
              We accept guest posts from survivors, caregivers, and clinicians. Your perspective matters.
            </p>
            <Button asChild data-testid="button-blog-contact">
              <Link href="/contact">Pitch a post</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
