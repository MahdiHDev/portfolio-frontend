import { GlassCard, Section } from "@/app/page";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    SiExpress,
    SiGit,
    SiGithub,
    SiJavascript,
    SiMongodb,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiPostman,
    SiReact,
    SiRedux,
    SiTailwindcss,
    SiTypescript,
    SiVercel,
} from "react-icons/si";

const SKILLS = [
    // Frontend
    { name: "JavaScript", icon: SiJavascript, category: "Frontend" },
    { name: "TypeScript", icon: SiTypescript, category: "Frontend" },
    { name: "React", icon: SiReact, category: "Frontend" },
    { name: "Next.js", icon: SiNextdotjs, category: "Frontend" },
    { name: "Redux", icon: SiRedux, category: "Frontend" },
    { name: "Tailwind", icon: SiTailwindcss, category: "Frontend" },

    // Backend
    { name: "Node.js", icon: SiNodedotjs, category: "Backend" },
    { name: "Express", icon: SiExpress, category: "Backend" },

    // Database
    { name: "MongoDB", icon: SiMongodb, category: "Database" },
    { name: "PostgreSql", icon: SiPostgresql, category: "Database" },

    // Tools
    { name: "Git", icon: SiGit, category: "Tools" },
    { name: "GitHub", icon: SiGithub, category: "Tools" },
    { name: "Postman", icon: SiPostman, category: "Tools" },
    { name: "Vercel", icon: SiVercel, category: "Tools" },
];

export const Draft = () => {
    const filters = ["All", "Frontend", "Backend", "Database", "Tools"];
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredSkills =
        activeFilter === "All"
            ? SKILLS
            : SKILLS.filter((skill) => skill.category === activeFilter);

    return (
        <Section id="skills" className="pt-20">
            <h2 className="text-3xl font-semibold">Skills</h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mt-6">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 rounded-full border transition ${
                            activeFilter === filter
                                ? "bg-sky-500 text-white border-sky-500"
                                : "border-white/10 hover:bg-white/10"
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-8">
                {filteredSkills.map((skill, i) => {
                    const Icon = skill.icon;

                    return (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <GlassCard className="h-full hover:-translate-y-2 transition">
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <Icon className="text-5xl group-hover:scale-110 transition" />
                                    <p className="font-medium">{skill.name}</p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};
