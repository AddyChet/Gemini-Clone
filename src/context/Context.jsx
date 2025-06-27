import { createContext, useState } from "react";
import { generate } from "../config/ai";
import { useNavigate } from "react-router";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    navigate("/");
  };

  const onSent = async (prompt) => {
    if (!prompt || prompt.trim() === "") {
      console.warn("Prompt is empty. Skipping request.");
      return;
    }

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);

    try {
      const response = await generate(prompt);
      setResultData(response);

      setPrevPrompt((prev) =>
        prev.some((entry) => entry.slug === slugify(prompt))
          ? prev
          : [
              ...prev,
              {
                prompt,
                resultData: response,
                slug: slugify(prompt),
              },
            ]
      );
    } catch (err) {
      setResultData("❌ Failed to fetch response.");
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    newChat,
    slugify,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
