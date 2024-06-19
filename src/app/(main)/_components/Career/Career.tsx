"use client";

import { useRef, useState } from "react";
import CareerStepView from "./CareerStepView";
import CareerTab from "./CareerTab";
import { StepWrapper } from "@/components";

const CAREER_DATA = [
  {
    year: 2015,
    data: [
      { date: "2015.03", content: "경상국립대학교 컴퓨터과학과 학부 입학" },
    ],
  },
  {
    year: 2022,
    data: [
      { date: "2022.03", content: "DXDATA 입사 - 프론트엔드 부분" },
      {
        date: "2022.06 - 2022.08",
        content: "삼성 전자 스마트 팩토리 사업 참여 (Unity 스크립트 유지보수)",
      },
      {
        date: "2022.08",
        content: "경상국립대학교 컴퓨터과학과 학부 졸업",
      },
      {
        date: "2022.08 - 2022.10",
        content: "사내 Smary Buoy 사업 데모 앱 FE 개발 (ReactNative)",
      },
      {
        date: "2022.12 - 2022.05",
        content:
          "한화오션 3D 자제 관제 시스템 시범 사업 BE 개발 (Nest.js, Sub PM)",
      },
    ],
  },
  {
    year: 2023,
    data: [
      {
        date: "2023.06",
        content: "한화오션 3D 자제 관제 시스템 시범 사업 BE 인수인계",
      },
      {
        date: "2023.09",
        content: "프로그래머스 데브코스 프론트엔드 5기 합류",
      },
      {
        date: "2023.12",
        content: "데브코스 프로젝트 Looky FE 개발 (React, 기술 리더)",
      },
    ],
  },
  {
    year: 2024,
    data: [
      {
        date: "2024.01 - 2024.03",
        content:
          "데브코스 프로젝트 마실가실 FE 개발 (Next.js, PL 및 기술 리더)",
      },
      {
        date: "2024.03",
        content: "프로그래머스 데브코스 프론트엔드 5기 수료",
      },
    ],
  },
];

const Career = () => {
  const [focusedStep, setFocusedStep] = useState(0);
  const prevFocusedStep = useRef(focusedStep);

  const stepViews = CAREER_DATA.map((data, index) => (
    <CareerStepView key={index} data={data.data} />
  ));

  return (
    <div className="flex mx-auto">
      <CareerTab
        data={CAREER_DATA}
        focusedStep={focusedStep}
        prevFocusedStep={prevFocusedStep}
        setFocusedStep={setFocusedStep}
      />
      <StepWrapper
        focusedStep={focusedStep}
        prevFocusedStep={prevFocusedStep.current}
        direction="vertical"
        stepViews={stepViews}
      />
    </div>
  );
};

export default Career;
