import React from "react";
import "./GeneratedText.css";

const Word = ({ children, delay}: { children: string; delay: number }) => {
  return (
    <span
      style={{
        display: "inline-block",
        opacity: 0,
        transform: "translateY(20px)",
        animation: "fadeIn 0.3s forwards",
        animationDelay: `${delay}s`,
      }}
    >
      {children}{" "}
    </span>
  );
};

const GeneratedText = ({
  children,
  wordDelay = 0.1,
}: {
  children: string;
  wordDelay?: number;
  [key: string]: any;
}) => {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    setCounter((prev) => prev + 1);
  }, [children]);

  return (
    <span key={counter} className="generated-text">
      {children.split(" ").map((word, index) => {
        return (
          <span key={index}>
            <Word delay={index * wordDelay}>
              {word}
            </Word>
            {" "}
          </span>
        );
      })}
    </span>
  );
};

export default GeneratedText;
