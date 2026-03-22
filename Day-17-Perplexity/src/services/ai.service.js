import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

export async function testAi() {  
    geminiModel.invoke("What is the best way to learn a new skill? 10 words").then((response) => {
        console.log(response.content); 
    })
}

