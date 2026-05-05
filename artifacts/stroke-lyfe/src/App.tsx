import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import Donate from "@/pages/Donate";
import Gift from "@/pages/Gift";
import Stories from "@/pages/Stories";
import StoryDetail from "@/pages/StoryDetail";
import Contact from "@/pages/Contact";
import Transparency from "@/pages/Transparency";
import ThankYou from "@/pages/ThankYou";
import Privacy from "@/pages/legal/Privacy";
import Terms from "@/pages/legal/Terms";
import DonorRights from "@/pages/legal/DonorRights";
import Admin from "@/pages/Admin";
import SubmitStory from "@/pages/SubmitStory";
import FAQ from "@/pages/FAQ";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/programs" component={Programs} />
      <Route path="/donate" component={Donate} />
      <Route path="/gift" component={Gift} />
      <Route path="/stories" component={Stories} />
      <Route path="/stories/:slug" component={StoryDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/transparency" component={Transparency} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/legal/privacy" component={Privacy} />
      <Route path="/legal/terms" component={Terms} />
      <Route path="/legal/donor-rights" component={DonorRights} />
      <Route path="/admin" component={Admin} />
      <Route path="/submit-story" component={SubmitStory} />
      <Route path="/faq" component={FAQ} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
