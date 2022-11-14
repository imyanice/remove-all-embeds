import { Plugin, registerPlugin } from "enmity/managers/plugins";
import { React } from "enmity/metro/common";
import { getByProps } from "enmity/metro";
import { create } from "enmity/patcher";
import manifest from "../manifest.json";

import Settings from "./components/Settings";
import removeAllEmbeds from "./components/RemoveAllEmbeds";

const Typing = getByProps("startTyping");
const Patcher = create("silent-typing");

const RemoveAllEmbeds: Plugin = {
  ...manifest,
  commands: [],

  onStart() {
    this.commands = [removeAllEmbeds];
  },

  onStop() {
    this.commands = [];
  },

  getSettingsPanel({ settings }) {
    return <Settings settings={settings} />;
  },
};

registerPlugin(RemoveAllEmbeds);
