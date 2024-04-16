import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        Projects
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        <ProjectCard
          src="/tracy_thumbnail.png"
          title="TRACY: Tennis Real-Time Analysis and Coaching Systems"
          description="A full-stack web application that provides real-time analysis and coaching for tennis players. The React application uses computer vision to track the player's movements and provides feedback on their performance."
        />
        <ProjectCard
          src="/walk_thumbnail.png"
          title="Walk in the Park"
          description="A gamified mobile application designed to foster empathy, understanding, and cultural awareness. The project utilizes React Native for cross-platform capability, AI-driven content curation, and a Python-based server infrastructure"
        />
        <ProjectCard
          src="/melodica_thumbnail.png"
          title="Melodica"
          description="A modern web tool for musicians that leverages AI-powered technologies to separate instrument stems and provide other valuable utilities. The project uses React in combination with p5.js for the front-end and Flask for the back-end."
        />
      </div>
    </div>
  );
};

export default Projects;
