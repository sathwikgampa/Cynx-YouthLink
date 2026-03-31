import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

async function testGemini() {
  const apiKey = "AIzaSyBw1pckeOXSWZAZju4cgmLGdFhmMdg8Gu8";
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
      ]
    });
    
    const prompt = `You are a warm, empathetic, and validating AI mental health companion named "Companion".
The user has chosen to join this space feeling: "depressed".
You are currently providing a private 1-on-1 safe space for them.

CRITICAL INSTRUCTIONS:
1. Speak compassionately and conversationally. Do not sound like an AI assistant.
2. Ask open-ended questions to keep them talking.
3. Validate their feelings.
4. Keep your responses extremely concise (1 to 3 sentences maximum) so it looks like a natural text message chat bubble.
5. NEVER include your name (e.g. "Companion:") at the beginning of your response. Give the raw message text only.
6. If they ask for professional medical help or show crisis signs, gently remind them you are an AI and suggest local hotlines.

Here is the chat log so far (read carefully to understand what they just said):
User: hello
User just sent the latest message.

Generate your next supportive, conversational reply to them:`;

    console.log("Sending request...");
    const result = await model.generateContent(prompt);
    console.log("Success! Response:");
    console.log(result.response.text());
  } catch (error) {
    console.error("FATAL ERROR CAUGHT:");
    console.error(error);
  }
}

testGemini();
