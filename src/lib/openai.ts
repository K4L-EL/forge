import { AzureOpenAI } from "openai";

let _client: AzureOpenAI | null = null;

export function getOpenAIClient(): AzureOpenAI {
  if (!_client) {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;

    if (!endpoint || !apiKey) {
      throw new Error("Azure OpenAI is not configured. Set AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_API_KEY.");
    }

    _client = new AzureOpenAI({
      endpoint,
      apiKey,
      apiVersion: "2024-10-21",
    });
  }
  return _client;
}

export function getDeploymentName(): string {
  return process.env.AZURE_OPENAI_DEPLOYMENT ?? "gpt-5.4-mini";
}
