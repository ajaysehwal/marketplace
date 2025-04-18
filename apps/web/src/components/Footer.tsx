
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Linkedin, Send } from "lucide-react";
import { ThemeSelector } from "@/components/theme/ThemeSelector";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "API Directory", href: "/apis" },
        { name: "Enterprise", href: "/enterprise" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "API Status", href: "/status" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Press", href: "/press" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Security", href: "/security" },
      ],
    },
  ];
  
  return (
    <footer className="border-t border-border mt-16 pt-12 pb-8 bg-muted/20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="font-bold text-xl">API<span className="text-primary">Hub</span></span>
            </Link>
            
            <p className="mt-4 text-muted-foreground">
              The ultimate API marketplace for developers.
              Discover, test and connect with thousands of APIs.
            </p>
            
            <div className="flex items-center gap-4 mt-6">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h3 className="font-medium mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                        href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-border grid sm:grid-cols-2 gap-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} APIHub. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <ThemeSelector />
            </div>
          </div>
          
          <div className="flex flex-col sm:items-end gap-4">
            <div className="flex max-w-sm gap-2">
              <Input placeholder="Subscribe to our newsletter" className="max-w-xs" />
              <Button size="icon">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
