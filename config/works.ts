import { IconType } from "react-icons";
import {
  SiDotnet,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiGraphql,
  SiApollographql,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiStyledcomponents,
  SiGhost,
  SiVuedotjs,
  SiDocker,
  SiGooglecloud,
  SiCpanel,
  SiRancher,
  SiGitlab,
  SiPostgresql,
  SiMicrosoftsqlserver,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiSocketdotio,
  // SiMaterialUi,
  SiFramer,
  SiGit,
  SiGnubash,
  SiVisualstudiocode,
  SiUnity,
  SiMicrosoft,
  SiElectron,
} from "react-icons/si";
import { BsQuestionSquare } from "react-icons/bs";
import { AiOutlineAntDesign } from "react-icons/ai";
import { FaSourcetree } from "react-icons/fa";
import { IoLogoPwa } from "react-icons/io5";

export type Work = {
  title: string;
  points: string[];
  url: string;
  secondUrl: string;
  date: string;
  icon: IconType;
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
      url: "",
      secondUrl: "",
      date: "2020 - Present",
      icon: SiDotnet,
    },
  ],
};
