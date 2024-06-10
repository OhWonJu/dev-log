import { TAB_MAP } from "@/constants/navigator";

import { Hero, Section } from "./_components";

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
        className="h-screen bg-symbol-500 text-secondary text-3xl font-bold"
      >
        About
      </Section>
      <Section
        id={TAB_MAP[2].contant} // project
        index={2}
        className="h-screen bg-symbol-300 text-secondary text-3xl font-bold"
      >
        Project
      </Section>
      <Section
        id={TAB_MAP[4].contant} // contact
        index={4}
        className="h-screen bg-symbol-100 text-secondary text-3xl font-bold"
      >
        Contact
      </Section>
    </div>
  );
};

export default MainPage;
