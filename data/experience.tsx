import type { ReactElement } from "react";
import { Link } from "@chakra-ui/react";

export type Company = "QNX" | "Trend_Micro" | "uOttahack" | "Spark_Youth_Robotics_Club";

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
  roles?: ReactElement[];
};

export const Experiences: {
  [key in Company]: CompanyDetail;
} = {
  QNX: {
    name: "Blackberry QNX",
    longName: "Blackberry QNX",
    subDetail: "Kanata, Ontario",
    url: "https://blackberry.qnx.com/en",
    position: "Software Test Developer",
    duration: "Jan 2025 - Apr 2025",
    logo: {
      light: "/worked_at_logos/qnx/qnx_logo.png",
      dark: "/worked_at_logos/qnx/qnx_logo.png",
    },
    roles: [
      <>
        Engineered automated test frameworks in <b>Python (Pytest)</b> for the{" "}
        <b>QNX RTOS</b>, increasing test coverage by <b>15%</b> in a
        safety-certified, regulated environment.
      </>,
      <>
        <b>Boosted shipping speeds</b> and improved system validation accuracy
        by <b>20%</b> by developing reliable automation scripts and robust
        testing tools in <b>Python, C, and Bash</b>.
      </>,
    ],
  },
  Trend_Micro: {
    name: "Trend Micro",
    longName: "Trend Micro",
    subDetail: "Kanata, Ontario",
    url: "https://www.trendmicro.com/en_ca/business.html",
    position: "Software Developer",
    duration: "May 2025 - Aug 2025",
    logo: {
      light: "/worked_at_logos/trend_micro/trend_micro_light.png",
      dark: "/worked_at_logos/trend_micro/trend_micro_dark.png",
    },
    roles: [
      <>
        Led development of a <b>digital twin PoC</b>, creating a{" "}
        <b>RAG system</b> with <b>LangChain</b>, <b>Neo4j</b>,{" "}
        <b>PGVector</b>, and <b>Model Context Protocol (MCP)</b> for
        predictive infrastructure security analytics.
      </>,
      <>
        Delivered an executive presentation to{" "}
        <b>Trend Micro CEO Office</b> in Taiwan; pitched its technical value to
        an audience of <b>70+</b> and securing approval from{" "}
        <b>C-suite stakeholders</b>.
      </>,
      <>
        Enhanced system performance and scalability for{" "}
        <b>120+ active enterprise users</b> by architecting cloud
        infrastructure optimizations across <b>AWS/Azure</b> with{" "}
        <b>Kubernetes HPA</b> and <b>pod load balancing</b>.
      </>,
      <>
        Engineered <b>CI/CD pipelines</b> for internal SDKs and database
        deployment systems serving <b>200+ developers and 10,000+
        stakeholders</b>, reducing release cycles by <b>65%</b> from a whole
        day.
      </>,
    ],
  },
  uOttahack: {
    name: "uOttahack",
    longName: "uOttahack",
    subDetail: "Ottawa, Ontario",
    url: "https://uottahack.ca/",
    position: "Software Developer and Cloud Engineer",
    duration: "Sep 2025 - Current",
    logo: {
      light: "/worked_at_logos/uottahack/uottahack_logo.png",
      dark: "/worked_at_logos/uottahack/uottahack_logo.png",
    },
    roles: [
      <>
        Developing and maintaining the official uOttahack website ecosystem for 2000+ annual hackers using <b>React</b>, <b>Angular</b>, <b>MongoDB</b>, <b>Docker</b>, and <b>Rails</b>.
      </>,
      <>
        Scaled the uOttaHack website to handle 3x traffic during peak registration periods via AWS horizontal scaling and load balancing optimizations.
      </>
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
};

export const ExperiencesList = [
  Experiences.Trend_Micro,
  Experiences.QNX,
  Experiences.uOttahack,
  Experiences.Spark_Youth_Robotics_Club,
];
