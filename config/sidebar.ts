import { IconType } from "react-icons";
import { FaLinkedin, FaGithub, FaCode, FaFilePdf } from "react-icons/fa";

type SocialMedia = {
  label: string;
  href: string;
  icon: IconType;
};

export const SocialMedias: SocialMedia[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-lu-9575a0176/",
    icon: FaLinkedin,
  },
  {
    label: "Github",
    href: "https://github.com/FinityFly",
    icon: FaGithub,
  },
  {
    label: "Devpost",
    href: "https://devpost.com/FinityFly",
    icon: FaCode,
  },
  {
    label: "Resume",
    href: "/DanielLu_Resume.pdf",
    icon: FaFilePdf,
  },
];
