import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPEN_AI_API,
  dangerouslyAllowBrowser: true,
});

export async function generate(prompt) {
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1:free",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log(completion.choices[0].message);
  const result = completion.choices[0].message.content;
  return result;
}
