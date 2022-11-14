import { Toasts, Token } from "enmity/metro/common";
import { getIDByName } from "enmity/api/assets";
/**
 * @description Remove all message's embeds from a chann, server, mesage ID
 * @param channelID string The channel ID where the message is located
 * @param messageID string The message ID
 * @param serverID string The server ID where the message is located
 * @returns string
 */

export default async function removeEmbeds(
  channelID: string,
  messageID: string,
  serverID: string
) {
  fetch(
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
  ).then((res) => {
    if (res.status === 200) {
      Toasts.open({
        content: "Embeds succesfully removed!",
        source: getIDByName("ic_trash_24px"),
      });
    } else {
      Toasts.open({
        content: "Something went wrong, try again layer...",
        source: getIDByName("ic_alert"),
      });
      console.log(res);
    }
  });
}
