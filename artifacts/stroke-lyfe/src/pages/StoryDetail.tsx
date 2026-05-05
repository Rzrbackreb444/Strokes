import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useGetStory, useGetStories, getGetStoryQueryKey, getGetStoriesQueryKey } from "@workspace/api-client-react";

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: story, isLoading, isError } = useGetStory(slug!, {
    query: { enabled: !!slug, queryKey: getGetStoryQueryKey(slug!) },
  });
  const { data: allStories } = useGetStories(
    { limit: 6, offset: 0 },
    { query: { queryKey: getGetStoriesQueryKey({ limit: 6, offset: 0 }) } }
  );

  const related = allStories?.stories?.filter((s) => s.slug !== slug).slice(0, 3) ?? [];

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Skeleton className="h-6 w-24 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/4 mb-8" />
          <div className="space-y-4">
            {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !story) {
    return (
      <div className="py-20 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Story not found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find that story. It may have been moved or removed.</p>
          <Button asChild variant="outline">
            <Link href="/stories"><ArrowLeft className="mr-2 h-4 w-4" />Back to stories</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Back link */}
      <div className="bg-muted border-b border-border py-3">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/stories" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-back-stories">
            <ArrowLeft className="h-4 w-4" />
            All stories
          </Link>
        </div>
      </div>

      <article className="py-16" data-testid="section-story-detail">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {story.focusArea && <Badge variant="secondary" data-testid="badge-focus-area">{story.focusArea}</Badge>}
              {story.recoveryStage && <Badge variant="outline" data-testid="badge-recovery-stage">{story.recoveryStage}</Badge>}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3" data-testid="text-story-title">
              {story.title}
            </h1>
            <p className="text-muted-foreground" data-testid="text-story-handle">— {story.handle}</p>
          </div>

          {/* Pull quote */}
          <blockquote className="font-serif text-xl md:text-2xl text-foreground border-l-4 border-primary pl-6 py-2 mb-8 italic" data-testid="text-story-pullquote">
            "{story.pullQuote}"
          </blockquote>

          {/* Video player */}
          {story.videoUrl && (
            <div className="mb-8 rounded-lg overflow-hidden bg-black aspect-video" data-testid="section-story-video">
              <video
                src={story.videoUrl}
                controls
                poster={story.posterUrl ?? undefined}
                className="w-full h-full"
                aria-label={`Video testimony from ${story.handle}`}
              >
                Your browser does not support the video element.
              </video>
            </div>
          )}

          {/* Body text */}
          <div className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed space-y-4" data-testid="text-story-body">
            {story.body.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Mid-page donate CTA */}
          <div className="my-12 bg-muted rounded-lg p-6 text-center" data-testid="section-story-donate-cta">
            <p className="font-serif text-lg font-bold text-foreground mb-2">Stories like this happen because people like you give.</p>
            <p className="text-sm text-muted-foreground mb-4">A $97 scholarship funds one survivor's full first month. One donation. One life.</p>
            <Button asChild data-testid="button-story-donate">
              <Link href="/donate">Donate Now</Link>
            </Button>
          </div>
        </div>
      </article>

      {/* Related stories */}
      {related.length > 0 && (
        <section className="py-12 bg-muted border-t border-border" data-testid="section-related-stories">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">More stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((s) => (
                <Link key={s.id} href={`/stories/${s.slug}`} data-testid={`card-related-story-${s.id}`}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <div className="h-36 bg-accent/20 flex items-end p-3">
                      {s.focusArea && <Badge variant="secondary" className="text-xs">{s.focusArea}</Badge>}
                    </div>
                    <CardContent className="p-4">
                      <blockquote className="font-serif text-sm text-foreground leading-snug mb-2">"{s.pullQuote}"</blockquote>
                      <p className="text-xs text-muted-foreground">— {s.handle}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Submit CTA */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <p className="text-muted-foreground mb-3 text-sm">Have a story of your own?</p>
          <Link
            href="/submit-story"
            className="inline-flex items-center justify-center text-sm font-medium text-primary hover:underline"
            data-testid="button-submit-your-story"
          >
            Submit your story →
          </Link>
        </div>
      </section>
    </div>
  );
}
