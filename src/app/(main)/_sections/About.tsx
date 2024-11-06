"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { fadeIn, fadeInDelay300, fadeInUp } from "@/constants/animations";

import { PinContainer } from "@/components/ui/3d-pin";
import {
  AnimatedBox,
  Career,
  MainHeader,
  ProfileCard,
  SubHeader,
} from "../_components";
import StackList from "../_components/StackList";

const order = {
  sectionFadeInStart: 0.039,
  sectonFadeInEnd: 0.04,
  cardFilpStart: 0.1,
  cardFiplEnd: 0.11,
  step1FadeOutStart: 0.17,
  step1FadeOutEnd: 0.18,
  step2FadeInStart: 0.2,
  step2FadeInEnd: 0.21,
  step2FadeOutStart: 0.32,
  step2FadeOutEnd: 0.33,
  step3FadeInStart: 0.35,
  step3FadeInEnd: 0.36,
  careerXMoveTo0: 0.36,
  careerXMoveTo100: 0.68,
  step3FadeOutStart: 0.67,
  step3FadeOutEnd: 0.68,
  step4FadeInStart: 0.7,
  step4FadeInEnd: 0.71,
  step4FadeOutStart: 0.81,
  step4FadeOutEnd: 0.82,
  step5FadeInStart: 0.84,
  step5FadeInEnd: 0.85,
  sectionFadeOutStart: 0.95,
  sectionFadeOutEnd: 0.96,
};

const About = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const sectionOpacity = useTransform(
    scrollYProgress,
    [
      order.sectionFadeInStart,
      order.sectonFadeInEnd,
      order.sectionFadeOutStart,
      order.sectionFadeOutEnd,
    ],
    [0, 1, 1, 0]
  );

  const whoIsTheChefOpacity = useTransform(
    scrollYProgress,
    [
      order.sectionFadeInStart,
      order.sectonFadeInEnd,
      order.step1FadeOutStart,
      order.step1FadeOutEnd,
    ],
    [0, 1, 1, 0]
  );

  const showCard = useTransform(
    scrollYProgress,
    [order.sectionFadeInStart, order.sectonFadeInEnd],
    [0, 1]
  );

  const flip = useTransform(
    scrollYProgress,
    [order.cardFilpStart, order.cardFiplEnd],
    [0, 1]
  );

  const showDevStack = useTransform(
    scrollYProgress,
    [
      order.step2FadeInStart,
      order.step2FadeInEnd,
      order.step2FadeOutStart,
      order.step2FadeOutEnd,
    ],
    [0, 1, 1, 0]
  );

  const careerOpacity = useTransform(
    scrollYProgress,
    [
      order.step3FadeInStart,
      order.step3FadeInEnd,
      order.step3FadeOutStart,
      order.step3FadeOutEnd,
    ],
    [0, 1, 1, 0]
  );
  const careerX = useTransform(
    scrollYProgress,
    [order.careerXMoveTo0, order.careerXMoveTo100],
    ["100%", "-100%"]
  );

  const aboutThisWeb = useTransform(
    scrollYProgress,
    [order.step4FadeInStart, order.step4FadeInEnd],
    [0, 1]
  );
  const conceptImageOpacity = useTransform(
    scrollYProgress,
    [
      order.step4FadeInStart,
      order.step4FadeInEnd,
      order.step4FadeOutStart,
      order.step4FadeOutEnd,
    ],
    [0, 1, 1, 0]
  );
  const conceptInfoOpacity = useTransform(
    scrollYProgress,
    [order.step5FadeInStart, order.step5FadeInEnd],
    [0, 1]
  );

  return (
    <div ref={targetRef} className="h-full">
      <div className="sticky top-1/2 w-full -translate-y-1/2 h-[80vh]">
        <AnimatedBox
          variants={fadeInUp}
          motionValue={sectionOpacity}
          className="absolute top-0 flex flex-col items-center w-full h-full"
        >
          <MainHeader>About</MainHeader>
          <div className="relative w-full h-full">
            <AnimatedBox
              variants={fadeInDelay300}
              motionValue={whoIsTheChefOpacity}
              className="absolute top-0 w-full h-full flex flex-col items-center justify-center"
            >
              <SubHeader className="absolute top-0">
                Who is the <strong className="text-symbol-500">Chef?</strong>
              </SubHeader>
              <AnimatedBox
                variants={fadeInDelay300}
                motionValue={showCard}
                className="flex justify-center w-[90%] md:w-full"
              >
                <ProfileCard motionValue={flip} />
              </AnimatedBox>
            </AnimatedBox>

            <AnimatedBox
              variants={fadeIn}
              motionValue={showDevStack}
              className="absolute top-0 w-full  h-full flex flex-col items-center justify-center"
            >
              <SubHeader className="absolute top-0">
                <strong className="text-symbol-500">Chef&apos;s</strong> Dev
                Stack
              </SubHeader>
              <StackList motionValue={showDevStack} />
            </AnimatedBox>

            <AnimatedBox
              variants={fadeIn}
              motionValue={careerOpacity}
              className="absolute top-0 w-full h-full flex flex-col items-center justify-center"
            >
              <SubHeader className="absolute top-0">Career</SubHeader>
              <motion.div style={{ x: careerX, willChange: "transform" }}>
                <Career />
              </motion.div>
            </AnimatedBox>

            <AnimatedBox
              variants={fadeIn}
              motionValue={aboutThisWeb}
              className="absolute top-0 w-full h-full flex flex-col items-center justify-center"
            >
              <SubHeader className="absolute top-0">
                About this <strong className="text-symbol-500">web page</strong>
              </SubHeader>

              <AnimatedBox
                variants={fadeInDelay300}
                motionValue={conceptImageOpacity}
                className="absolute top-1/2 -translate-y-1/2 h-[50vh]"
              >
                <PinContainer
                  containerClassName="h-[50%] md:h-[100%] aspect-[3/2]"
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
              </AnimatedBox>
              <AnimatedBox
                variants={fadeIn}
                motionValue={conceptInfoOpacity}
                className="absolute top-1/2 -translate-y-1/2"
              >
                <div className="flex flex-col items-center">
                  <div className="text-center text-2xl sm:text-3xl md:text-4xl">
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
                    className="mt-3"
                  >
                    <span className="text-zinc-400 dark:text-zinc-600 text-xs font-semibold">
                      motive by Cheeze - recipe!
                    </span>
                  </Link>
                </div>
              </AnimatedBox>
            </AnimatedBox>
          </div>
        </AnimatedBox>
      </div>
    </div>
  );
};

export default About;
