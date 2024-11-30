import Image from "next/image";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "EduChain Scholarships",
    description: "Scholarship support for students seeking blockchain technology education.",
    image: "/projects/educhain.jpg",
    target: "100 SOL",
    raised: "45 SOL"
  },
  {
    id: 2,
    title: "GreenSol Reforestation",
    description: "Planting a tree for every transaction on the Solana blockchain.",
    image: "/projects/greensol.jpg",
    target: "200 SOL",
    raised: "120 SOL"
  },
];

export function DonationProjects() {
  return (
    <section className="mt-10">
      <h1 className="text-4xl font-bold text-red-950 dark:text-rose-50 text-center mb-4">
        Donation Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="bg-white/30 dark:bg-black/30 rounded-2xl border border-red-200 dark:border-red-900 p-6"
          >
            <div className="relative w-full h-48 mb-6">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="rounded-xl object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-red-950 dark:text-rose-50 mb-2">
              {project.title}
            </h3>
            <p className="text-red-800/80 dark:text-rose-100/80 mb-4">
              {project.description}
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-red-600 dark:text-red-400">
                Target: {project.target}
              </span>
              <span className="text-red-600 dark:text-red-400">
                Raised: {project.raised}
              </span>
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              Donate Now
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}