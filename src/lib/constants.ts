import type { NavLink, Stat, Step } from "./types";

export const SITE_CONFIG = {
  name: "ForgeLabs",
  tagline: "Blood Testing for People Who Push Harder",
  description:
    "Advanced blood testing and biomarker analysis for athletes, fitness enthusiasts, and anyone optimising their health.",
  url: "https://www.forgelabs.co.uk",
  appUrl: "https://app.forgelabs.co.uk",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Tests", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];

export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    number: 1,
    title: "Choose Your Test",
    description:
      "Browse our range of blood test panels designed for active people. Pick the one that matches your goals.",
    icon: "search",
  },
  {
    number: 2,
    title: "Test at Home",
    description:
      "We send you an easy-to-use kit. Collect your sample in minutes and post it back — free of charge.",
    icon: "droplets",
  },
  {
    number: 3,
    title: "Get Your Results",
    description:
      "Within 3–5 days, your personalised results and insights appear on your dashboard, powered by AI analysis.",
    icon: "bar-chart-3",
  },
];

export const STATS: Stat[] = [
  { value: "75", suffix: "+", label: "Biomarkers Tested" },
  { value: "3-5", label: "Day Turnaround" },
  { value: "10k", suffix: "+", label: "Tests Completed" },
  { value: "99.9", suffix: "%", label: "Lab Accuracy" },
];

export const FOOTER_LINKS = {
  product: [
    { label: "All Tests", href: "/products" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Blog", href: "/blog" },
    { label: "My Dashboard", href: "https://app.forgelabs.co.uk/sign-in" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Our Science", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  support: [
    { label: "Help Centre", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
} as const;
