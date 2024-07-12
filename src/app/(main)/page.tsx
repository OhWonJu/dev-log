import Image from "next/image";
import Link from "next/link";

import { TAB_MAP } from "@/constants/navigator";

import { PinContainer } from "@/components/ui/3d-pin";
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
  GraphQl,
} from "@/components/icons";

import {
  Career,
  ContactCard,
  EnterChatButton,
  Hero,
  MainHeader,
  ProfileCard,
  Section,
  StackItem,
  SubHeader,
} from "./_components";
import ProjectList from "../(project)/_components/ProjectList";

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
    icon: <NextJsIcon className="w-4 h-4 rounded-sm fill-primary" />,
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
    <div className="flex flex-col px-6 md:px-0">
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
        <article className="min-h-screen">
          <SubHeader>
            Who is the <strong className="text-symbol-500">chef?</strong>
          </SubHeader>
          <div className="w-full flex flex-col lg:flex-row gap-20 lg:gap-2">
            <div className="flex-1 flex justify-center items-center">
              <ProfileCard />
            </div>
            <div className="flex-1 flex flex-col p-2 items-center">
              <SubHeader className="text-2xl mb-10">Dev Stacks</SubHeader>
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
        <article className="min-h-screen">
          <SubHeader>Career</SubHeader>
          <Career />
        </article>
        <article>
          <SubHeader>
            About this <strong className="text-symbol-500">web page</strong>
          </SubHeader>
          <div className="flex flex-col justify-center items-center">
            <PinContainer
              containerClassName="w-[100%] md:w-[90%] aspect-[3/2]"
              title={
                <div className="">
                  <h4 className="text-xl font-bold mb-3">Ingregient!</h4>
                  <ul className="columns-2 list-disc gap-8 font-medium pl-4 text-sm">
                    <li>
                      500 grams of fresh <strong>Next.js</strong>
                    </li>
                    <li>
                      97 oz of <strong>Typescript</strong>
                    </li>
                    <li>
                      4 cups of <strong>Zustand</strong>
                    </li>
                    <li>
                      10 cups of <strong>Shadcn ui</strong>
                    </li>
                    <li>
                      2 teaspoons of <strong>Aceternity ui</strong>
                    </li>
                    <li>
                      1 tablespoon <strong>Framer motion</strong>
                    </li>
                    <li>
                      Whisk together by <strong>Tailwind css</strong>
                    </li>
                    <li>
                      Half a gallon of <strong>Prisma</strong>
                    </li>
                    <li>
                      Melting by <strong>Tanstack Query</strong>
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
            <div className="mt-40 text-center text-2xl sm:text-3xl md:text-4xl">
              <span className="font-extrabold leading-normal">
                <strong className="text-symbol-500 font-Pacifico pr-3">
                  Recipe
                </strong>
                는 웹 개발에 대한 경험과 지식
                <br />
                그리고 아이덴티티를 레시피에 빗대어
                <br />
                재치있게 표현하고자 하는 웹 페이지입니다.
              </span>
            </div>
            <Link
              href={
                "https://www.youtube.com/playlist?list=OLAK5uy_mdRMwRFWWeYjIB3pYnWgPOhb_FCyRP1fE"
              }
              target="_blank"
              className="mt-3 mb-60"
            >
              <span className="text-zinc-400 dark:text-zinc-600 text-xs font-semibold">
                motive by Cheeze - recipe!
              </span>
            </Link>
          </div>
        </article>
      </Section>
      <Section
        id={TAB_MAP[2].contant} // project
        index={2}
        className="min-h-screen font-bold"
      >
        <MainHeader>Project</MainHeader>
        <ProjectList />
      </Section>
      <Section
        id={TAB_MAP[4].contant} // contact
        index={4}
        className="min-h-screen"
      >
        <MainHeader>Contact</MainHeader>
        <div className="flex flex-col md:flex-row w-full gap-20 md:gap-0">
          <div className="flex-1 flex items-center justify-center">
            <ContactCard />
          </div>
          <div className="flex-1 flex flex-col">
            <SubHeader className="text-3xl mb-10">
              <strong className="text-symbol-500">Chat</strong> with me!
            </SubHeader>
            <div className="flex flex-col p-4 gap-y-4">
              <span className="font-semibold text-2xl">커피챗 함께 하기</span>
              <a className="text-sm">
                궁금한 점이 있으시다면 가볍게 같이 커피챗을 나누어 보아요.
                <br />
                이메일을 통해 커피챗을 희망하는 일자와 시간을 알려주세요! <br />
              </a>
              <ul className="list-disc text-xs text-zinc-400 dark:text-zinc-600 p-4">
                <li>
                  커피챗을 희망하는 개인 혹은 회사 대해 메일을 통해 간단하게
                  알려주세요.
                </li>
                <li>
                  24시간 이내에 커피챗 인증 코드와 함께 일정을 답변
                  드리겠습니다.
                </li>
                <li>커피챗이 끝난 이후 인증 코드는 만료됩니다.</li>
                <li>불분명한 의도의 커피챗 요청은 정중히 거절드립니다.</li>
              </ul>
              <div className="flex flex-col p-4 rounded-md border-[1px] bg-background border-zinc-200 dark:border-zinc-400 shadow-md">
                <span className="font-semibold mb-4">
                  커피챗 인증 코드를 받으셨나요 ?
                </span>
                <EnterChatButton />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default MainPage;
