import { styles as s } from "react-native-style-tachyons";
import React from "react";
// import FastImage from "../presentation/FastImage/FastImage";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import global from "../../config/globals";
import constants from "../../util/constants";

const { width } = Dimensions.get("window");
const isSmallScreen = width <= constants.breakpoints.MEDIUM_WIDTH;


const CategoryItem = props => {
  return (
    <View style={styles.categoryItem}>
      <TouchableOpacity onPress={props.onPress} elevation={5}>
        {props.selected.includes(props.title)}
        <Image style={[styles.categoryImage, styles.categoryItemTouchable, s["bg_green_70"]]} />
        <Text style={[styles.categoryTitle, global.styles.subheading, s.f6]}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryImage: {
    width: 125,
    height: 125,
    borderRadius: 5,
    resizeMode: "cover"
  },
  categoryItemTouchable: {
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 1
    },
    borderRadius: 5
  },
  categoryItem: {
    flex: 1,
    marginHorizontal: isSmallScreen ? 7 : 30,
    marginVertical: 10
  },
  categoryTitle: {
    textAlignVertical: "center",
    textAlign: "center",
    maxWidth: 125,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15
  }
});

export default CategoryItem;
