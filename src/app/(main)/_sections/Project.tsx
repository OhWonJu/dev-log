"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Link2Icon } from "lucide-react";

import { fadeInUp } from "@/constants/animations";

import { Github } from "@/components/icons";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { AnimatedBox, MainHeader } from "../_components";

const order = {
  sectionFadeInStart: 0.09,
  sectonFadeInEnd: 0.1,
  projectScrollStart: 0.2,
  projectScrollEnd: 0.85,
  sectionFadeOutStart: 0.9,
  sectionFadeOutEnd: 0.91,
};

const content = [
  {
    title: "PLAYCE",
    description:
      "playce 는 connect your pysical albums 라는 슬로건의 개념을 구현하기 위한 Full-Stack 토이 프로젝트 입니다. \n우리의 공간 한 켠에 방치되어 있는 피지컬 앨범에 생명력을 불어 넣어줄 수 있는 방법이 없을까? 라는 의문에서 시작되었어요. \n\n MVP1 Released (2024-09-26)\n• HLS + M3U8 기반의 음원 스트리밍 \n • Flux 패턴 기반의 음원 재생 제어\n• KakaoPay 를 통한 결제 \n• 앨범 트랙 기반 큐, 플레이리스 생성 및 트랙 추가/제거",
    content: (
      <div className="relative flex items-center w-full h-full">
        <div className="relative w-full aspect-[1907/1516] overflow-hidden rounded-lg group">
          <Image
            src={"/projects/playce.png"}
            alt="PLAYCE"
            fill
            objectFit="contain"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-transparent group-hover:bg-zinc-700/50 group-hover:backdrop-blur-sm" />
          <div className="absolute top-0 left-0 w-full h-full justify-center items-center hidden group-hover:flex space-x-2">
            <Link
              href={"https://github.com/OhWonJu/playce-client"}
              target="_blank"
              className="block hover:bg-zinc-700 p-1 rounded-full"
            >
              <Github className="w-8 h-8 fill-white" />
            </Link>
            <Link
              href={"https://www.playce.kr/"}
              target="_blank"
              className="block hover:bg-zinc-700 p-1 rounded-full"
            >
              <Link2Icon className="w-8 h-8 stroke-white" />
            </Link>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "마실가실",
    description:
      "마실가실은 각자의 산책기록이 하나의 산책로가 되면 어떨까? 라는 아이디어에서 시작된 팀 프로젝트 입니다. \nGPS 기반으로 산책 경로를 기록하고, 원한다면 해당 기록을 산책로로 공개 할 수 있어요. \n또 산책로 게시글을 통해 산책 메이트를 모을 수 있고, 함께 산책할 수 있어요.",
    content: (
      <div className="relative flex items-center w-full h-full">
        <div className="relative w-full aspect-[1907/1516] overflow-hidden rounded-lg group">
          <Image
            src={"/projects/masil.png"}
            alt="마실가실"
            fill
            objectFit="contain"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-transparent group-hover:bg-zinc-700/50 group-hover:backdrop-blur-sm" />
          <div className="absolute top-0 left-0 w-full h-full justify-center items-center hidden group-hover:flex space-x-2">
            <Link
              href={
                "https://github.com/Team-SilverTown/Team-SilverTown-MasilGasil-FE"
              }
              target="_blank"
              className="block hover:bg-zinc-700 p-1 rounded-full"
            >
              <Github className="w-8 h-8 fill-white" />
            </Link>
            <Link
              href={"https://www.masilgasil.app/"}
              target="_blank"
              className="block hover:bg-zinc-700 p-1 rounded-full"
            >
              <Link2Icon className="w-8 h-8 stroke-white" />
            </Link>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Looky",
    description:
      "Looky 는 각자의 OOTD 를 공유하고 싶은 마음에 시작된 팀 프로젝트 입니다. \nOOTD 를 공유하면서 상품 태그를 남겨 서로의 애장탬을 공유할 수 있어요.",
    content: (
      <div className="relative flex items-center w-full h-full">
        <div className="relative w-full aspect-[1907/1516] overflow-hidden rounded-lg group">
          <Image
            src={"/projects/looky.png"}
            alt="looky"
            fill
            objectFit="contain"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-transparent group-hover:bg-zinc-700/50 group-hover:backdrop-blur-sm" />
          <div className="absolute top-0 left-0 w-full h-full justify-center items-center hidden group-hover:flex space-x-2">
            <Link
              href={"https://github.com/prgrms-fe-devcourse/FEDC5_looky_heejin"}
              target="_blank"
              className="block hover:bg-zinc-700 p-1 rounded-full"
            >
              <Github className="w-8 h-8 fill-white" />
            </Link>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Smary Buoy",
    description:
      "Smary Buoy 는 스마트 부표로부터 오는 여러 정보를 종합하여, 해양 양식 어민에게 도움이 되고자 시작된 프로젝트 입니다. \n여러 센서 정보를 통해 양식장 구역의 해양정보, 출하 시기 등에 대한 정보를 제공해요.",
    content: (
      <div className="relative flex items-center w-full h-full">
        <div className="relative w-full aspect-[1907/1516] overflow-hidden rounded-lg group">
          <Image
            src={"/projects/buoy.png"}
            alt="buoy"
            fill
            objectFit="contain"
          />
        </div>
      </div>
    ),
  },
];

const Project = () => {
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

  const projectFocus = useTransform(
    scrollYProgress,
    [order.projectScrollStart, order.projectScrollEnd],
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
          <MainHeader>Project</MainHeader>
          <StickyScroll content={content} scrollYProgress={projectFocus} />
        </AnimatedBox>
      </div>
    </div>
  );
};

export default Project;
