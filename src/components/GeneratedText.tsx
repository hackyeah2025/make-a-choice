import React from "react";
import "./GeneratedText.css";

const GeneratedText = ({
  children,
  wordDelay = 0.1,
}: {
  children: string;
  wordDelay?: number;
  [key: string]: any;
}) => {
  return (
    <>
      {children.split(" ").map((word, index) => {
        return (
          <>
            <span
              key={index}
              style={{
                display: "inline-block",
                opacity: 0,
                transform: "translateY(20px)",
                animation: "fadeIn 0.3s forwards",
                animationDelay: `${index * wordDelay}s`,
              }}
            >
              {word}
            </span>
            {" "}
          </>
        );
      })}
    </>
  );
};

export default GeneratedText;
