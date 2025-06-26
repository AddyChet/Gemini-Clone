import { createContext, useEffect, useState } from "react";
import { generate } from "../config/ai";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    if (!prompt || prompt.trim() === "") {
      console.warn("Prompt is empty. Skipping request.");
      return;
    }

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    setPrevPrompt(prev => [...prev, prompt])
    try {
    //   const response = await generate(prompt);

    //   setResultData(response);
    console.log("ok")
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
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
