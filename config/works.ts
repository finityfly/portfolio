import { IconType } from "react-icons";
import {
  SiDotnet,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiDocker,
  SiGooglecloud,
  SiPostgresql,
  SiMicrosoftsqlserver,
  SiMysql,
  SiMongodb,
  SiGit,
} from "react-icons/si";
import { BsQuestionSquare } from "react-icons/bs";
import { AiOutlineAntDesign } from "react-icons/ai";
import { FaSourcetree } from "react-icons/fa";
import { IoLogoPwa } from "react-icons/io5";

export type Work = {
  title: string;
  points: string[];
  src: string[];
  url1: string;
  url2: string;
  date: string;
  location: string;
  technologies: IconType[];
  icon: string;
};

export const Works: {
  work: Work[];
} = {
  work: [
    {
      title: "Software Engineer",
      points: [
        "Developed and maintained a cloud-based platform for audio and video processing.",
        "Implemented a real-time audio and video processing system using WebRTC and FFmpeg.",
        "Developed a cloud-based platform for audio and video processing.",
        "Developed a cloud-based platform for audio and video processing.",
      ],
      src: ["/works/walk_thumbnail.png", "/works/tracy_thumbnail.png"],
      url1: "",
      url2: "",
      date: "2020 - Present",
      location: "Toronto, ON",
      technologies: [SiDotnet, SiJavascript, SiTypescript, SiNodedotjs],
      icon: "GenAI Icon, UofT Icon, Google Icon",
    },
  ],
};
