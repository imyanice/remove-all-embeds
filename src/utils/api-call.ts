import { Token } from "@metro/common";

/**
 * @description Remove all message's embeds from a chann, server, mesage ID
 * @param channelID string The channel ID where the message is located
 * @param messageID string The message ID
 * @param serverID string The server ID where the message is located
 */

export default async function removeEmbeds(
  channelID: string,
  messageID,
  serverID: string
) {
  const ftech = fetch(
    `https://discord.com/api/v9/channels/${channelID}/messages/${messageID}`,
    {
      headers: {
        accept: "*/*",
        authorization: Token.getToken(),
        "content-type": "application/json",
      },
      referrer: `https://discord.com/channels/${serverID}/${channelID}`,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: '{"flags":4}',
      method: "PATCH",
      mode: "cors",
      credentials: "include",
    }
  );
}
