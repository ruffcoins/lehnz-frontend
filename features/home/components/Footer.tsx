"use client";

import React from "react";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Explore Guides", href: "/guides/list" },
    { label: "Categories", href: "#" },
    { label: "For Writers", href: "/create" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Guidelines", href: "#guidelines" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-border bg-background border-t">
      <div className="container mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-foreground mb-4 text-sm font-semibold">{category}</h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-muted-foreground text-sm">
                © 2025 Pure Engineering. All rights reserved.
              </p>
              <p className="text-muted-foreground mt-1 text-xs">Where best practices are built.</p>
            </div>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
