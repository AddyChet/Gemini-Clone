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
  const result = completion.choices[0].message.content;
  return result;

  
}


export async function generateImage(prompt, url) {
  const completion = await openai.chat.completions.create({
    model: "mistralai/mistral-small-3.2-24b-instruct:free",
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": prompt
          },
          {
            "type": "image_url",
            "image_url": {
              "url": url
            }
          }
        ]
      }
    ],
    
  });

  console.log(completion.choices[0].message);
  const result = completion.choices[0].message.content
  return result;
}