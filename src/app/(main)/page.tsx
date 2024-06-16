import { TAB_MAP } from "@/constants/navigator";

import {
  Apollo,
  JavaScript,
  NestJsIcon,
  NextJsIcon,
  PrismaIcon,
  ReactIcon,
  Redux,
  StyledComponents,
  TailwindIcon,
  TanstackQueryIcon,
  TypeScript,
} from "@/components/icons";

import {
  Career,
  Hero,
  MainHeader,
  ProfileCard,
  Section,
  StackItem,
  SubHeader,
} from "./_components";
import GraphQl from "@/components/icons/GraphQl";

const STACK_MAP = [
  {
    icon: <JavaScript className="w-4 h-4 rounded-sm" />,
    stackName: "Javascript",
  },
  {
    icon: <TypeScript className="w-4 h-4 rounded-sm" />,
    stackName: "TypeScript",
  },
  {
    icon: <ReactIcon className="w-4 h-4 rounded-sm" />,
    stackName: "React",
  },
  {
    icon: <NextJsIcon className="w-4 h-4 rounded-sm" />,
    stackName: "Next.js",
  },
  {
    icon: <TanstackQueryIcon className="w-4 h-4 rounded-sm" />,
    stackName: "TanstackQuery",
  },
  {
    icon: <Redux className="w-4 h-4 rounded-sm" />,
    stackName: "ReduxToolKit",
  },
  {
    icon: null,
    stackName: "Zustand",
  },
  {
    icon: <StyledComponents className="w-4 h-4 rounded-sm" />,
    stackName: "StyledComponents",
  },
  {
    icon: <TailwindIcon className="w-4 h-4 rounded-sm" />,
    stackName: "Tailwind",
  },
  {
    icon: <NestJsIcon className="w-4 h-4 rounded-sm" />,
    stackName: "Nest.js",
  },
  {
    icon: <GraphQl className="w-4 h-4 rounded-sm" />,
    stackName: "GraphQL",
  },
  {
    icon: <PrismaIcon className="w-4 h-4 rounded-sm" />,
    stackName: "Prisma",
  },
  {
    icon: <Apollo className="w-4 h-4 rounded-sm" />,
    stackName: "ApolloClient",
  },
];

const MainPage = () => {
  return (
    <div className="flex flex-col">
      <Section
        id={TAB_MAP[0].contant} // home
        index={0}
        className="h-screen flex flex-col relative justify-center items-center"
      >
        <Hero />
      </Section>
      <Section
        id={TAB_MAP[1].contant} // about
        index={1}
        className=""
      >
        <MainHeader>About</MainHeader>
        <article className="h-screen">
          <SubHeader>
            Who is the <strong className="text-symbol-500">chef?</strong>
          </SubHeader>
          <div className="w-full flex flex-col md:flex-row gap-x-2">
            <div className="flex-1 flex justify-center items-center">
              <ProfileCard />
            </div>
            <div className="flex-1 flex flex-col p-2 items-center">
              <SubHeader className="text-2xl">Dev Stacks</SubHeader>
              <div className="flex-1 flex flex-wrap gap-2">
                {STACK_MAP.map(({ icon, stackName }, index) => (
                  <StackItem key={index}>
                    {icon}
                    {stackName}
                  </StackItem>
                ))}
              </div>
            </div>
          </div>
        </article>
        <article className="h-screen">
          <SubHeader>Career</SubHeader>
          <Career />
        </article>
      </Section>
      <Section
        id={TAB_MAP[2].contant} // project
        index={2}
        className="h-screen bg-symbol-300 text-secondary text-3xl font-bold"
      >
        <MainHeader>Project</MainHeader>
      </Section>
      <Section
        id={TAB_MAP[4].contant} // contact
        index={4}
        className="h-screen bg-symbol-100 text-secondary text-3xl font-bold"
      >
        <MainHeader>Contact</MainHeader>
      </Section>
    </div>
  );
};

export default MainPage;
