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
  points: string[];
  src: string[];
  url1: string;
  url2: string;
  date: string;
  location: string;
  technologies: IconType[];
  icon: string;
  video?: string;
};

export const Works: {
  work: Work[];
} = {
  work: [
    {
      title: "CloudQ",
      points: [
        "Achieved <b>Best Web 3.0 Hack</b> in <b>McHacks 12</b> (out of <b>450+ participants</b>).",
        "Deployed an <b>effective, decentralized, virtual queue management system</b> that uses <b>Starknet smart contracts</b> to enable <b>secure</b> queue creation, joining, and management functionalities",
        "Developed a modern, responsive UI using <b>Vite, React.js, and TailwindCSS</b>, while integrating <b>Auth0</b> for secure, easy user authentication and <b>Twilio</b> for SMS notifications.",
      ],
      src: [
        "/works/cloudq/home.png",
        "/works/cloudq/eventCreate.png",
        "/works/cloudq/award.jpg",
        "/works/cloudq/judge1.jpg",
        "/works/cloudq/judge2.jpg",
      ],
      url1: "https://github.com/FinityFly/CloudQ",
      url2: "https://devpost.com/software/cloudq",
      date: "January 2025",
      location: "McGill University",
      technologies: [
        SiPython,
        SiJavascript,
        SiEthereum,
        SiRust,
        SiNodedotjs,
        SiReact,
        SiTailwindcss,
        SiTwilio,
      ],
      icon: "/works/cloudq/mcgill_logo.png",
      video: "https://youtu.be/wR3TyrAX_EQ?si=6-UZQ1P1yg_L02zG",
    },
    {
      title: "TRACY",
      points: [
        "Achieved <b>3rd Best Hack</b> in <b>QHacks 2024</b> (out of <b>200+ participants</b>)",
        "Developed an accessible, real-time web application for <b>tennis analysis and coaching</b>, implementing <b>computer vision algorithms</b> and a <b>convolutional recurrent neural network</b> powered by <b>OpenCV</b> and <b>TensorFlow</b>.",
        "Effectively tracks <b>rapid ball and human movements in 3D space</b> from a <b>singular viewpoint</b> and delivers personalized insights to enhance the skills of tennis enthusiasts.",
        "Engineered a sleek and responsive web interface using <b>React.js</b>, seamlessly integrating advanced statistical computations, captivating data visualizations, and intuitive natural language feedback.",
      ],
      src: [
        "/works/tracy/tracy_thumbnail.png",
        "/works/tracy/hero.png",
        "/works/tracy/analysis.png",
        "/works/tracy/summary.png",
        "/works/tracy/flowchart.png",
        "/works/tracy/IMG_0650.jpg",
      ],
      url1: "https://github.com/EdwinNgui/TRACY",
      url2: "https://devpost.com/software/tracy-dm41vu",
      date: "Feb 2024",
      location: "Queens University",
      technologies: [
        SiPython,
        SiJavascript,
        SiNodedotjs,
        SiReact,
        SiFlask,
        SiTensorflow,
      ],
      icon: "/works/tracy/qhacks_logo.png",
      video: "https://www.youtube.com/watch?v=kUHZ4xdJxuQ",
    },

    {
      title: "ASR Research",
      points: [
        "Published an ML research paper on <b>automatic speech recognition</b> that investigated the performances of different <b>speech feature extraction algorithms</b> in ASR systems.",
        "Trained a <b>deep bidirectional GRU network</b> using <b>TensorFlow</b> to accurately transcribe <b>continuous speech data</b> using varying audio feature extraction algorithms (<b>Mel spectrograms, MFCCs, and discrete wavelet transforms</b>).",
      ],
      src: ["/works/asr/paper.png"],
      url1: "https://github.com/FinityFly/SpeechRecognition",
      url2: "https://www.academia.edu/108988755/Investigating_the_Impact_of_Various_Feature_Extraction_Algorithms_on_Performance_in_Automatic_Speech_Recognition_Systems",
      date: "Jun 2022 - Jan 2023",
      location: "International Baccalareate Diploma Programme",
      technologies: [SiPython, SiTensorflow, SiPytorch, SiJupyter, SiDocker],
      icon: "/works/asr/ib_logo.png",
    },
    {
      title: "Walk in the Park",
      points: [
        "Achieved <b>Best AI in Education Hack</b> in <b>GenAI Genesis 2024</b> (out of <b>250+ participants</b>)",
        "Built a <b>gamified mobile application</b> aimed at fostering empathy, understanding, and cultural awareness among diverse communities around the world through immersive real-world exploration.",
        "Utilizes <b>React Native</b> for cross-platform accessibility, <b>Google Gemini</b> to create content and select music, and <b>Flask</b> as its server infrastructure.",
      ],
      src: [
        "/works/walk/walk_thumbnail.png",
        "/works/walk/map.png",
        "/works/walk/quests.png",
        "/works/walk/profile.png",
        "/works/walk/location.png",
        "/works/walk/card_song.png",
        "/works/walk/card_info.png",
        "/works/walk/DSC08909.jpg",
      ],
      url1: "https://github.com/EdwinNgui/Walk-in-the-Park",
      url2: "https://devpost.com/software/walk-in-the-park",
      date: "April 2024",
      location: "University of Toronto",
      technologies: [
        SiPython,
        SiJavascript,
        SiNodedotjs,
        SiReact,
        SiNextdotjs,
        SiFlask,
        SiAndroidstudio,
        SiGooglemaps,
      ],
      icon: "/works/walk/genai_logo.png",
      video: "https://www.youtube.com/watch?v=z-P6PsqcVrk",
    },
    {
      title: "Melodica",
      points: [
        "Achieved the <b>Best Hack for All Arts</b> in McGill AI Hacks (MAIS Hacks) 2023.",
        "Crafted a <b>modern tool for musicians</b> that leveraged <b>AI-powered technologies</b> to separate instrument stems and provide other valuable utilities.",
        "Orchestrated the <b>back-end Python development</b>, with a primary focus on <b>sound-to-instrument stem conversion</b> and seamless integration of various components into the final product.",
      ],
      src: [
        "/works/melodica/melodica_thumbnail.png",
        "/works/melodica/upload.png",
        "/works/melodica/gui.png",
        "/works/melodica/IMG_8550.jpg",
        "/works/melodica/IMG_8544.jpg",
      ],
      url1: "https://github.com/FinityFly/melodica",
      url2: "https://devpost.com/software/melodica-y0267b",
      date: "Oct 2023",
      location: "McGill University",
      technologies: [
        SiJavascript,
        SiNodedotjs,
        SiPython,
        SiFlask,
        SiP5Dotjs,
        SiThreedotjs,
      ],
      icon: "/works/melodica/mais_logo.png",
      video: "https://www.youtube.com/watch?v=wo1KqoT2Wjo",
    },
    {
      title: "MiMeals",
      points: [
        "Lead the development of a <b>modern meal-planning web application</b> utilizing the <b>WAMP stack</b> that enables users to effortlessly plan and streamline their daily meals",
        "Used <b>MySQL</b> to store recipe information, planned meals, and profiles; <b>REST API</b> to fetch public recipes and nutrition info.",
        "Taught me many important facets of software development, including the process of <b>full-stack development, database management, user interface design</b>, and <b>project management</b>.",
      ],
      src: [
        "/works/mimeals/mimeals_thumbnail.jpeg",
        "/works/mimeals/dashboard.png",
        "/works/mimeals/explorer.png",
        "/works/mimeals/meal_search.png",
      ],
      url1: "https://github.com/FinityFly/mimeals",
      url2: "http://mimeals.azurewebsites.net",
      date: "Jan 2023 - Jun 2023",
      location: "Merivale High School",
      technologies: [
        SiPhp,
        SiHtml5,
        SiJavascript,
        SiCss3,
        SiMysql,
        SiApache,
        SiDocker,
        SiMicrosoftazure,
      ],
      icon: "/works/mimeals/mhs_logo.png",
    },
  ],
};
