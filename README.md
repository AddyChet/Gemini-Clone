# 🚀 Gemini Clone Setup Guide (with DeepSeek R1 Integration)

Follow these steps to install, configure, and run your Gemini Clone project using DeepSeek R1 via Hugging Face.

---

## 🔧 Clone the Repository

```bash
git clone https://github.com/AddyChet/Gemini-Clone.git
cd Gemini-Clone
```

## 📦 Install Dependencies
```bash
npm install
```

###🔐 Create a Hugging Face API Token
1.Visit huggingface.co/settings/tokens
2.Click New Token and give it a name (e.g., deepseek-r1)
3. Set it to have read access
4. Copy the generated token

### 🌿Setup Environment Variables
In the root of your project, create a .env file and add the token shown below:

```bash
touch .env
VITE_HF_TOKEN=your_token_here
```

### ▶️ Start the Dev Server
```bash
   npm run dev
```
