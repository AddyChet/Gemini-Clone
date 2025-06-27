import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(import.meta.env.VITE_HF_TOKEN);

// Helper to remove <think>...</think> block
function removeThinkBlock(text) {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
}

export async function generate(prompt) {
  const chatCompletion = await client.chatCompletion({
    provider: "fireworks-ai",
    model: "deepseek-ai/DeepSeek-R1-0528",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let result = chatCompletion.choices[0].message.content;

  // Cleaning the <think> block from result
  result = removeThinkBlock(result);
  return result;
}
