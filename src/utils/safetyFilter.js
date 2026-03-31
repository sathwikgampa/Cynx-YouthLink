import { GoogleGenerativeAI, SchemaType, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { Filter } from 'bad-words';

// Fallback filter fortified with custom terms
const fallbackFilter = new Filter();
fallbackFilter.addWords('kill', 'suicide', 'die', 'murder');

const stripPIIFallback = (text) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  let maskedText = text.replace(emailRegex, '[EMAIL REMOVED]');
  const phoneRegex = /\b(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})\b/g;
  return maskedText.replace(phoneRegex, '[PHONE REMOVED]');
};

/**
 * AI Mod: Categorizes the message and returns a structural evaluation.
 */
export const evaluateMessageWithAI = async (rawText) => {
  if (!rawText || typeof rawText !== 'string') return { isSafe: true, text: rawText };

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBw1pckeOXSWZAZju4cgmLGdFhmMdg8Gu8";
    if (!apiKey) throw new Error("Missing API Key");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            category: {
              type: SchemaType.STRING,
              description: "Must be exactly one of: 'GOOD', 'EXPLICIT', 'PERSONAL', or 'VIOLENCE'",
            },
            summary: {
              type: SchemaType.STRING,
              description: "A short 1-sentence summary of the message's content."
            },
            isSafe: {
              type: SchemaType.BOOLEAN,
              description: "True if category is 'GOOD'. False if 'EXPLICIT', 'PERSONAL', or 'VIOLENCE'."
            }
          },
          required: ["category", "summary", "isSafe"]
        }
      }
    });

    const prompt = `You are an extremely rigid mental health chat moderator. Analyze this message and categorize it. 
CRITICAL RULE 1: If the message contains any mention of self-harm, suicide, or hurting anyone (e.g., words like 'kill', 'suicide', 'die'), categorize it as 'VIOLENCE'.
CRITICAL RULE 2: If the message shares ANY personal details, names, social media/gaming handles (e.g., @username, Instagram, Snapchat, Discord, Snap), phone numbers, or email addresses, categorize it as 'PERSONAL'.
CRITICAL RULE 3: If the message has swear words, categorize it as 'EXPLICIT'.
Otherwise, categorize it as 'GOOD'.
Message: "${rawText}"`;

    const result = await model.generateContent(prompt);
    
    // Check if the API itself blocked it before reaching our logic
    if (result.response.promptFeedback?.blockReason) {
       return { isSafe: false, category: 'VIOLENCE', summary: 'Message blocked by core safety API.', text: rawText };
    }

    let rawOutput = result.response.text().trim();
    
    // Strip markdown formatting if Gemini wrapped it in ```json ... ```
    if (rawOutput.startsWith('```')) {
      rawOutput = rawOutput.replace(/^```(json)?/, '').replace(/```$/, '').trim();
    }

    const evaluation = JSON.parse(rawOutput);
    
    // Hard override: the ONLY way a message is safe is if the AI strictly categorized it as GOOD.
    // This prevents the AI from accidentally setting isSafe: true while categorizing it as PERSONAL.
    evaluation.isSafe = (evaluation.category === 'GOOD');
    
    // Attach the original text to the payload
    evaluation.text = rawText;
    return evaluation;
    
  } catch (error) {
    console.error("AI Evaluation Error (or Safety Block), falling back to basic filter:", error);
    
    // If Gemini throws a "FinishReason.SAFETY" error, catch it explicitly!
    if (error.message?.includes('SAFETY') || error.message?.includes('safety')) {
       return { isSafe: false, category: 'VIOLENCE', summary: 'Message violates strict safety guidelines.', text: rawText };
    }

    // Fallback locally if the API is completely down
    const noPII = stripPIIFallback(rawText);
    
    // If the basic PII stripper caught an email or phone number, block it strictly!
    if (noPII !== rawText) {
      return { isSafe: false, category: "PERSONAL", summary: "Automated PII detection triggered on fallback filter.", text: rawText };
    }

    try {
      const cleanText = fallbackFilter.clean(noPII);
      const isAltered = cleanText !== rawText;
      
      // If the fallback dictionary caught a swear/violence word, block it strictly!
      if (isAltered) {
         return {
           isSafe: false,
           category: "EXPLICIT",
           summary: "Automated explicit language detection triggered on fallback filter.",
           text: rawText
         };
      }

      return {
        isSafe: true,
        category: "GOOD",
        summary: "Passed fallback basic filter.",
        text: cleanText
      };
    } catch (err) {
      // If even the fallback filter crashes, FAIL SECURELY (block the message)
      return { isSafe: false, category: "EXPLICIT", summary: "Critical moderation filter error.", text: rawText };
    }
  }
};
