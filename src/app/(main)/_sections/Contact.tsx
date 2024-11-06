"use client";

import React, { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

import { fadeInUp, ReciptAnimation } from "@/constants/animations";

import {
  AnimatedBox,
  ContactCard,
  EnterChatButton,
  MainHeader,
  SubHeader,
} from "../_components";

const order = {
  sectionFadeInStart: 0.8,
  sectonFadeInEnd: 0.81,
};

const Contact = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const sectionOpacity = useTransform(
    scrollYProgress,
    [order.sectionFadeInStart, order.sectonFadeInEnd],
    [0, 1]
  );

  return (
    <div ref={targetRef} className="h-full">
      <div className="sticky top-1/2 mx-auto w-[90%] md:w-[80%] lg:max-w-[1200px] h-[90vh]">
        <AnimatedBox
          variants={fadeInUp}
          motionValue={sectionOpacity}
          className="absolute top-0 flex flex-col items-center w-full h-full"
        >
          <MainHeader>Contact</MainHeader>
          <div className="flex flex-col md:flex-row w-full gap-20 md:gap-0">
            <div className="flex-[2] md:flex-1 flex items-center justify-center overflow-hidden">
              <AnimatedBox
                variants={ReciptAnimation}
                style={{ y: "-100%" }}
                motionValue={sectionOpacity}
              >
                <ContactCard />
              </AnimatedBox>
            </div>
            <div className="flex-1 flex flex-col pb-20 sm:pb-0">
              <SubHeader className="text-3xl mb-10">
                <strong className="text-symbol-500">Chat</strong> with me!
              </SubHeader>
              <div className="flex flex-col p-4 gap-y-4">
                <span className="font-semibold text-2xl">커피챗 함께 하기</span>
                <a className="text-sm">
                  궁금한 점이 있으시다면 가볍게 같이 커피챗을 나누어 보아요.
                  <br />
                  이메일을 통해 커피챗을 희망하는 일자와 시간을 알려주세요!{" "}
                  <br />
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
        </AnimatedBox>
      </div>
    </div>
  );
};

export default Contact;
