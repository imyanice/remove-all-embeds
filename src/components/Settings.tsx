// - Credits -
// ALL OF THIS LOGIC WAS CODED BY acquite & stolen by SirTenzin then I stole it
// Thanks acquite :)
// - Credits -
import { FormRow, ScrollView } from "enmity/components";
import { SettingsStore } from "enmity/api/settings";
import { React, Navigation } from "enmity/metro/common";
import { version, release } from "../../manifest.json";
import Credits from "./Credits";

interface SettingsProps {
  settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
  const [touchX, setTouchX] = React.useState();
  const [touchY, setTouchY] = React.useState();

  return (
    <>
      <ScrollView
        onTouchStart={(e) => {
          setTouchX(e.nativeEvent.pageX);
          setTouchY(e.nativeEvent.pageY);
        }}
        onTouchEnd={(e) => {
          if (
            touchX - e.nativeEvent.pageX < -100 &&
            touchY - e.nativeEvent.pageY < 40 &&
            touchY - e.nativeEvent.pageY > -40
          ) {
            Navigation.pop();
          }
        }}
      >
        <Credits /* main credits gui, created from scratch exclusively for dislate (thanks acquite - tenzin) */
        />

        <FormRow
          label={`Plugin Version: ${version}
Release Channel: ${release}`}
        />
      </ScrollView>
    </>
  );
};
