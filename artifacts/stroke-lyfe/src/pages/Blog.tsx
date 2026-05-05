import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import SEO from "@/components/SEO";
import { BLOG_POSTS } from "@/pages/BlogPost";

export default function Blog() {
  return (
    <>
      <SEO
        title="Blog — Stroke Recovery Insights"
        description="Honest writing about stroke recovery, neuroplasticity, caregiver support, and the mission behind Stroke Lyfe. Written by survivor and founder Nick Kremers."
        path="/blog"
        extraSchemas={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Stroke Lyfe Blog",
            "description": "Honest writing about stroke recovery by survivor Nick Kremers",
            "url": "https://strokelyfe.org/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Stroke Lyfe",
              "url": "https://strokelyfe.org",
            },
          },
        ]}
      />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOG_POSTS.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <Card className="h-full transition-all group-hover:border-primary/40 group-hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">{post.tag}</Badge>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />{post.readTime}
                        </span>
                      </div>
                      <h2 className="font-serif text-xl font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.description}</p>
                      <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium">
                        Read more <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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
    </>
  );
}
