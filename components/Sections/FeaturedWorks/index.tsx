
import { memo } from "react";
import { Heading, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import WorkCard from "./WorkCard";
import { fadeInUpSlower, galleryStagger } from "@/config/animations";
import { Work, Works } from "@/data/works";

const MotionDiv = motion.div;

function FeaturedWorksSection() {
  const featuredWorks = Works.work.filter((w: Work) => w.featured);
  const regularWorks = Works.work.filter((w: Work) => !w.featured);

  return (
    <Stack
      width="100%"
      height="100%"
      spacing={3}
    >
      <Stack spacing={3}>
        <Heading
          size="xl"
          fontFamily="name"
          color="heading"
          letterSpacing="0.03em"
          textTransform="lowercase"
        >
          selected works
        </Heading>
      </Stack>
      <MotionDiv
        className="flex flex-col gap-8"
        initial="initial"
        animate="animate"
        variants={galleryStagger}
      >
        {featuredWorks.map((work: Work) => (
          <MotionDiv key={work.title} variants={fadeInUpSlower}>
            <WorkCard
              title={work.title}
              description={work.description}
              mediaSrc={work.thumbnail || ""}
              href={work.url}
              featured
            />
          </MotionDiv>
        ))}
        {regularWorks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {regularWorks.map((work: Work) => (
              <MotionDiv
                key={work.title}
                variants={fadeInUpSlower}
                className="h-full"
              >
                <WorkCard
                  title={work.title}
                  description={work.description}
                  mediaSrc={work.thumbnail || ""}
                  href={work.url}
                />
              </MotionDiv>
            ))}
          </div>
        )}
      </MotionDiv>
    </Stack>
  );
}

export default memo(FeaturedWorksSection);
