import { Link } from "@chakra-ui/react";

export type Company = "Spark_Youth_Robotics_Club" | "iLeap_Club";

export type CompanyDetail = {
  name: string;
  longName: string;
  subDetail?: string;
  url: string;
  position: string;
  duration: string;
  logo: {
    light: string;
    dark?: string;
  };
  roles?: JSX.Element[];
};

export const Experiences: {
  [key in Company]: CompanyDetail;
} = {
  QNX: {
    name: "Blackberry QNX",
    longName: "Blackberry QNX",
    subDetail: "Ottawa, Ontario",
    url: "https://blackberry.qnx.com/en",
    position: "Software Developer",
    duration: "Jan 2025 - Apr 2025, Co-op",
    logo: {
      light: "/worked_at_logos/qnx/qnx_logo.png",
      dark: "/worked_at_logos/qnx/qnx_logo.png",
    },
    roles: [
      <>
        Expanded test coverage for QNX’s RTOS by designing and implementing
        Pytest-based tests for network manager components (io-pkt and io-sock),
        ensuring safety certification standards for product release are met.
      </>,
      <>
        Developed tools and automated tests in Bash, C, and Python to support
        QNX systems and address client patch requests, enhancing operational
        efficiency, and improving testing accuracy.
      </>,
      <>
        Gained practical experience working in Linux/Unix environments by
        writing OS-level code and automating tasks with shell scripting to
        streamline operations.
      </>,
    ],
  },
  Spark_Youth_Robotics_Club: {
    name: "Spark Youth Robotics Club",
    longName: "FIRST Robotics Team 8729: Spark Youth Robotics Club",
    subDetail: "Kanata, Ontario",
    url: "https://sparkyouthrobotics.netlify.app/",
    position: "Software Subteam Lead, Bot Developer, and Mentor",
    duration: "Jun 2021 - Present, Part-time",
    logo: {
      light: "/worked_at_logos/syrc/syrc_logo.png",
      dark: "/worked_at_logos/syrc/syrc_logo.png",
    },
    roles: [
      <>
        Organized online workshops tailored toward children to spark interest in
        robotics, software development, and engineering.
      </>,
      <>
        Managed the autonomous and lighting software subteams during the FRC
        build season.
      </>,
      <>
        Trained team members on WPILib, PID systems, and the GitHub workflow;
        responsible for preparing weekly lesson plans.
      </>,
      <>
        Became the first team from Ottawa to qualify for the FIRST Championships
        in 4 years, as rookies.
      </>,
      <>
        Used Node.js paired with PostgreSQL to craft a general-purpose Discord
        bot tailored towards streamlining various club tasks.
      </>,
    ],
  },
  // iLeap_Club: {
  //   name: "iLeap Club",
  //   longName: "Children & Youth Soft Skills Leadership Program",
  //   subDetail: "Ottawa, Ontario",
  //   url: "https://www.ileapclub.com/",
  //   position: "Coordinator and Mentor",
  //   duration: "Sept 2019 - Jun 2022, Part-time",
  //   logo: {
  //     light: "/worked_at_logos/ileap/ileap_logo.png",
  //     dark: "/worked_at_logos/ileap/ileap_logo.png",
  //   },
  //   roles: [
  //     <>
  //       Volunteered as a club meeting coordinator for weekly public speaking,
  //       soft skills, and leadership meetings for young teenage leaders.
  //     </>,
  //     <>Organized and administered weekly in-person and online meetings.</>,
  //     <>
  //       Worked closely alongside colleagues to manage each week’s content and
  //       provided valuable guidance and feedback to members.
  //     </>,
  //   ],
  // },
};

export const ExperiencesList = [
  Experiences.QNX,
  Experiences.Spark_Youth_Robotics_Club,
];
