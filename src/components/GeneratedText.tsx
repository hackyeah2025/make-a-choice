import React from 'react'
import "./GeneratedText.css"

const GeneratedText = ({ text, wordDelay = 0.1 }: { text: string, wordDelay?: number, [key: string]: any }) => {
  return (
    <>{text.split(" ").map((word, index) => {


        return (
            <>
                <span key={index} style={{
                    display: "inline-block",
                    opacity: 0,
                    transform: "translateY(20px)",
                    animation: "fadeIn 0.3s forwards",
                    animationDelay: `${index * wordDelay}s`,
                }}>{word}</span>
                {" "}
            </>
        );
    })}</>
  )
}

export default GeneratedText