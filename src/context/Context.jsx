import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { generate } from "../config/ai";

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
    if (!prompt?.trim()) return;

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);

    const slug = slugify(prompt);

    try {
      const response = await generate(prompt);
      setResultData(response);

      setPrevPrompt((prev) => {
        const alreadyExists = prev.some((entry) => entry.slug === slug);
        if (alreadyExists) return prev;

        const newEntry = { prompt, resultData: response, slug };
        return [...prev, newEntry];
      });
    } catch (err) {
      setResultData("❌ Failed to fetch response.");
    } finally {
      setLoading(false);
    }
  };

  // Load prompts from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("prompts");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setPrevPrompt(parsed);
        }
      } catch (e) {
        console.error("Invalid JSON in localStorage");
      }
    }
  }, []);

  // Save prompts to localStorage on every update
  useEffect(() => {
    localStorage.setItem("prompts", JSON.stringify(prevPrompt));
  }, [prevPrompt]);

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
