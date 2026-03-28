import { IconType } from "react-icons";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

type SocialMedia = {
  label: string;
  href: string;
  icon: IconType;
};

export const SocialMedias: SocialMedia[] = [
  {
    label: "Github",
    href: "https://github.com/finityfly",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-lu-9575a0176/",
    icon: FaLinkedin,
  },
  {
    label: "X",
    href: "https://x.com/daniel_jmlu",
    icon: FaXTwitter,
  },
];
