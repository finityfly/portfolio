import { IconType } from "react-icons";
import {
  SiReact,
  SiAndroidstudio,
  SiFlask,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPhp,
  SiNextdotjs,
  SiDocker,
  SiPython,
  SiPostgresql,
  SiMicrosoftsqlserver,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGooglemaps,
  SiTensorflow,
  SiPytorch,
  SiJupyter,
  SiMicrosoftazure,
  SiThreedotjs,
  SiP5Dotjs,
  SiHtml5,
  SiCss3,
  SiApache,
  SiEthereum,
  SiRust,
  SiTailwindcss,
  SiTwilio,
  SiD,
} from "react-icons/si";
import { BsQuestionSquare } from "react-icons/bs";
import { AiOutlineAntDesign } from "react-icons/ai";
import { FaSourcetree } from "react-icons/fa";
import { IoLogoPwa } from "react-icons/io5";

export type Work = {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  date?: string;
  thumbnailFit?: "cover" | "contain";
};

export const Works: {
  work: Work[];
} = {
  work: [
    {
      title: "Tobio",
      description: "The AI-powered volleyball video analysis platform that nobody else is getting right but everyone needs",
      thumbnail: "/works/tobio/demo.webm",
      url: "https://tobio.daniellu.ca/",
      date: "December 2025",
    },
    {
      title: "Clitris",
      description: "A minimalistic, high-fidelity, guideline Tetris implementation for the command line",
      thumbnail: "/works/clitris/demo.webm",
      url: "https://github.com/FinityFly/clitris",
      date: "January 2025",
    },
    {
      title: "CloudQ",
      description: "Streamlines queues with a decentralized virtual queue management system with Starknet (McHacks 2025 winner)",
      thumbnail: "/works/cloudq/demo.webm",
      url: "https://github.com/FinityFly/CloudQ",
      date: "January 2025",
    },
    {
      title: "TRACY",
      description: "Real-time CV for tennis coaching, leveraging TrackNetV2 and convolutional RNNs (QHacks 2024 3rd place)",
      thumbnail: "/works/tracy/demo.webm",
      url: "https://github.com/EdwinNgui/TRACY",
      date: "Feb 2024",
    },

    {
      title: "ASR Research",
      description: "Published an paper on a new way to train a deep bidirectional GRU networks to transcribe continuous speech data.",
      thumbnail: "/works/asr/paper.png",
      url: "https://www.academia.edu/108988755/Investigating_the_Impact_of_Various_Feature_Extraction_Algorithms_on_Performance_in_Automatic_Speech_Recognition_Systems",
      date: "Jun 2022 - Jan 2023",
      thumbnailFit: "contain",
    },
    {
      title: "Walk in the Park",
      description: "BeReal-inspired mobile app aimed at fostering cultural awareness through immersive real-world exploration (GenAI Genesis 2024 winner)",
      thumbnail: "/works/walk/demo.webm",
      url: "https://github.com/EdwinNgui/Walk-in-the-Park",
      date: "April 2024",
      thumbnailFit: "contain",
    },
    {
      title: "Melodica",
      description: "Modern tool for musicians with AI-powered sound-to-instrument stem conversion capabilities (MAISHacks 2023 winner)",
      thumbnail: "/works/melodica/demo.webm",
      url: "https://github.com/FinityFly/melodica",
      date: "Oct 2023",
    },
  ],
};
