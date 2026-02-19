import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

// Models to try in order of preference (fallback chain)
const MODELS = [
    "gemini-3-flash-preview",
    "gemini-3-pro-preview",
    "gemini-2.0-flash",
];

const SYSTEM_PROMPT = `You are PhytoGuard AI, an expert botanist and plant pathologist. 
Analyze the provided plant image and diagnose any diseases, pests, or health issues.

IMPORTANT: You MUST respond with ONLY valid JSON — no markdown, no code fences, no explanation outside the JSON.

Respond in this exact JSON format:
{
  "name": "Disease/condition name",
  "scientificName": "Scientific name of pathogen or condition",
  "confidence": 85,
  "severity": "Low" | "Moderate" | "Critical",
  "isContagious": true,
  "description": "Brief 1-2 sentence description of what you see",
  "symptoms": ["symptom 1", "symptom 2", "symptom 3"],
  "causes": ["cause 1", "cause 2"],
  "organicControl": ["organic treatment step 1", "organic treatment step 2", "organic treatment step 3"],
  "chemicalControl": ["chemical treatment step 1", "chemical treatment step 2"],
  "prevention": ["prevention tip 1", "prevention tip 2", "prevention tip 3"],
  "proTip": "A single practical pro tip for the gardener",
  "isHealthy": false
}

If the plant looks healthy, set isHealthy to true, name to "Healthy Plant", severity to "Low", confidence to your confidence level, and provide care tips in the prevention array.

If the image is NOT a plant, respond with:
{
  "name": "Not a Plant",
  "scientificName": "N/A",
  "confidence": 0,
  "severity": "Low",
  "isContagious": false,
  "description": "The uploaded image does not appear to be a plant. Please upload a clear photo of a plant leaf or stem.",
  "symptoms": [],
  "causes": [],
  "organicControl": [],
  "chemicalControl": [],
  "prevention": [],
  "proTip": "For best results, take a close-up photo of the affected leaf in natural lighting.",
  "isHealthy": false
}`;

async function tryModel(modelName: string, imagePart: { inlineData: { data: string; mimeType: string } }) {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent([SYSTEM_PROMPT, imagePart]);
    return result.response.text();
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: NextRequest) {
    try {
        const { image, mimeType } = await request.json();

        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        if (!process.env.GOOGLE_GEMINI_API_KEY) {
            return NextResponse.json({ error: "API key not configured" }, { status: 500 });
        }

        // Strip the data URL prefix if present
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: mimeType || "image/jpeg",
            },
        };

        let text = "";
        let lastError: Error | null = null;

        // Try each model in the fallback chain
        for (const modelName of MODELS) {
            for (let attempt = 0; attempt < 2; attempt++) {
                try {
                    console.log(`Trying model: ${modelName} (attempt ${attempt + 1})`);
                    text = await tryModel(modelName, imagePart);
                    lastError = null;
                    break; // Success — exit retry loop
                } catch (err: unknown) {
                    lastError = err instanceof Error ? err : new Error(String(err));
                    const errMsg = lastError.message;

                    // If rate limited, wait and retry once
                    if (errMsg.includes("429") && attempt === 0) {
                        console.log(`Rate limited on ${modelName}, waiting 5s before retry...`);
                        await sleep(5000);
                        continue;
                    }
                    // Otherwise move to next model
                    break;
                }
            }
            if (text && !lastError) break; // Success — exit model loop
        }

        if (!text || lastError) {
            const isQuotaError = lastError?.message?.includes("429") || lastError?.message?.includes("quota");
            return NextResponse.json(
                {
                    error: isQuotaError
                        ? "API quota exceeded. Please wait 30-60 seconds and try again, or check your billing at https://ai.google.dev"
                        : lastError?.message || "Failed to analyze image",
                },
                { status: isQuotaError ? 429 : 500 }
            );
        }

        // Parse the JSON response (handle potential markdown code fences)
        let cleanText = text.trim();
        if (cleanText.startsWith("```")) {
            cleanText = cleanText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
        }

        const diagnosis = JSON.parse(cleanText);

        return NextResponse.json({ diagnosis });
    } catch (error: unknown) {
        console.error("Diagnosis API error:", error);
        const message = error instanceof Error ? error.message : "Failed to analyze image";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
