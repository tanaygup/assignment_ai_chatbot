import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  MessageSquare,
  Sparkles,
  User,
} from "lucide-react";
import { AnimatedGradient } from "@/components/animated-gradient";
import { FeatureCard } from "@/components/feature-card";
import { FloatingParticles } from "@/components/floating-particles";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
      <FloatingParticles />
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="relative">
              <FileText className="h-6 w-6 text-primary" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>
            <span>PDF Chat</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="hover:bg-primary/10 transition-colors"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="relative overflow-hidden group">
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <AnimatedGradient />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Powered by Gemini AI
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Chat with your{" "}
                  <span className="text-primary">PDF documents</span> using AI
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Upload your PDF documents and get instant answers to your
                  questions using the power of Gemini AI.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="gap-1 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 transition-all duration-300 shadow-lg hover:shadow-primary/20"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4 animate-bounce-x" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-primary/20 hover:bg-primary/5 transition-colors"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md overflow-hidden rounded-xl border bg-background/80 backdrop-blur-sm p-2 shadow-2xl transition-all hover:shadow-primary/10 duration-300">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-medium">research-paper.pdf</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                  </div>
                  <div className="space-y-4 p-4">
                    <div
                      className="flex gap-3 animate-fade-in"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <User className="h-8 w-8 rounded-full bg-gray-100 p-1" />
                      <div className="rounded-lg bg-gray-100 p-3 text-sm">
                        Can you summarize the key findings in this paper?
                      </div>
                    </div>
                    <div
                      className="flex gap-3 animate-fade-in"
                      style={{ animationDelay: "1s" }}
                    >
                      <MessageSquare className="h-8 w-8 rounded-full bg-primary/10 p-1 text-primary" />
                      <div className="rounded-lg bg-primary/10 p-3 text-sm">
                        <div className="typing-animation mb-2">
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </div>
                        The paper presents three key findings: 1) A novel
                        approach to natural language processing that improves
                        accuracy by 15%, 2) A more efficient algorithm that
                        reduces computational requirements by 30%, and 3)
                        Empirical evidence showing the method works across 12
                        different languages.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50/50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How It Works
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[600px] mx-auto">
                  Get answers from your documents in three simple steps
                </p>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 max-w-5xl mx-auto">
              <FeatureCard
                number={1}
                title="Upload PDF"
                description="Upload any PDF document you want to chat with"
                icon="upload"
              />
              <FeatureCard
                number={2}
                title="Ask Questions"
                description="Ask any question about the content of your document"
                icon="message-square"
              />
              <FeatureCard
                number={3}
                title="Get Answers"
                description="Receive accurate answers powered by Gemini AI"
                icon="sparkles"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Unlock the power of your documents
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stop wasting time searching through long documents. Our
                  AI-powered chat interface helps you find exactly what you need
                  in seconds.
                </p>
                <ul className="space-y-2">
                  {[
                    "Extract key information instantly",
                    "Ask follow-up questions for deeper understanding",
                    "Save time on research and document analysis",
                    "Access your document history anytime",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-indigo-500/20 opacity-50 blur-xl" />
                <div className="relative rounded-xl border bg-background p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Research Papers</h3>
                        <p className="text-sm text-gray-500">
                          Extract insights from academic papers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Legal Documents</h3>
                        <p className="text-sm text-gray-500">
                          Understand complex legal language
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Technical Manuals</h3>
                        <p className="text-sm text-gray-500">
                          Find specific instructions quickly
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 bg-background/80 backdrop-blur-sm">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-6">
          <p className="text-sm text-gray-500">
            © 2024 PDF Chat. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
