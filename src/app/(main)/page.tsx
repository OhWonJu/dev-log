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
  ContactCard,
  Hero,
  MainHeader,
  ProfileCard,
  Section,
  StackItem,
  SubHeader,
} from "./_components";
import GraphQl from "@/components/icons/GraphQl";
import { PinContainer } from "@/components/ui/3d-pin";
import Image from "next/image";
import Link from "next/link";

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
        <article className="">
          <SubHeader>
            About this <strong className="text-symbol-500">web page</strong>
          </SubHeader>
          <div className="flex flex-col justify-center items-center">
            <PinContainer
              containerClassName="w-[80%] aspect-[3/2]"
              title={
                <div className="">
                  <h4 className="text-xl font-bold mb-3">Ingregient!</h4>
                  <ul className="columns-2 list-disc gap-8 font-medium pl-4 text-sm">
                    <li>
                      500 grams of fresh <strong>Next.js</strong>
                    </li>
                    <li>
                      14 oz of <strong>Typescript</strong>
                    </li>
                    <li>
                      1 cups of <strong>Zustand</strong>
                    </li>
                    <li>
                      2 cups of <strong>Shadcn ui</strong>
                    </li>
                    <li>
                      2 teaspoons of <strong>Aceternity ui</strong>
                    </li>
                    <li>
                      1 tablespoons <strong>Framer motion</strong>
                    </li>
                    <li>
                      Whisk together by <strong>Tailwind css</strong>
                    </li>
                    <li>
                      Half a gallon of <strong>Prisma</strong>
                    </li>
                    <li>
                      melting by <strong>Tanstack Query</strong>
                    </li>
                  </ul>
                </div>
              }
              usingPules={false}
              className="w-full h-full"
            >
              {/* 이미지 3/2 컷 필요 */}
              <Image
                src={"/about_this_page.jpeg"}
                alt="about_this_page"
                fill
                className="object-cover"
              />
            </PinContainer>
            <div className="mt-40 text-center text-3xl md:text-4xl">
              <span className="font-extrabold leading-normal">
                <strong className="text-symbol-500 font-Pacifico pr-3">
                  Recipe
                </strong>
                는 웹 개발에 대한 아이덴티티,
                <br />
                경험과 지식을 레시피에 빗대어
                <br />
                재치있게 표현하는 웹 페이지 입니다.
              </span>
            </div>
            <Link
              href={
                "https://www.youtube.com/playlist?list=OLAK5uy_mdRMwRFWWeYjIB3pYnWgPOhb_FCyRP1fE"
              }
              target="_blank"
              className="mt-3 mb-60"
            >
              <span className="text-zinc-400 text-xs font-semibold">
                motive by Cheeze - recipe!
              </span>
            </Link>
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
        className="h-[110vh]"
      >
        <MainHeader>Contact</MainHeader>
        <div className="flex w-full">
          <div className="flex-1 flex justify-center">
            <ContactCard />
          </div>
          <div className="flex-1">
            <SubHeader className="text-3xl">Chat with me!</SubHeader>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default MainPage;
