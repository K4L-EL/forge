import { NextResponse } from "next/server";
import { getOpenAIClient, getDeploymentName } from "@/lib/openai";

const SYSTEM_PROMPT = `You are the ForgeLabs AI Health Assistant — a knowledgeable, friendly, and evidence-based health companion for people who are active and invested in their fitness and wellbeing.

Your role:
- Help users understand blood test results and biomarkers
- Explain what specific biomarkers mean (e.g., ferritin, testosterone, vitamin D, CRP, ApoB, HbA1c)
- Suggest evidence-based lifestyle changes (diet, exercise, sleep, supplements) to improve flagged results
- Relate biomarker insights to athletic performance, recovery, and overall health
- Be encouraging and actionable — always give clear next steps

Guidelines:
- Use plain English, not medical jargon. When you use a technical term, explain it briefly.
- Always note that you are an AI assistant and cannot replace professional medical advice.
- If a result seems concerning (e.g., very low ferritin, high CRP, abnormal thyroid), recommend they consult their GP or a specialist.
- Reference UK health guidelines where relevant (NHS, NICE).
- Keep responses concise but thorough — aim for 2-4 paragraphs.
- Be warm and supportive, like a knowledgeable training partner.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages ?? [];

    if (!messages.length) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    let assistantReply: string;

    try {
      const client = getOpenAIClient();
      const deployment = getDeploymentName();

      const completion = await client.chat.completions.create({
        model: deployment,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
        ],
        max_completion_tokens: 800,
        temperature: 0.7,
      });

      assistantReply = completion.choices[0]?.message?.content ?? "I'm sorry, I couldn't generate a response. Please try again.";
    } catch (aiError) {
      console.warn("Azure OpenAI unavailable, using fallback:", aiError);
      assistantReply = getFallbackResponse(messages[messages.length - 1]?.content ?? "");
    }

    return NextResponse.json({ content: assistantReply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("vitamin d")) {
    return "Vitamin D is crucial for athletes — it supports bone health, immune function, and muscle recovery. Low levels can impact performance and recovery. Aim for 30–50 ng/mL (75–125 nmol/L). If you're deficient, consider supplementation (1,000–4,000 IU daily) and sensible sun exposure, especially during UK winter months.\n\n*Note: Azure OpenAI is not yet configured. This is a pre-built response. Once connected, I'll give you personalised, AI-powered insights.*";
  }
  if (lower.includes("iron") || lower.includes("ferritin")) {
    return "Iron and ferritin are essential for endurance athletes. Ferritin stores iron — low levels can cause fatigue, reduced VO2 max, and poor recovery. Athletes often need more iron due to foot-strike hemolysis and sweat loss. Aim for ferritin above 30 ng/mL; endurance athletes may benefit from 50+ ng/mL. Pair iron-rich foods with vitamin C for better absorption.\n\n*Note: Azure OpenAI is not yet configured. This is a pre-built response.*";
  }
  if (lower.includes("testosterone")) {
    return "Testosterone is a key hormone for athletes — it affects muscle mass, recovery, and energy. Levels naturally vary with sleep, stress, and training load. If your results are low, consider: improving sleep quality, managing stress, resistance training, and adequate nutrition. Avoid overtraining, which can suppress testosterone.\n\n*Note: Azure OpenAI is not yet configured. This is a pre-built response.*";
  }
  if (lower.includes("heart") || lower.includes("cholesterol") || lower.includes("apob")) {
    return "Cardiovascular markers like total cholesterol, LDL, HDL, and triglycerides give a complete picture. HDL is your 'good' cholesterol — higher is better. For advanced insight, ApoB measures atherogenic particles directly and is considered a better predictor of cardiovascular risk than LDL alone. Aim to keep ApoB below 1.0 g/L, ideally below 0.7 g/L if you have risk factors.\n\n*Note: Azure OpenAI is not yet configured. This is a pre-built response.*";
  }
  return "That's a great question! I'd love to give you a detailed, personalised answer. The AI assistant is currently running in fallback mode — once Azure OpenAI is configured with your API keys, I'll be able to provide comprehensive, evidence-based health insights tailored to your specific biomarkers and goals.\n\nIn the meantime, try asking about specific biomarkers like Vitamin D, Iron/Ferritin, Testosterone, or Cholesterol for pre-built guidance.";
}
