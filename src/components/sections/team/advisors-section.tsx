import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";

const advisors = [
  {
    id: 1,
    name: "Anatoly Yakovenko",
    role: "The Inventor of Speed",
    image: "/images/advisors/Anatoly_Yakovenko.jpg",
    bio: "Leading researcher in blockchain technology and social impact.",
    social: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Nonprofit Advisor",
    image: "/team/placeholder.jpg",
    bio: "Former CEO of major charitable foundation, 20+ years experience.",
    social: {
      twitter: "#",
      linkedin: "#"
    }
  }
];

export const AdvisorsSection = () => {
  return (
    <section className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-950 dark:text-rose-50">
          Our Advisors
        </h2>
        <p className="mt-4 text-xl text-red-800/80 dark:text-rose-100/80 max-w-2xl mx-auto">
          Industry experts guiding our mission and strategy
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {advisors.map((advisor) => (
          <div 
            key={advisor.id}
            className="group bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-6 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-red-500/20 dark:bg-red-500/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover w-full h-full"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-950 dark:text-rose-50 mb-1">
                  {advisor.name}
                </h3>
                <p className="text-red-600 dark:text-red-400 mb-2">{advisor.role}</p>
                <p className="text-red-800/80 dark:text-rose-100/80">
                  {advisor.bio}
                </p>
                <div className="flex gap-4 mt-4">
                  <a href={advisor.social.twitter} className="text-red-950 dark:text-rose-50 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href={advisor.social.linkedin} className="text-red-950 dark:text-rose-50 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}; 