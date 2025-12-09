"use client";

import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { type WorkshopSlide } from "@/lib/types/content";

type SlideProps = {
  slide: WorkshopSlide;
};

export default function Slide({ slide }: SlideProps) {
  return (
    <div className="flex flex-col h-full justify-center items-center p-8">
      <h1 className="text-5xl font-bold mb-8 text-center">{slide.title}</h1>
      <div className="text-2xl space-y-6 max-w-5xl w-full">
        {slide.content.map((item, idx) => {
          if (item.type === "text") {
            return (
              <p key={idx} className="text-center leading-relaxed">
                {item.value}
              </p>
            );
          }

          if (item.type === "code") {
            return (
              <div key={idx} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language={item.language || "typescript"}
                  style={oneLight}
                  customStyle={{
                    margin: 0,
                    padding: "1.5rem",
                    fontSize: "1.125rem",
                    lineHeight: "1.75",
                    background: "transparent",
                  }}
                >
                  {item.value}
                </SyntaxHighlighter>
              </div>
            );
          }

          if (item.type === "image") {
            return (
              <div key={idx} className="flex justify-center">
                <Image
                  src={item.value}
                  alt={item.alt || slide.title}
                  width={800}
                  height={600}
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}

