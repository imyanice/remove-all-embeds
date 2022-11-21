/**
 * CODE STOLEN FROM acquite AND SirTenzin,
 * THANK YOU !
 */

import { Plugin, registerPlugin } from "enmity/managers/plugins";
import { React } from "enmity/metro/common";
import { getByProps, filters, bulk } from "enmity/metro";
import { create } from "enmity/patcher";
import manifest from "../manifest.json";
import { getIDByName } from "enmity/api/assets";
import { Toasts } from "enmity/metro/common";
import { FormRow } from "enmity/components";

import Settings from "./components/Settings";
import removeAllEmbeds from "./components/RemoveAllEmbeds";
import removeEmbeds from "./utils/removeEmbeds";

const Patcher = create("remove-all-embeds");

const [LazyActionSheet] = bulk(filters.byProps("openLazy", "hideActionSheet"));

const RemoveAllEmbeds: Plugin = {
  ...manifest,
  commands: [],

  onStart() {
    this.commands = [removeAllEmbeds];
    this.patches = [];
    let attempt = 0;
    let attempts = 3;
    const unpatchActionSheet = () => {
      try {
        attempt++;
        const MessageStore = getByProps("getMessage", "getMessages");

        console.log(
          `[RemoveAllEmbeds] delayed start attempt ${attempt}/${attempts}.`
        );

        Toasts.open({
          content: `[RemoveAllEmbeds] start attempt ${attempt}/${attempts}.`,
          source: getIDByName("debug"),
        });

        Patcher.before(
          LazyActionSheet,
          "openLazy",
          (_, [component, sheet], _res) => {
            if (sheet === "MessageLongPressActionSheet") {
              component.then((instance) => {
                Patcher.after(instance, "default", (_, message, res) => {
                  if (!res.props) {
                    console.log(
                      `[RemoveAllEmbeds Local Error: Property "Props" Does not Exist on "res"]`
                    );
                    return res;
                  }

                  const finalLocation =
                    res?.props?.children?.props?.children?.props?.children[1];

                  if (finalLocation[0].key == "151") { // Price for an Apple action at 11:30 am (21/11/2022)
                    return;
                  }
                  const originalMessage = MessageStore.getMessage(
                    message[0].message.channel_id,
                    message[0].message.id
                  );

                  if (!originalMessage.embeds) {
                    return console.log("[RemoveAllEmbeds] No message embeds.");
                  }

                  const formElem = (
                    <FormRow
                      key={`151`}
                      label={`Remove All Embeds`}
                      leading={
                        <FormRow.Icon source={getIDByName("ic_trash_24px")} />
                      }
                      onPress={() => {
                        let om = originalMessage;
                        if (!om || !om.embeds[0]) {
                          console.log(
                            `[CopyEmbedss]: Original Message not found/not embed`
                          );
                          return Toasts.open({
                            content: "This message does not have an embed!",
                            source: "ic_block",
                          });
                        }
                        removeEmbeds(
                          message[0].message.channel_id,
                          message[0].message.id,
                          message[0].server_id
                        );
                      }}
                    />
                  );
                  finalLocation.unshift(formElem);
                });
              });
            }
          }
        );
        // - Credits -
        // ALL OF THIS LOGIC WAS CODED BY acquite
        // Thanks acquite :)
        // - Credits -
      } catch (err) {
        console.log(`[RemoveAllEmbeds Local Error ${err}]`);

        if (attempt < attempts) {
          console.warn(
            `[RemoveAllEmbeds] failed to start. Trying again in ${attempt}0s.`
          );
          Toasts.open({
            content: `[RemoveAllEmbeds] failed to start trying again in ${attempt}0s.`,
            source: getIDByName("ic_message_retry"),
          });

          setTimeout(unpatchActionSheet, attempt * 10000);
        } else {
          console.error(`[RemoveAllEmbeds] failed to start. Giving up.`);
          Toasts.open({
            content: `[RemoveAllEmbeds] failed to start. Giving up.`,
            source: getIDByName("Small"),
          });
        }
      }
    };
    unpatchActionSheet();
  },

  onStop() {
    this.commands = [];
    this.patches = [];
    Patcher.unpatchAll();
  },

  getSettingsPanel({ settings }) {
    return <Settings settings={settings} />;
  },
};

registerPlugin(RemoveAllEmbeds);
