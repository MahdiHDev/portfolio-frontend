import { useState } from "react";
import {
    SiBetterauth,
    SiBootstrap,
    SiExpress,
    SiGithub,
    SiPrisma,
    SiVercel,
} from "react-icons/si";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";
import DockerIcon from "./icons/DockerIcon";
import FirebaseIcon from "./icons/FirebaseIcon";
import GitIcon from "./icons/GitIcon";
import GoLang from "./icons/GoLang";
import JavascriptIcon from "./icons/JavascriptIcon";
import MongoDB from "./icons/MongoDB";
import NextJs from "./icons/NextJs";
import NodeJs from "./icons/NodeJs";
import PostgreSQL from "./icons/PostgreSQL";
import PostmanIcon from "./icons/PostmanIcon";
import ReactIcon from "./icons/ReactIcon";
import ReduxIcon from "./icons/Redux";
import TailwindIcon from "./icons/TailwindIcon";
import TypescriptIcon from "./icons/TypescriptIcon";

export const SKILLS = [
    // Frontend
    { name: "Javascript", icon: JavascriptIcon, category: "All" },
    { name: "Typescript", icon: TypescriptIcon, category: "All" },
    { name: "React", icon: ReactIcon, category: "Frontend" },
    { name: "Next.js", icon: NextJs, category: "Frontend" },
    { name: "Redux", icon: ReduxIcon, category: "Frontend" },
    { name: "Bootstrap", icon: SiBootstrap, category: "Frontend" },
    { name: "Tailwind", icon: TailwindIcon, category: "Frontend" },

    // Backend
    { name: "Node.js", icon: NodeJs, category: "Backend" },
    { name: "Express", icon: SiExpress, category: "Backend" },
    { name: "Better Auth", icon: SiBetterauth, category: "Backend" },
    { name: "Go", icon: GoLang, category: "Backend" },

    // Database
    { name: "PostgreSQL", icon: PostgreSQL, category: "Database" },
    { name: "MongoDB", icon: MongoDB, category: "Database" },
    { name: "Prisma", icon: SiPrisma, category: "Database" },
    { name: "Firebase", icon: FirebaseIcon, category: "Database" },

    // Tools
    { name: "Git", icon: GitIcon, category: "Tools" },
    { name: "GitHub", icon: SiGithub, category: "Tools" },
    { name: "Postman", icon: PostmanIcon, category: "Tools" },
    { name: "Vercel", icon: SiVercel, category: "Tools" },
    { name: "Docker", icon: DockerIcon, category: "Tools" },
];

export const Skills = () => {
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
            <GlassCard className="transition mt-6">
                <div className="flex gap-4 sm:gap-8 flex-wrap max-w-4xl justify-center mx-auto">
                    {filteredSkills.map((skill, i) => {
                        const Icon = skill.icon;

                        return (
                            <div>
                                <Icon className="size-10 sm:size-12" />
                            </div>
                        );
                    })}
                </div>
            </GlassCard>
        </Section>
    );
};
