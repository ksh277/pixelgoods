import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Cart from "@/pages/Cart";
import Community from "@/pages/Community";
import Editor from "@/pages/Editor";
import Inquiry from "@/pages/Inquiry";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/cart" component={Cart} />
      <Route path="/community" component={Community} />
      <Route path="/editor" component={Editor} />
      <Route path="/inquiry" component={Inquiry} />
      
      {/* Category and section routes */}
      <Route path="/popular" component={Products} />
      <Route path="/new" component={Products} />
      <Route path="/reviews" component={Community} />
      <Route path="/showcase" component={Community} />
      <Route path="/material" component={Products} />
      <Route path="/trending" component={Products} />
      <Route path="/picks" component={Products} />
      <Route path="/brand" component={Products} />
      <Route path="/benefits" component={Products} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
