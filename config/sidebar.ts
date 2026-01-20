import { IconType } from "react-icons";
import { FaLinkedin, FaGithub, FaTwitter, FaFilePdf } from "react-icons/fa";

type SocialMedia = {
  label: string;
  href: string;
  icon: IconType;
};

export const SocialMedias: SocialMedia[] = [
  {
    label: "Github",
    href: "https://github.com/FinityFly",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-lu-9575a0176/",
    icon: FaLinkedin,
  },
  {
    label: "Twitter",
    href: "https://x.com/im_daniel_lu",
    icon: FaTwitter,
  },
  // {
  //   label: "Resume",
  //   href: "/DanielLu_Resume.pdf",
  //   icon: FaFilePdf,
  // },
];
