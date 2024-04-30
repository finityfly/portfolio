import { IconType } from "react-icons";
import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCsharp,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiHtml5,
  SiPhp,
  SiCss3,
  SiAmazonaws,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiLinux,
  SiTensorflow,
  SiPytorch,
  SiTailwindcss,
  SiFlask,
  SiSelenium,
  SiMicrosoftazure,
  SiApache,
  SiJira,
  SiDocker,
  SiOpencv,
} from "react-icons/si";
import { FaJava, FaGit } from "react-icons/fa";

export type SkillCategory =
  | "programming"
  | "web"
  | "frameworks_libraries"
  | "cloud"
  | "tools";

export type Skill = {
  name: string;
  icon: IconType;
};

export const Skills: {
  [key in SkillCategory]: Skill[];
} = {
  programming: [
    {
      name: "C/C++",
      icon: SiCplusplus,
    },
    {
      name: "Python",
      icon: SiPython,
    },
    {
      name: "Java",
      icon: FaJava,
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
    },
    {
      name: "C#",
      icon: SiCsharp,
    },
  ],
  web: [
    {
      name: "HTML5",
      icon: SiHtml5,
    },
    {
      name: "CSS3",
      icon: SiCss3,
    },
    {
      name: "React, React Native",
      icon: SiReact,
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
    },
    {
      name: "Node.js",
      icon: SiNodedotjs,
    },
    {
      name: "PHP",
      icon: SiPhp,
    },
    {
      name: "Apache",
      icon: SiApache,
    },
  ],
  frameworks_libraries: [
    {
      name: "Flask",
      icon: SiFlask,
    },
    {
      name: "TensorFlow",
      icon: SiTensorflow,
    },
    {
      name: "PyTorch",
      icon: SiPytorch,
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
    },
    {
      name: "Selenium",
      icon: SiSelenium,
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
    },
    {
      name: "OpenCV",
      icon: SiOpencv,
    },
  ],
  cloud: [
    {
      name: "AWS",
      icon: SiAmazonaws,
    },
    {
      name: "MySQL",
      icon: SiMysql,
    },
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
    },
    {
      name: "Microsoft Azure",
      icon: SiMicrosoftazure,
    },
  ],
  tools: [
    {
      name: "Git",
      icon: FaGit,
    },
    {
      name: "Docker",
      icon: SiDocker,
    },
    {
      name: "Linux",
      icon: SiLinux,
    },
    {
      name: "Jira",
      icon: SiJira,
    },
  ],
};

export const splitSkills = (srcArray: Skill[]) => {
  const arrLength = srcArray.length;
  const isEvenChunk = arrLength % 2 === 0;

  let chunk = 4;
  if (isEvenChunk) {
    chunk = arrLength / 2;
  } else if (arrLength <= 5 && arrLength > 2) {
    chunk = 3;
  }

  let i = 0;
  let j = 0;
  const temporary = [];
  for (i = 0, j = srcArray.length; i < j; i += chunk) {
    temporary.push(srcArray.slice(i, i + chunk));
  }
  return temporary;
};
