"use client";

import { useRef, useState } from "react";

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
      { date: "2022.03", content: "DXDATA 입사 - 프론트엔드 직무" },
      {
        date: "2022.06 - 2022.08",
        content: "삼성전자 스마트 팩토리 사업 참여 \n(Unity 스크립트 유지보수)",
      },
      {
        date: "2022.08",
        content: "경상국립대학교 컴퓨터과학과 학부 졸업",
      },
      {
        date: "2022.08 - 2022.10",
        content: "사내 Smary Buoy 사업 앱 FE 개발 \n(ReactNative)",
      },
      {
        date: "2022.12 -",
        content:
          "한화오션 3D 자제 관제 시스템 시범 사업 BE 개발 \n(Nest.js, Sub PM)",
      },
    ],
  },
  {
    year: 2023,
    data: [
      {
        date: "- 2023.05",
        content:
          "한화오션 3D 자제 관제 시스템 시범 사업 BE 개발 \n(Nest.js, Sub PM)",
      },
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
        content: "데브코스 프로젝트 Looky FE 개발 \n(React, 기술 리더)",
      },
    ],
  },
  {
    year: 2024,
    data: [
      {
        date: "2024.01 - 2024.03",
        content:
          "데브코스 프로젝트 마실가실 FE 개발 \n(Next.js, PL 및 기술 리더)",
      },
      {
        date: "2024.03",
        content: "프로그래머스 데브코스 프론트엔드 5기 수료",
      },
      {
        date: "2024.06",
        content: "Portfolio & Dev blog Web \n'Recipe' Release",
      },
      {
        date: "2024.09",
        content: "음원 스트리밍 토이프로젝트 \n'PLAYCE' MVP 버전 Release",
      },
    ],
  },
];

const Career = () => {
  return (
    <div className="flex space-x-10 overflow-hidden">
      {CAREER_DATA.map(({ year, data }, index) => (
        <div key={index} className="w-[350px] sm:w-[500px] space-y-8">
          <strong className="font-extrabold text-5xl">{year}</strong>
          <ul className="space-y-4">
            {data.map(({ date, content }, index) => (
              <li className="flex flex-col" key={index}>
                <h4 className="font-bold text-lg text-zinc-400 dark:text-zinc-600">
                  {date}
                </h4>
                <p className="font-semibold text-base whitespace-pre-line">
                  {content}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Career;
