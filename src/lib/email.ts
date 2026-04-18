import { EmailClient } from "@azure/communication-email";

let _client: EmailClient | null = null;

export function getEmailClient(): EmailClient {
  if (!_client) {
    const connectionString = process.env.AZURE_COMMUNICATION_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error(
        "AZURE_COMMUNICATION_CONNECTION_STRING is not set"
      );
    }
    _client = new EmailClient(connectionString);
  }
  return _client;
}

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  plainText?: string;
  replyTo?: { address: string; displayName?: string };
}

export async function sendEmail(params: SendEmailParams): Promise<void> {
  const sender = process.env.AZURE_COMMUNICATION_SENDER;
  if (!sender) {
    throw new Error("AZURE_COMMUNICATION_SENDER is not set");
  }

  const client = getEmailClient();
  const poller = await client.beginSend({
    senderAddress: sender,
    content: {
      subject: params.subject,
      html: params.html,
      plainText: params.plainText ?? params.html.replace(/<[^>]+>/g, ""),
    },
    recipients: {
      to: [{ address: params.to }],
    },
    replyTo: params.replyTo ? [params.replyTo] : undefined,
  });

  await poller.pollUntilDone();
}
