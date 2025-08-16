"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import {
    Box,
    Briefcase,
    ChevronRight,
    Code,
    Cpu,
    Database,
    Download,
    ExternalLink,
    Github,
    Layers,
    Linkedin,
    Mail,
    Phone,
    Rocket,
    Star,
    Wrench,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

/**
 * Mahdi Hussain — Modern Portfolio Single-File React Page
 * Designed to drop into a Next.js (App Router) project as app/page.tsx
 * TailwindCSS + Framer Motion. TypeScript-ready (no TS-specific syntax here).
 *
 * How to use in Next.js:
 * 1) Ensure Tailwind is installed and configured.
 * 2) Replace placeholders (links, images, resume path).
 * 3) Save as app/page.tsx (or any route). Works as-is in CSR, SSR-safe.
 */

const TAGS = [
    "Next.js",
    "TypeScript",
    "React",
    "Redux / RTK Query",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "Framer Motion",
    "JWT/Auth",
    "REST APIs",
];

const SKILLS: { name: string; level: number }[] = [
    { name: "HTML / CSS", level: 95 },
    { name: "JavaScript (ESNext)", level: 92 },
    { name: "TypeScript", level: 85 },
    { name: "React", level: 92 },
    { name: "Next.js", level: 88 },
    { name: "Redux / RTK Query", level: 90 },
    { name: "Node.js", level: 86 },
    { name: "Express", level: 84 },
    { name: "MongoDB", level: 88 },
    { name: "Tailwind CSS", level: 95 },
];

const PROJECTS: {
    title: string;
    description: string;
    bullets: string[];
    tech: string[];
    href?: string;
    repo?: string;
}[] = [
    {
        title: "Clothing Brand API (MERN)",
        description:
            "Production-ready Node.js + MongoDB REST API for a clothing brand: items, categories, attributes, variations, and secure user auth.",
        bullets: [
            "RTK Query examples + React Admin UI ready",
            "Token persistence with Redux (no page reload)",
            "Clean controllers, services, and validators",
        ],
        tech: ["Node.js", "Express", "MongoDB", "JWT", "RTK Query"],
        repo: "#", // TODO: add repository link
    },
    {
        title: "E‑commerce Cart & Checkout (React + RTKQ)",
        description:
            "Global cart state with Redux + RTK Query. Each cart item shows image, size, category, quantity controls, subtotal, and remove.",
        bullets: [
            "Custom hooks for optimistic updates",
            "React Image Zoom for product preview",
            "Toast system for success/alert/promise states",
        ],
        tech: ["React", "Redux", "RTK Query", "Toastify", "Tailwind"],
        href: "#", // TODO: add live link
    },
    {
        title: "About Page CMS (Next.js)",
        description:
            "Editable mission/vision with image upload via a custom Drag-n-Drop component. Built for marketing teams to ship faster.",
        bullets: [
            "Zod + react-hook-form with typed schema",
            "Field-level validation and Redux integration",
            "Optimized image handling & preview",
        ],
        tech: ["Next.js", "TypeScript", "Zod", "react-hook-form", "Redux"],
    },
    {
        title: "Chat Feature (Real-time UX)",
        description:
            "Conversation list + message threads fetched via /chat/converstion?userId=... endpoint, ready for WS/long-polling.",
        bullets: [
            "Message virtualization for performance",
            "Typing indicators + read receipts (ready)",
            "Clean API layer + caching",
        ],
        tech: ["React", "Redux", "RTK Query", "Node.js"],
    },
    {
        title: "Nikah Service Website Components",
        description:
            "Modern components: FAQs with smooth accordion transitions, footer, contact forms, and hero sections.",
        bullets: [
            "Accessible disclosure widgets",
            "Gradient cards with hover elevation",
            "Email/phone deep links + validation",
        ],
        tech: ["React", "Next.js", "Tailwind", "Framer Motion"],
    },
];

const CONTACT = {
    email: "mailto:your.email@example.com", // TODO: replace with your email
    phone: "tel:+8801700940689", // TODO: replace with your number
    github: "https://github.com/MahdiHDev", // TODO: replace with your GitHub
    linkedin: "https://www.linkedin.com/in/mahdi-hussain-dev/", // TODO: replace with your LinkedIn
    resume: "/Mahdi_Hussain_Resume.pdf", // TODO: place your resume file in public/
};

const Section: React.FC<
    React.PropsWithChildren<{ id?: string; className?: string }>
> = ({ id, className, children }) => (
    <section
        id={id}
        className={`relative w-full max-w-6xl mx-auto px-4 md:px-8 ${
            className || ""
        }`}
    >
        {children}
    </section>
);

const Chip: React.FC<React.PropsWithChildren> = ({ children }) => (
    <span className="text-xs md:text-sm px-3 py-1 rounded-full border border-black/10 dark:border-white/10 backdrop-blur bg-white/50 dark:bg-white/5">
        {children}
    </span>
);

const GlassCard: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
    className,
    children,
}) => (
    <div
        className={`group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] ${
            className || ""
        }`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/10" />
        <div className="relative z-10 p-6 md:p-8">{children}</div>
    </div>
);

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
    <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
        <div
            className="h-full rounded-full bg-black/70 dark:bg-white/80"
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
    </div>
);

const useTheme = () => {
    const [dark, setDark] = useState(true);
    useEffect(() => {
        const root = document.documentElement;
        if (dark) root.classList.add("dark");
        else root.classList.remove("dark");
    }, [dark]);
    return { dark, setDark };
};

const AnimatedGradient = () => (
    <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Soft radial glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.18),transparent_60%)] blur-2xl" />
        <div className="absolute top-1/3 -left-20 w-[60vw] h-[60vw] max-w-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.2),transparent_60%)] blur-2xl" />
        <div className="absolute bottom-0 right-0 w-[70vw] h-[70vw] max-w-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(253,186,116,0.18),transparent_60%)] blur-2xl" />
    </div>
);

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    return (
        <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-indigo-500 via-sky-400 to-amber-400 z-50"
        />
    );
};

const Nav = () => {
    const links = [
        { href: "#about", label: "About" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" },
    ];
    return (
        <div className="sticky top-3 z-40 w-full">
            <nav className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="flex items-center justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl px-4 md:px-6 py-3 shadow-lg">
                    <a
                        href="#"
                        className="flex items-center gap-2 font-semibold tracking-tight"
                    >
                        <Box className="w-5 h-5" />
                        <span>Mahdi Hussain</span>
                    </a>
                    <div className="hidden md:flex items-center gap-2">
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="px-3 py-2 rounded-xl text-sm hover:bg-black/5 dark:hover:bg-white/10"
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href={CONTACT.github}
                            aria-label="GitHub"
                            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href={CONTACT.linkedin}
                            aria-label="LinkedIn"
                            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
};

// const CONTACT = {
//     resume: "/files/Mahdi_Hussain_CV.pdf",
//     email: "mailto:mahdi@example.com",
// };
// const TAGS = ["React", "Next.js", "Node.js", "MongoDB", "Redux", "RTK Query"];

// // Simple Chip Component
// const Chip = ({ children }: { children: React.ReactNode }) => (
//     <span className="px-3 py-1 text-sm rounded-full bg-white/10 dark:bg-black/10 text-white/80 hover:scale-105 transition">
//         {children}
//     </span>
// );

// // Simple GlassCard Wrapper
// const GlassCard = ({ children }: { children: React.ReactNode }) => (
//     <div className="rounded-2xl bg-white/10 dark:bg-black/20 p-6 shadow-lg backdrop-blur-md border border-white/10">
//         {children}
//     </div>
// );

function Hero() {
    return (
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-16 text-white container mx-auto py-12 md:py-20">
            {/* Profile Image with Glow */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative flex-shrink-0"
            >
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                    <Image
                        src="/images/mahdi.jpg"
                        alt="Mahdi Hussain"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 rounded-full p-[4px] animate-spin-slow bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 -z-10 blur-lg"></div>
            </motion.div>

            {/* Intro + Actions */}
            <div className="flex-1 text-center md:text-left space-y-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-extrabold leading-tight"
                >
                    Hi, I’m <span className="text-sky-400">Mahdi Hussain</span>{" "}
                    <br />I build{" "}
                    <span className="bg-gradient-to-r from-indigo-500 via-sky-400 to-amber-400 bg-clip-text text-transparent">
                        MERN Stack
                    </span>{" "}
                    apps 🚀
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto md:mx-0"
                >
                    A passionate{" "}
                    <span className="font-semibold">MERN Stack Developer</span>{" "}
                    focused on modern UX, resilient APIs, and clean, scalable
                    state management with{" "}
                    <span className="text-sky-400">Redux & RTK Query</span>.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center md:justify-start gap-4"
                >
                    <a
                        href={CONTACT.resume}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition"
                    >
                        <Download className="w-4 h-4" /> Download CV
                    </a>
                    <a
                        href={CONTACT.email}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-400/30 hover:bg-white/10 font-medium transition"
                    >
                        <Mail className="w-4 h-4" /> Email Me
                    </a>
                    <a
                        href="#projects"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl hover:translate-x-1 transition"
                    >
                        View Projects <ChevronRight className="w-4 h-4" />
                    </a>
                </motion.div>

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap gap-3 justify-center md:justify-start mt-6"
                >
                    {TAGS.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-gray-200"
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* Stats Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 bg-white/5 backdrop-blur-md rounded-2xl p-4 md:p-6 grid grid-cols-3 gap-6 text-center shadow-xl w-full max-w-3xl"
                >
                    <div>
                        <p className="text-2xl md:text-3xl font-bold">5+</p>
                        <p className="text-xs text-gray-400 uppercase">
                            Years Coding
                        </p>
                    </div>
                    <div>
                        <p className="text-2xl md:text-3xl font-bold">10+</p>
                        <p className="text-xs text-gray-400 uppercase">
                            Major Modules
                        </p>
                    </div>
                    <div>
                        <p className="text-2xl md:text-3xl font-bold">∞</p>
                        <p className="text-xs text-gray-400 uppercase">
                            Curiosity
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

const About = () => (
    <Section id="about" className="pt-10 md:pt-20">
        <div className="grid md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    About
                </h2>
                <p className="mt-3 text-black/70 dark:text-white/70">
                    I specialize in <strong>Next.js</strong> (TypeScript)
                    front‑ends and <strong>Node.js/Express</strong> back‑ends
                    with <strong>MongoDB</strong>. I care about DX,
                    accessibility, and performance — from
                    <em>animated, responsive UIs</em> to{" "}
                    <em>secure, well‑documented APIs</em>.
                </p>
                <ul className="mt-4 space-y-2 text-sm md:text-base">
                    <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 mt-1" /> Reusable Toast system
                        (success/alert/promise) controllable from outside
                        components.
                    </li>
                    <li className="flex items-start gap-2">
                        <Wrench className="w-4 h-4 mt-1" /> Global cart with
                        quantity controls, subtotals, and clean remove flows.
                    </li>
                    <li className="flex items-start gap-2">
                        <Cpu className="w-4 h-4 mt-1" /> Form stacks with
                        react-hook-form + Zod, integrated into Redux slices.
                    </li>
                    <li className="flex items-start gap-2">
                        <Database className="w-4 h-4 mt-1" /> Token persistence
                        in Redux for seamless auth UX (no reloads).
                    </li>
                </ul>
            </div>
            <div className="md:col-span-5 space-y-4">
                <GlassCard>
                    <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5" />
                        <p className="font-medium">What I’m looking for</p>
                    </div>
                    <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                        MERN/Next.js roles where I can own features end‑to‑end:
                        API design, typed forms, and delightful UI polish.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {"\n"}{" "}
                        {[
                            "Full‑time",
                            "Contract",
                            "Remote",
                            "On‑site (BD)",
                        ]?.map((t) => (
                            <Chip key={t}>{t}</Chip>
                        ))}
                    </div>
                </GlassCard>
                <GlassCard>
                    <div className="flex items-center gap-3">
                        <Rocket className="w-5 h-5" />
                        <p className="font-medium">Frameworks & Tools</p>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <p className="flex items-center gap-2">
                            <Code className="w-4 h-4" /> Next.js, React, TS
                        </p>
                        <p className="flex items-center gap-2">
                            <Layers className="w-4 h-4" /> Redux, RTKQ
                        </p>
                        <p className="flex items-center gap-2">
                            <Code className="w-4 h-4" /> Node, Express
                        </p>
                        <p className="flex items-center gap-2">
                            <Database className="w-4 h-4" /> MongoDB
                        </p>
                    </div>
                </GlassCard>
            </div>
        </div>
    </Section>
);

const Skills = () => (
    <Section id="skills" className="pt-10 md:pt-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Skills
        </h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
            {SKILLS.map((s, i) => (
                <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    className=""
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{s.name}</p>
                        <p className="text-sm text-black/60 dark:text-white/60">
                            {s.level}%
                        </p>
                    </div>
                    <ProgressBar value={s.level} />
                </motion.div>
            ))}
        </div>
    </Section>
);

const Projects = () => (
    <Section id="projects" className="pt-10 md:pt-20">
        <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Projects
            </h2>
            <a
                href={CONTACT.github}
                className="text-sm inline-flex items-center gap-1 opacity-80 hover:opacity-100"
            >
                View more <ExternalLink className="w-4 h-4" />
            </a>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
                <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                    <GlassCard className="hover:-translate-y-1 hover:shadow-xl transition">
                        <h3 className="text-lg md:text-xl font-semibold">
                            {p.title}
                        </h3>
                        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                            {p.description}
                        </p>
                        <ul className="mt-3 text-sm list-disc pl-5 space-y-1">
                            {p.bullets.map((b) => (
                                <li key={b}>{b}</li>
                            ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {p.tech.map((t) => (
                                <Chip key={t}>{t}</Chip>
                            ))}
                        </div>
                        <div className="mt-5 flex gap-2">
                            {p.href && (
                                <a
                                    href={p.href}
                                    className="px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
                                >
                                    Live
                                </a>
                            )}
                            {p.repo && (
                                <a
                                    href={p.repo}
                                    className="px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
                                >
                                    Code
                                </a>
                            )}
                        </div>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
    </Section>
);

const Contact = () => (
    <Section id="contact" className="pt-10 md:pt-20 pb-16 md:pb-24">
        <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    Let’s build something.
                </h2>
                <p className="mt-3 text-black/70 dark:text-white/70">
                    I’m open to roles, freelance projects, and collaborations.
                    The quickest way to reach me is by email or phone.
                </p>
                <div className="mt-6 space-y-2 text-sm">
                    <a
                        href={CONTACT.email}
                        className="flex items-center gap-2 hover:underline"
                    >
                        <Mail className="w-4 h-4" /> your.email@example.com
                    </a>
                    <a
                        href={CONTACT.phone}
                        className="flex items-center gap-2 hover:underline"
                    >
                        <Phone className="w-4 h-4" /> +880 1700 940689
                    </a>
                    <a
                        href={CONTACT.github}
                        className="flex items-center gap-2 hover:underline"
                    >
                        <Github className="w-4 h-4" /> GitHub
                    </a>
                    <a
                        href={CONTACT.linkedin}
                        className="flex items-center gap-2 hover:underline"
                    >
                        <Linkedin className="w-4 h-4" /> LinkedIn
                    </a>
                </div>
            </div>
            <div className="md:col-span-7">
                <GlassCard>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div className="col-span-1">
                            <label className="text-sm">Name</label>
                            <input
                                className="mt-1 w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5"
                                placeholder="Your name"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="text-sm">Email</label>
                            <input
                                type="email"
                                className="mt-1 w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="text-sm">Message</label>
                            <textarea
                                className="mt-1 w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 min-h-[120px]"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2 flex items-center justify-between gap-3">
                            <p className="text-xs text-black/60 dark:text-white/60">
                                This demo form doesn’t send yet. Hook it to your
                                API or form service.
                            </p>
                            <button className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition">
                                Send
                            </button>
                        </div>
                    </form>
                </GlassCard>
            </div>
        </div>
    </Section>
);

export default function MahdiPortfolio() {
    const { dark, setDark } = useTheme();
    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <main className="min-h-[100svh] font-[ui-sans-serif,system-ui,Segoe UI,Roboto,Inter,Helvetica,Arial] text-black dark:text-white bg-[radial-gradient(1200px_800px_at_20%_-10%,rgba(99,102,241,0.15),transparent),radial-gradient(1000px_700px_at_100%_10%,rgba(56,189,248,0.15),transparent)] dark:bg-[radial-gradient(1200px_800px_at_20%_-10%,rgba(99,102,241,0.06),transparent),radial-gradient(1000px_700px_at_100%_10%,rgba(56,189,248,0.06),transparent)] selection:bg-amber-200 selection:text-black">
            <ScrollProgress />
            <AnimatedGradient />

            {/* Theme toggle */}
            <button
                onClick={() => setDark(!dark)}
                className="fixed bottom-4 right-4 z-40 px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-lg"
                aria-label="Toggle theme"
            >
                {dark ? "☾" : "☀"}
            </button>

            <Nav />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />

            <footer className="mt-8 px-4 md:px-8 py-10 border-t border-black/10 dark:border-white/10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-black/60 dark:text-white/60">
                        © {year} Mahdi Hussain. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        {TAGS.slice(0, 5).map((t) => (
                            <Chip key={t}>{t}</Chip>
                        ))}
                    </div>
                </div>
            </footer>
        </main>
    );
}
