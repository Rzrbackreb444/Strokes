import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStories, getGetStoriesQueryKey } from "@workspace/api-client-react";
import SEO from "@/components/SEO";

const FOCUS_AREAS = ["All", "Speech", "Mobility", "Cognition", "Caregiver"];

const placeholderStories = [
  { id: 1, slug: "maria-s", pullQuote: "I got my voice back. It wasn't instant, but I got it back.", handle: "Maria S.", focusArea: "Speech", posterUrl: "/stories/maria-s.png" },
  { id: 2, slug: "devon-t", pullQuote: "Day 1 to day 200 — same survivor, completely different life.", handle: "Devon T.", focusArea: "Mobility", posterUrl: "/stories/devon-t.png" },
  { id: 3, slug: "aisha-r", pullQuote: "The people here saw me as me, not my MRI.", handle: "Aisha R.", focusArea: "Caregiver", posterUrl: "/stories/aisha-r.png" },
  { id: 4, slug: "james-w", pullQuote: "I had to relearn my son's name. I'm not ashamed of that anymore.", handle: "James W.", focusArea: "Cognition", posterUrl: "/stories/james-w.png" },
  { id: 5, slug: "linda-p", pullQuote: "The hardest part wasn't the stroke. It was the silence afterward.", handle: "Linda P.", focusArea: "Speech", posterUrl: "/stories/linda-p.png" },
  { id: 6, slug: "marcus-e", pullQuote: "Nobody told me this was going to be a years-long process. Now I help others understand that.", handle: "Marcus E.", focusArea: "Mobility", posterUrl: "/stories/marcus-e.png" },
];

export default function Stories() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { data, isLoading } = useGetStories(
    { limit: 50, offset: 0 },
    { query: { queryKey: getGetStoriesQueryKey({ limit: 50, offset: 0 }) } }
  );

  const stories = (data?.stories && data.stories.length > 0) ? data.stories : placeholderStories;
  const filtered = activeFilter === "All"
    ? stories
    : stories.filter((s) => s.focusArea === activeFilter);

  return (
    <div>
      <SEO
        title="Survivor Stories — Real Stroke Recovery Journeys"
        description="Read honest accounts from stroke survivors who rebuilt their lives. Specific, real, and full of the detail that actually helps — because they've been through it."
        path="/stories"
      />
      {/* HERO */}
      <section className="py-20 bg-foreground text-background" data-testid="section-stories-hero">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">Survivor Stories</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">In their own words.</h1>
          <p className="mt-4 text-background/70 max-w-xl text-lg leading-relaxed">
            Real stories from real survivors. No editing. No polish. Just what recovery actually looks like.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" data-testid="section-stories-list">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter stories by focus area">
            {FOCUS_AREAS.map((area) => (
              <button
                key={area}
                onClick={() => setActiveFilter(area)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  activeFilter === area
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
                data-testid={`filter-${area.toLowerCase()}`}
              >
                {area}
              </button>
            ))}
          </div>

          {/* Stories grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i}>
                  <Skeleton className="h-48 rounded-t-lg rounded-b-none" />
                  <CardContent className="p-5">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No stories in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((story) => (
                <Link key={story.id} href={`/stories/${story.slug}`} data-testid={`card-story-${story.id}`}>
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow cursor-pointer">
                    <div
                      className="h-48 bg-accent/20 flex items-end p-4"
                      style={story.posterUrl ? { backgroundImage: `url(${story.posterUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
                    >
                      {story.focusArea && (
                        <Badge variant="secondary" className="text-xs">{story.focusArea}</Badge>
                      )}
                    </div>
                    <CardContent className="p-5 flex flex-col h-[calc(100%-12rem)]">
                      <blockquote className="font-serif text-base text-foreground leading-snug mb-3 flex-1">
                        "{story.pullQuote}"
                      </blockquote>
                      <p className="text-sm text-muted-foreground">— {story.handle}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Submit CTA */}
          <div className="mt-16 text-center bg-muted rounded-lg p-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Have a story to share?</h2>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto text-sm">
              Your recovery story might be the thing that gets someone else through tomorrow. We'd love to share it.
            </p>
            <Link
              href="/submit-story"
              className="inline-flex items-center justify-center rounded-md bg-primary text-white text-sm font-medium px-6 py-2.5 hover:bg-primary/90 transition-colors"
              data-testid="button-submit-story"
            >
              Submit your story →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
