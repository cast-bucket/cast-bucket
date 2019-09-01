import Feather from "react-native-vector-icons/Feather";
import FeatherIconFont from "react-native-vector-icons/Fonts/Feather.ttf";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialIconFont from "react-native-vector-icons/Fonts/MaterialIcons.ttf";

export { Feather, MaterialIcons };

const iconStyles = [`@font-face { src:url(${FeatherIconFont});font-family: Feather; }`, `@font-face { src:url(${MaterialIconFont});font-family: MaterialIcons; }`].join("\n");

const style = document.createElement("style");
style.type = "text/css";

if (style.styleSheet) {
  style.styleSheet.cssText = iconStyles;
} else {
  style.appendChild(document.createTextNode(iconStyles));
}

if (document.head) document.head.appendChild(style);
