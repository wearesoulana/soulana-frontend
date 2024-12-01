import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Barış Cem Bayburtlu",
    role: "Frontend & Backend Developer", 
    image: "/images/team/barispic.png",
    bio: "Full-stack developer with expertise in React and Node.js. Passionate about building impactful web applications.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  },
  {
    id: 2,
    name: "Mehmet Ali Selvet",
    role: "Backend & Blockchain Developer",
    image: "/images/team/phun333pic.jpg",
    bio: "Experienced blockchain developer specializing in decentralized applications. Focused on scalable solutions.",
    social: {
      twitter: "#",
      linkedin: "#", 
      github: "#"
    }
  },
  {
    id: 3,
    name: "Eylül Çağan Uğtur",
    role: "Product Owner & Designer",
    image: "/images/team/caganpic.jpg",
    bio: "Product strategist and UI/UX designer with a keen eye for detail. Dedicated to creating seamless user experiences.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  }
];

export const TeamSection = () => {
  return (
    <section className="mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div 
            key={member.id}
            className="group bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-6 transition-all duration-300 hover:scale-105"
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-red-500/20 dark:bg-red-500/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src={member.image}
                alt={member.name}
                width={128}
                height={128}
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-red-950 dark:text-rose-50 text-center mb-1">
              {member.name}
            </h3>
            <p className="text-red-600 dark:text-red-400 text-center mb-4">{member.role}</p>
            <p className="text-red-800/80 dark:text-rose-100/80 text-center mb-6">
              {member.bio}
            </p>
            <div className="flex justify-center gap-4">
              <a href={member.social.twitter} className="text-red-950 dark:text-rose-50 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={member.social.linkedin} className="text-red-950 dark:text-rose-50 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={member.social.github} className="text-red-950 dark:text-rose-50 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}; 