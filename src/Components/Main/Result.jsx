import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { assets } from "../../assets/assets";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import { PiSealQuestionFill } from "react-icons/pi";
import { Context } from "../../context/Context";

const Result = () => {
  const navigate = useNavigate();
  const { prevPrompt } = useContext(Context);
  const { prompt } = useParams(); // url that matches with the slug
  const data = prevPrompt.find((entry) => entry.slug === prompt);

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      <div className="flex items-cebter justify-between text-[22px] p-5 text-[#585858]">
        <p>Gemini</p>
        <img className="w-10 rounded-[50px]" src={assets.user_icon} alt="" />
      </div>

      <div className="max-w-[900px] mx-auto">
        <div className="px-[5%] max-h-[70vh] overflow-y-scroll result">
          <div className="my-10 flex items-center gap-5">
            <span>
              <PiSealQuestionFill size={30} className="text-[#6184D5]" />
            </span>
            {data?.image ? <div className="w-full flex flex-col items-end justify-center gap-2">
              <img src={data?.image} alt="" className="w-36 h-36 rounded-md border border-gray-100/40 shadow p-4"/>
              <p className="font-semibold shadow border border-gray-100 px-3 py-2 rounded-md">{data?.prompt}</p>
            </div> : 
            <p className="font-semibold shadow border border-gray-100 px-3 py-2 rounded-md">{data?.prompt}</p>
            }
          </div>
          <div className="flex items-start gap-5">
            <img className="w-10 " src={assets.gemini_icon} alt="" />

            <div className="prose result md prose-invert leading-8 space-y-7">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ ...props }) => (
                    <h1 className="text-3xl font-bold mt-4 mb-2" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2
                      className="text-2xl font-semibold mt-4 mb-2"
                      {...props}
                    />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="text-xl font-medium mt-4 mb-2" {...props} />
                  ),
                }}
              >
                {data?.resultData}
             
              </ReactMarkdown>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full max-w-[900px] px-5 m-auto">
          <p className="text-xs my-3.5 mx-auto text-center font-light">
            Gemini may display inaccurate info, including about people, so
            double-check its response. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
