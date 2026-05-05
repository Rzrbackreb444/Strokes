import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  useAdminGetStories,
  useAdminUpdateStory,
  useAdminGetStats,
  useAdminUpdateStats,
  getAdminGetStoriesQueryKey,
  getAdminGetStatsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

function useAdminToken() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
}

export default function Admin() {
  const token = useAdminToken();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [statsForm, setStatsForm] = useState({ survivorsServed: "", scholarshipsFunded: "" });

  const storiesParams = { token: token ?? "", limit: 100, offset: 0 };
  const statsParams = { token: token ?? "" };

  const storiesQuery = useAdminGetStories(
    storiesParams,
    { query: { enabled: !!token, queryKey: getAdminGetStoriesQueryKey(storiesParams) } }
  );
  const statsQuery = useAdminGetStats(
    statsParams,
    { query: { enabled: !!token, queryKey: getAdminGetStatsQueryKey(statsParams) } }
  );

  const updateStory = useAdminUpdateStory({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getAdminGetStoriesQueryKey(storiesParams) });
        toast({ title: "Story updated" });
      },
    },
  });

  const updateStats = useAdminUpdateStats({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getAdminGetStatsQueryKey(statsParams) });
        toast({ title: "Stats updated" });
        setStatsForm({ survivorsServed: "", scholarshipsFunded: "" });
      },
    },
  });

  if (!token) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center" data-testid="section-admin-denied">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Access denied</h1>
          <p className="text-muted-foreground">Provide a valid token via ?token= query parameter.</p>
        </div>
      </div>
    );
  }

  function handleStatsSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body: { survivorsServed?: number; scholarshipsFunded?: number } = {};
    if (statsForm.survivorsServed) body.survivorsServed = Number(statsForm.survivorsServed);
    if (statsForm.scholarshipsFunded) body.scholarshipsFunded = Number(statsForm.scholarshipsFunded);
    updateStats.mutate({ data: body as { survivorsServed: number; scholarshipsFunded: number }, params: { token: token! } });
  }

  return (
    <div className="py-10" data-testid="section-admin-panel">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="font-serif text-3xl font-bold text-foreground mb-8">Admin Panel</h1>

        {/* Stats editor */}
        <Card className="mb-8" data-testid="card-admin-stats">
          <CardContent className="p-6">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4">Site Stats</h2>
            {statsQuery.isLoading ? (
              <div className="space-y-2"><Skeleton className="h-4 w-40" /><Skeleton className="h-4 w-32" /></div>
            ) : (
              <div className="flex gap-6 mb-4 text-sm">
                <span>Survivors served: <strong>{statsQuery.data?.survivorsServed ?? "—"}</strong></span>
                <span>Scholarships funded: <strong>{statsQuery.data?.scholarshipsFunded ?? "—"}</strong></span>
              </div>
            )}
            <form onSubmit={handleStatsSubmit} className="flex flex-wrap gap-3 items-end">
              <div>
                <Label htmlFor="survivorsServed" className="text-xs">Survivors served</Label>
                <Input
                  id="survivorsServed"
                  type="number"
                  placeholder="e.g. 1247"
                  value={statsForm.survivorsServed}
                  onChange={(e) => setStatsForm((p) => ({ ...p, survivorsServed: e.target.value }))}
                  className="mt-1 w-36"
                  data-testid="input-stats-survivors"
                />
              </div>
              <div>
                <Label htmlFor="scholarshipsFunded" className="text-xs">Scholarships funded</Label>
                <Input
                  id="scholarshipsFunded"
                  type="number"
                  placeholder="e.g. 312"
                  value={statsForm.scholarshipsFunded}
                  onChange={(e) => setStatsForm((p) => ({ ...p, scholarshipsFunded: e.target.value }))}
                  className="mt-1 w-36"
                  data-testid="input-stats-scholarships"
                />
              </div>
              <Button type="submit" size="sm" disabled={updateStats.isPending} data-testid="button-save-stats">
                Save stats
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Stories list */}
        <Card data-testid="card-admin-stories">
          <CardContent className="p-6">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4">Stories</h2>
            {storiesQuery.isLoading ? (
              <div className="space-y-3">
                {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : storiesQuery.data?.length === 0 ? (
              <p className="text-muted-foreground text-sm">No stories submitted yet.</p>
            ) : (
              <div className="space-y-3">
                {storiesQuery.data?.map((story) => (
                  <div
                    key={story.id}
                    className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-md border border-border bg-background"
                    data-testid={`row-story-${story.id}`}
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{story.title}</p>
                      <p className="text-xs text-muted-foreground">{story.handle}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 flex-wrap">
                      {story.focusArea && <Badge variant="outline" className="text-xs">{story.focusArea}</Badge>}
                      <Badge
                        variant={story.isApproved ? "default" : "secondary"}
                        className="text-xs"
                        data-testid={`badge-status-${story.id}`}
                      >
                        {story.isApproved ? "approved" : "pending"}
                      </Badge>
                      <div className="flex items-center gap-1.5">
                        <Label htmlFor={`approved-${story.id}`} className="text-xs text-muted-foreground">Approved</Label>
                        <Switch
                          id={`approved-${story.id}`}
                          checked={story.isApproved}
                          onCheckedChange={(v) =>
                            updateStory.mutate({ id: story.id, data: { isApproved: v }, params: { token: token! } })
                          }
                          data-testid={`switch-approved-${story.id}`}
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Label htmlFor={`featured-${story.id}`} className="text-xs text-muted-foreground">Featured</Label>
                        <Switch
                          id={`featured-${story.id}`}
                          checked={story.isFeatured}
                          onCheckedChange={(v) =>
                            updateStory.mutate({ id: story.id, data: { isFeatured: v }, params: { token: token! } })
                          }
                          data-testid={`switch-featured-${story.id}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
