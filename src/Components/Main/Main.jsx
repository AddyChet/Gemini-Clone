import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData } =
    useContext(Context);

  const [displayText, setDisplayText] = useState("");

  const handleInputSent = () => {
    const prompt = displayText;
    onSent(prompt);
    setDisplayText("");
  };

  const handleInputChange = (e) => {
    setDisplayText(e.target.value);
  };

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      <div className="flex items-cebter justify-between text-[22px] p-5 text-[#585858]">
        <p>Gemini</p>
        <img className="w-10 rounded-[50px]" src={assets.user_icon} alt="" />
      </div>

      <div className="max-w-[900px] m-auto">
        {!showResult ? (
          <>
            <div className="my-12.5 mx-0 text-5xl text-[#c4c7c5] font-medium p-5">
              <p>
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-red-500 bg-clip-text text-transparent">
                  Hello Adarsh,
                </span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3.5 p-5">
              <div className="h-50 p-4 bg-[#f0f4f9] relative rounded-[10px] cursor-pointer hover:bg-[#dfe4ea]">
                <p className="text-[#585858] text-lg">
                  Suggest beautiful places to see on an upcoming road trip
                </p>
                <img
                  className="w-8.5 p-1.5 absolute bg-white rounded-[20px] bottom-2.5 right-2.5"
                  src={assets.compass_icon}
                  alt=""
                />
              </div>
              <div className="h-50 p-4 bg-[#f0f4f9] relative rounded-[10px] cursor-pointer hover:bg-[#dfe4ea]">
                <p className="text-[#585858] text-lg">
                  Briefly summarize this concept: Urban Planning
                </p>
                <img
                  className="w-8.5 p-1.5 absolute bg-white rounded-[20px] bottom-2.5 right-2.5"
                  src={assets.bulb_icon}
                  alt=""
                />
              </div>
              <div className="h-50 p-4 bg-[#f0f4f9] relative rounded-[10px] cursor-pointer hover:bg-[#dfe4ea]">
                <p className="text-[#585858] text-lg">
                  How to make Tea. Steps to make!
                </p>
                <img
                  className="w-8.5 p-1.5 absolute bg-white rounded-[20px] bottom-2.5 right-2.5"
                  src={assets.message_icon}
                  alt=""
                />
              </div>
              <div className="h-50 p-4 bg-[#f0f4f9] relative rounded-[10px] cursor-pointer hover:bg-[#dfe4ea]">
                <p className="text-[#585858] text-lg">
                  Improve the readibility of the code below
                </p>
                <img
                  className="w-8.5 p-1.5 absolute bg-white rounded-[20px] bottom-2.5 right-2.5"
                  src={assets.code_icon}
                  alt=""
                />
              </div>
            </div>
          </>
        ) : (
          <div className="px-[5%] max-h-[70vh] overflow-y-scroll result">
            <div className="my-10 flex items-center gap-5">
              <img
                className="w-10 rounded-full"
                src={assets.user_icon}
                alt=""
              />
              <p>{recentPrompt}</p>
            </div>
            <div className="flex items-start gap-5">
              <img className="w-10 " src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="w-full flex flex-col gap-2.5 loader">
                  <hr className="h-5 rounded-md border-none bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px]" />
                  <hr className="h-5 rounded-md border-none bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px]" />
                  <hr className="h-5 rounded-md border-none bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px]" />
                </div>
              ) : (
                <div className="prose prose-invert max-w-none leading-relaxed space-y-4">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {resultData}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full max-w-[900px] px-5 m-auto">
          <div className="flex items-center justify-between gap-5 bg-[#f0f4f9] sm:py-2.5 sm:px-5 py-[5px] px-2.5 rounded-[50px]">
            <input
              type="text"
              onChange={handleInputChange}
              value={displayText}
              placeholder="Enter a prompt here"
              className="sm:flex-1 bg-transparent border-none outline-none p-2 text-lg flex-none w-[150px] sm:w-full"
            />
            <div className="flex gap-3.5 items-center">
              <img
                className="sm:w-6 w-5 cursor-pointer"
                src={assets.gallery_icon}
                alt=""
              />
              <img
                className="sm:w-6 w-5 cursor-pointer"
                src={assets.mic_icon}
                alt=""
              />
              {displayText ? (
                <img
                  onClick={handleInputSent}
                  className="sm:w-6 w-5 cursor-pointer"
                  src={assets.send_icon}
                  alt=""
                />
              ) : null}
            </div>
          </div>

          <p className="text-xs my-3.5 mx-auto text-center font-light">
            Gemini may display inaccurate info, including about people, so
            double-check its response. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
