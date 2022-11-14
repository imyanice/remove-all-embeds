import {
  Command,
  ApplicationCommandType,
  ApplicationCommandInputType,
  ApplicationCommandOptionType,
} from "enmity/api/commands";
import removeEmbeds from "../utils/removeEmbeds";
import { Toasts } from "enmity/metro/common";
import { getIDByName } from "enmity/api/assets";

const removeAllEmbeds: Command = {
  id: "remove-embeds",

  name: "remove-embeds",
  displayName: "remove-embeds",

  description: "Remove all embeds from a provided message",
  displayDescription: "Remove all embeds from a provided message",

  type: ApplicationCommandType.Chat,
  inputType: ApplicationCommandInputType.BuiltInText,

  options: [
    {
      // the text which will be used as an argument later
      name: "message",
      displayName: "message",
      description: "The message URL to remove all embeds",
      displayDescription: "The message URL to remove all embeds",
      type: ApplicationCommandOptionType.String,
      required: true, // required
    },
  ],

  execute: async function (args, context) {
    let urlChecker = /https:\/\/discord.com\/channels\/[0-9]+\/[0-9]+\/[0-9]+/i;
    let messageURL = args[args.findIndex((x) => x.name === "message")].value;
    if (urlChecker.test(messageURL)) {
      let messageID = messageURL.split("/")[6];
      let channelID = messageURL.split("/")[5];
      let guildID = messageURL.split("/")[4];
      removeEmbeds(channelID, messageID, guildID);
    } else {
      console.log("[REMOVE-EMBEDS] Invalid message URL provided");
      Toasts.open({
        content: "Invalid message URL provided",
        source: getIDByName("Small"),
      });
    }
  },
};

export default removeAllEmbeds;
