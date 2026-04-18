import Image from "next/image";
import { Section } from "@/components/atoms/section";
import { SectionHeading } from "@/components/atoms/section-heading";
import { ClayCard } from "@/components/atoms/clay-card";
import { cn } from "@/lib/utils";

const TEAM = [
  {
    name: "Dr Sarah Mitchell",
    role: "Chief Medical Officer",
    bio: "Sports medicine specialist with 15 years in elite athlete care. Former Team GB doctor.",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Dr James Okonkwo",
    role: "Lead Scientist",
    bio: "PhD in endocrinology. Designs our biomarker panels based on the latest performance research.",
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Emma Wright",
    role: "Head of Nutrition",
    bio: "Registered dietician specialising in sports performance and recovery. Former Olympic nutritionist.",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Marcus Chen",
    role: "Head of Product",
    bio: "Ex-pro athlete turned product lead. Makes sure every test is useful to people who train hard.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
  },
] as const;

export function TeamSection() {
  return (
    <Section id="team" className="bg-cream">
      <SectionHeading
        eyebrow="Real people"
        title="Meet your health partners"
        description="Science-led care from real humans. Our team of doctors, researchers, and athletes have one mission: help you understand your body better and train harder for longer."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
        {TEAM.map((member) => (
          <ClayCard
            key={member.name}
            hover
            className="p-6 flex flex-col items-center text-center h-full"
          >
            <div
              className={cn(
                "relative w-32 h-32 rounded-full overflow-hidden shrink-0 mb-4",
                "ring-2 ring-white/80 shadow-md"
              )}
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="font-bold text-navy text-lg">{member.name}</h3>
            <p className="text-coral text-sm font-semibold mt-1">{member.role}</p>
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
              {member.bio}
            </p>
          </ClayCard>
        ))}
      </div>
    </Section>
  );
}
