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
  Hero,
  MainHeader,
  ProfileCard,
  Section,
  StackItem,
  SubHeader,
} from "./_components";
import GraphQl from "@/components/icons/GraphQl";

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
        className="h-screen"
      >
        <MainHeader>About</MainHeader>
        <article>
          <SubHeader>
            Who is the <strong className="text-symbol-500">chef?</strong>
          </SubHeader>
          <div className="w-full flex flex-col md:flex-row gap-x-2">
            <div className="flex-1 flex justify-center items-center">
              <ProfileCard />
            </div>
            <div className="flex-1 flex flex-col p-2">
              <SubHeader className="text-2xl">Dev Stacks</SubHeader>
              <div className="flex-1 flex flex-wrap gap-2">
                <StackItem>
                  <JavaScript className="w-4 h-4 rounded-sm" />
                  JavaScript
                </StackItem>
                <StackItem>
                  <TypeScript className="w-4 h-4 rounded-sm" />
                  TypeScript
                </StackItem>
                <StackItem>
                  <ReactIcon className="w-4 h-4 rounded-sm" />
                  React
                </StackItem>
                <StackItem>
                  <NextJsIcon className="w-4 h-4 rounded-sm" />
                  Next.js
                </StackItem>
                <StackItem>
                  <TanstackQueryIcon className="w-4 h-4 rounded-sm" />
                  TanstackQuery
                </StackItem>
                <StackItem>
                  <Redux className="w-4 h-4 rounded-sm" />
                  ReduxToolKit
                </StackItem>
                <StackItem>Zustand</StackItem>
                <StackItem>
                  <StyledComponents className="w-4 h-4 rounded-sm" />
                  StyledComponents
                </StackItem>
                <StackItem>
                  <TailwindIcon className="w-4 h-4 rounded-sm" />
                  Tailwind
                </StackItem>
                <StackItem>
                  <NestJsIcon className="w-4 h-4 rounded-sm" />
                  Nest.js
                </StackItem>
                <StackItem>
                  <GraphQl className="w-4 h-4 rounded-sm" />
                  GraphQL
                </StackItem>
                <StackItem>
                  <PrismaIcon className="w-4 h-4 rounded-sm" />
                  Prisma
                </StackItem>
                <StackItem>
                  <Apollo className="w-4 h-4 rounded-sm" />
                  Apollo Client
                </StackItem>
              </div>
            </div>
          </div>
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
