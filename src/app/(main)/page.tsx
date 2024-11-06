"use client";

import { TAB_MAP } from "@/constants/navigator";

import { Section } from "./_components";
import { About, Contact, Home, Project } from "./_sections";

const MainPage = () => {
  return (
    <div className="relative flex flex-col md:px-0">
      <Section
        id={TAB_MAP[0].contant} // home
        index={0}
        className="h-[200dvh]"
      >
        <Home />
      </Section>

      <Section
        id={TAB_MAP[1].contant} // about
        index={1}
        className="h-[2000dvh]"
      >
        <About />
      </Section>

      <Section
        id={TAB_MAP[2].contant} // project
        index={2}
        className="h-[800dvh]"
      >
        <Project />
      </Section>

      <Section
        id={TAB_MAP[4].contant} // contact
        index={4}
      >
        <Contact />
      </Section>
    </div>
  );
};

export default MainPage;
