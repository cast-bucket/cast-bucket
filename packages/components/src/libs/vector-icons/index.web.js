import Feather from "react-native-vector-icons/Feather";
import FeatherIconFont from "react-native-vector-icons/Fonts/Feather.ttf";

export { Feather };

const iconStyles = [`@font-face { src:url(${FeatherIconFont});font-family: Feather; }`].join("\n");

const style = document.createElement("style");
style.type = "text/css";

if (style.styleSheet) {
  style.styleSheet.cssText = iconStyles;
} else {
  style.appendChild(document.createTextNode(iconStyles));
}

if (document.head) document.head.appendChild(style);
