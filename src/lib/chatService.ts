"use server";

import { createServerFn } from "@tanstack/react-start";
import { schoolContext } from "../data/chatContext";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

// Using Gemini Interactions API with current supported model
const GEMINI_MODEL = "gemini-3.6-flash";

const getFriendlyApiError = (status: number, payload?: any) => {
  const apiMessage = payload?.error?.message || payload?.error?.status || "The AI service rejected the request.";

  if (status === 400) {
    return "The assistant could not process that request. Please try again or contact the school office for direct assistance.";
  }

  if (status === 401 || status === 403) {
    return "The AI assistant is not currently authorized to respond. Please try again in a moment or contact the school office.";
  }

  if (status === 429) {
    return "The AI assistant is receiving too many requests right now. Please try again in a moment.";
  }

  if (status >= 500) {
    return "The AI assistant is temporarily unavailable. Please try again in a moment.";
  }

  return apiMessage || "The AI assistant could not respond right now.";
};

export const askSiratAI = createServerFn({ method: "POST" })
  .validator((messages: ChatMessage[]) => messages)
  .handler(async ({ data: messages }) => {
    const apiKey = process.env["GEMINI_API_KEY"];

    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined.");
      return {
        success: false,
        error: "The AI assistant is not configured yet. Please contact the school office.",
      };
    }

    const validMessages = messages
      .filter((message) => message && typeof message.text === "string")
      .map((message) => ({
        role: message.role === "model" ? "model" : "user",
        text: message.text.trim(),
      }))
      .filter((message) => message.text.length > 0)
      .slice(-12);

    if (validMessages.length === 0) {
      return {
        success: false,
        error: "Please enter a message before sending.",
      };
    }

    const requestBody = {
      contents: validMessages.map((message) => ({
        role: message.role,
        parts: [{ text: message.text }],
      })),
      systemInstruction: {
        parts: [{ text: schoolContext }],
      },
      generationConfig: {
        temperature: 0.3,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    let lastError: { status?: number; message?: string; payload?: any } | null = null;

    // Use Interactions API v1 endpoint with current model
    const url = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();

      if (!response.ok) {
        let payload: any = null;

        try {
          payload = responseText ? JSON.parse(responseText) : null;
        } catch {
          payload = { error: { message: responseText } };
        }

        lastError = {
          status: response.status,
          message: payload?.error?.message || responseText,
          payload,
        };

        console.error(`Gemini Interactions API error (${GEMINI_MODEL}):`, {
          status: response.status,
          error: payload?.error,
          message: lastError.message,
        });

        return {
          success: false,
          error: getFriendlyApiError(response.status, payload),
        };
      }

      const result = responseText ? JSON.parse(responseText) : null;
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        return {
          success: false,
          error: "The assistant did not return any text. Please try again.",
        };
      }

      return {
        success: true,
        text,
      };
    } catch (error: any) {
      console.error(`Error calling Gemini Interactions API (${GEMINI_MODEL}):`, error);
      lastError = {
        status: 500,
        message: error?.message || "Unknown error",
      };

      return {
        success: false,
        error: lastError?.status
          ? getFriendlyApiError(lastError.status, lastError.payload)
          : "The AI assistant is currently unavailable. Please try again in a moment.",
      };
    }
  });
