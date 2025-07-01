import React, { useContext, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { BsX } from "react-icons/bs";

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData } =
    useContext(Context);

  const [fileObj, setFileObj] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();
  const [displayText, setDisplayText] = useState("");

  const handleInputSent = () => {
    const prompt = displayText;
    onSent(prompt);
    setDisplayText("");
  };

  const handleInputChange = (e) => {
    setDisplayText(e.target.value);
  };

  const handlePromptCard = (e) => {
    setDisplayText(e.target.innerText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const prompt = displayText;
      onSent(prompt);
      setDisplayText("");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileObj(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFileObj(null);
      setPreviewUrl(null);
    }
  };

  const handleDeleteImg = () => {
    setFileObj(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Clean up the object URL
      setPreviewUrl(null);
    }
    // Reset the file input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      <div className="flex items-cebter justify-between text-[22px] p-5 text-[#585858]">
        <p>Gemini</p>
        <img className="w-10 rounded-[50px]" src={assets.user_icon} alt="" />
      </div>

      <div className="max-w-[900px] m-auto">
        {/* add a dynamic prompt based on users generation */}
        {!showResult ? (
          <>
            <div className="lg:my-8.5 md:my-4.5 my-1 mx-0 text-5xl text-[#c4c7c5] font-medium p-5">
              <p>
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-red-500 bg-clip-text text-transparent">
                  Hello Adarsh,
                </span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3.5 p-5">
              <div
                className="h-50 p-4 bg-[#f0f4f9] relative rounded-[10px] cursor-pointer hover:bg-[#dfe4ea]"
                onClick={handlePromptCard}
              >
                <p className="text-[#585858] text-lg">
                  What if TypeScript could predict your mood? How would its
                  types look?
                </p>
                <img
                  className="w-8.5 p-1.5 absolute bg-white rounded-[20px] bottom-2.5 right-2.5"
                  src={assets.compass_icon}
                  alt=""
                />
              </div>
              <div
                className="h-50 p-4 bg-[#f0f4f9] relative rounded-[10px] cursor-pointer hover:bg-[#dfe4ea]"
                onClick={handlePromptCard}
              >
                <p className="text-[#585858] text-lg">
                  Describe a quiet moment in nature using only UI component
                  metaphors.
                </p>
                <img
                  className="w-8.5 p-1.5 absolute bg-white rounded-[20px] bottom-2.5 right-2.5"
                  src={assets.bulb_icon}
                  alt=""
                />
              </div>
              <div
                className="h-50 p-4 bg-[#f0f4f9] relative rounded-[10px] cursor-pointer hover:bg-[#dfe4ea]"
                onClick={handlePromptCard}
              >
                <p className="text-[#585858] text-lg">
                  Invent a Tailwind class name that sounds like a martial arts
                  move.
                </p>
                <img
                  className="w-8.5 p-1.5 absolute bg-white rounded-[20px] bottom-2.5 right-2.5"
                  src={assets.message_icon}
                  alt=""
                />
              </div>
              <div
                className={`h-50 p-4 bg-[#f0f4f9] relative rounded-[10px] cursor-pointer hover:bg-[#dfe4ea] ${previewUrl ? "mb-20" : "mb-4"}`}
                onClick={handlePromptCard}
              >
                <p className="text-[#585858] text-lg">
                  Design a loading animation for an alien spaceship dashboard.
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
                <div className="prose result md prose-invert leading-8 space-y-4">
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
      
            
      
        <div className="absolute bottom-0 w-full max-w-[900px] px-5 ">
          <div className="relative  bg-[#f0f4f9] sm:py-5 sm:px-5 py-[5px] px-2.5 rounded-[50px] ">
            <div>
              {previewUrl && (
              <div className="w-18 h-18 md:w-14 md:h-14 bottom-16 flex">
                <img className="w-full rounded-md" src={previewUrl} />{" "}
                <button className="absolute text-red-800" onClick={handleDeleteImg}>
                  <BsX
                    className="bg-white/80 rounded-full hover:scale-110 cursor-pointer transition duration-300"
                  />
                </button>
              </div>
            )}
            </div>
            <div className="flex items-center justify-between gap-5"><input
              type="text"
              onChange={handleInputChange}
              value={displayText}
              placeholder="Enter a prompt here"
              className="sm:flex-1 mt-1 bg-transparent border-none outline-none p-2 text-lg flex-none w-[150px] sm:w-full"
            />
            <div className="flex gap-3.5 items-center">
              <label htmlFor="img-upload">
                <img
                  className="sm:w-6 w-5 cursor-pointer"
                  src={assets.gallery_icon}
                  alt=""
                />
                <input
                  id="img-upload"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  ref={fileInputRef} // Attach ref to clear the input
                  onChange={handleImageUpload}
                />
              </label>

              <img
                className="sm:w-6 w-5 cursor-pointer"
                src={assets.mic_icon}
                alt=""
              />
              {displayText ? (
                <img
                  onClick={handleInputSent}
                  onKeyDown={handleKeyDown}
                  className="sm:w-6 w-5 cursor-pointer"
                  src={assets.send_icon}
                  alt=""
                />
              ) : null}
            </div></div>
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
