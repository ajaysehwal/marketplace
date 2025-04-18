"use client";
import { DiscoverApis } from "@/components/apis/DiscoverApis";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Code,
  LineChart,
  ShieldCheck,
  MessageSquare,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/ui/section";
export default function Home() {
  return (
    <>
      <Section
        className="relative overflow-hidden py-24 md:py-32"
        title="API Marketplace"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 z-0">
          <div className="bg-grid-pattern absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-[0.03]" />
          <div className="absolute right-0 bottom-0 -z-10 translate-x-1/4 translate-y-1/4 transform">
            <div className="bg-primary/20 h-96 w-96 rounded-full opacity-30 blur-3xl filter" />
          </div>
          <div className="absolute top-0 left-0 -z-10 -translate-x-1/3 -translate-y-1/3 transform">
            <div className="bg-primary/20 h-96 w-96 rounded-full opacity-20 blur-3xl filter" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="flex flex-col items-center md:flex-row">
            <motion.div
              className="mb-10 md:mb-0 md:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="border-primary/30 mb-4 rounded-full px-4 py-1 text-sm"
              >
                The Future of API Integration
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                Build Faster with{" "}
                <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
                  Powerful APIs
                </span>
              </h1>
              <p className="text-muted-foreground mb-8 max-w-lg text-xl leading-relaxed">
                Access thousands of APIs and digital services in one platform.
                Connect, integrate, and scale your applications with ease.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="gap-2 px-6" asChild>
                  <Link href="/hub">
                    Start Exploring <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <Link href="/signup">Create Free Account</Link>
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className="bg-muted border-background flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold"
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">
                  Trusted by{" "}
                  <span className="text-foreground font-medium">2,000+</span>{" "}
                  developers & companies
                </p>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 md:pl-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="from-primary/20 absolute inset-0 rotate-6 transform-gpu rounded-lg bg-gradient-to-tr to-transparent opacity-40 blur-xl"></div>
                <div className="bg-card border-border/40 relative overflow-hidden rounded-xl border shadow-xl">
                  <div className="border-border/40 bg-muted/30 flex items-center justify-between border-b p-4">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="bg-muted rounded-full px-3 py-1 font-mono text-xs">
                      api.hub/weather-data
                    </div>
                    <div></div>
                  </div>
                  <div className="p-6">
                    <pre className="text-muted-foreground overflow-x-auto font-mono text-sm">
                      {`// Example API request
fetch('https://api.hub/v1/weather?city=london')
.then(response => response.json())
.then(data => {
  console.log(data);
  // {
  //   "temp": 18.5,
  //   "condition": "Partly Cloudy",
  //   "humidity": 65,
  //   "wind_speed": 12,
  //   "forecast": [...]
  // }
});`}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <div className="border-border/30 bg-muted/30 border-y">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-12">
            {[
              { label: "APIs Available", value: "2,500+" },
              { label: "Developers", value: "50,000+" },
              { label: "Monthly Requests", value: "1.2B+" },
              { label: "Uptime SLA", value: "99.99%" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <p className="text-primary text-3xl font-bold md:text-4xl">
                  {stat.value}
                </p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Section className="bg-muted/10 py-20" title="Features">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="border-primary/30 mb-4 rounded-full px-4 py-1 text-sm"
            >
              Built for Developers
            </Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
              Our platform offers a complete suite of tools to discover,
              integrate, and manage APIs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <Globe className="text-primary h-6 w-6" />,
                title: "Discover APIs",
                description:
                  "Find the perfect APIs with our comprehensive marketplace and intelligent search.",
              },
              {
                icon: <Code className="text-primary h-6 w-6" />,
                title: "Quick Integration",
                description:
                  "Get your API integrations up and running in minutes with interactive documentation.",
              },
              {
                icon: <LineChart className="text-primary h-6 w-6" />,
                title: "Analytics Dashboard",
                description:
                  "Monitor API performance and usage metrics with our detailed analytics.",
              },
              {
                icon: <ShieldCheck className="text-primary h-6 w-6" />,
                title: "Security & Compliance",
                description:
                  "Enterprise-grade security with OAuth, API keys, and data encryption.",
              },
              {
                icon: <MessageSquare className="text-primary h-6 w-6" />,
                title: "Developer Community",
                description:
                  "Connect with other developers and API providers in our growing community.",
              },
              {
                icon: <Zap className="text-primary h-6 w-6" />,
                title: "High Performance",
                description:
                  "Low-latency infrastructure with global edge caching ensures fastest response times.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card hover:bg-card/80 border-border/50 rounded-lg border p-6 transition-all duration-300 hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <DiscoverApis />

      <Section
        className="from-primary to-primary/80 text-primary-foreground bg-gradient-to-br py-24"
        title="Call to Action"
      >
        <div className="relative container mx-auto px-4 text-center">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          </div>

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-white/30 px-4 py-1 text-sm text-white"
            >
              Start Building Today
            </Badge>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              Ready to Transform Your Application?
            </h2>
            <p className="text-primary-foreground/90 mx-auto mb-10 max-w-2xl text-xl">
              Join thousands of developers and businesses already building the
              future with our API marketplace.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="px-6 font-medium"
                asChild
              >
                <Link href="/signup">Create Free Account</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent font-medium hover:bg-white/10"
                asChild
              >
                <Link href="/search">Browse API Catalog</Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
              {["Stripe", "Google", "Amazon", "Microsoft"].map((partner, i) => (
                <div key={i} className="flex justify-center">
                  <div className="text-primary-foreground/80 text-lg font-semibold">
                    {partner}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
