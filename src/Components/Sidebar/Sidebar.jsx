import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router";
const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  const { prevPrompt, setRecentPrompt, newChat, slugify } = useContext(Context);
  const navigate = useNavigate();

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);

    navigate(`/${slugify(prompt)}`);
  };
  return (
    //sidebar
    <div className="min-h-screen inline-flex flex-col bg-[#F0F4F9] justify-between py-[25px] px-[15px] ">
      {/* top */}
      <div>
        <img
          className="w-5 block ml-[10px] cursor-pointer"
          src={assets.menu_icon}
          alt=""
          onClick={() => setExtended((prev) => !prev)}
        />
        {/* newchat */}
        <div
          onClick={() => newChat()}
          className="mt-[50px] inline-flex items-center gap-2.5 bg-[#e6eaf1] text-[12px] text-gray-900 cursor-pointer rounded-[50px] py-2.5 px-[15px]"
        >
          <img className="w-5" src={assets.plus_icon} />
          {extended && <p className="text-[15px] text-gray-600">New Chat</p>}
        </div>
        {/* recent */}
        {extended ? (
          <div className="flex flex-col text-start root">
            <p className="mt-7.5 mb-5 ">Recent</p>
            {prevPrompt.map((item, i) => (
              <div
                onClick={() => loadPrompt(item.prompt)}
                key={i}
                className="flex items-center gap-2.5 p-2.5 pr-10 rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]"
              >
                <img className="w-5" src={assets.message_icon} alt="" />
                <p>
                  {item.length > 18
                    ? `${item?.prompt.slice(0, 18)}...`
                    : item?.prompt}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* bottom */}
      <div className="flex flex-col">
        {/* bottmitem */}
        <div className="pr-10 cursor-pointer flex items-center gap-2.5 p-2.5  rounded-[50px] text-[#282828] hover:bg-[#e2e6eb]">
          <img className="w-5" src={assets.question_icon} alt="" />
          {extended && <p>Help</p>}
        </div>

        <div className="flex items-center gap-2.5 p-2.5 pr-10 rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
          <img className="w-5" src={assets.history_icon} alt="" />
          {extended && <p>Activity</p>}
        </div>

        <div className="flex items-center gap-2.5 p-2.5 pr-10 rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
          <img className="w-5" src={assets.setting_icon} alt="" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
