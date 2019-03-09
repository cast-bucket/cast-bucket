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
      <TouchableOpacity onPress={props.onPress} elevation={5} style={styles.categoryItemTouchable}>
        <Image style={[styles.categoryImage, s["bg_green_70"]]} />
        <Text style={[styles.categoryTitle, global.styles.subheading, isSmallScreen ? s.f6 : s.f5]}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryImage: {
    width: isSmallScreen ? 150 : 200,
    height: 150,
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
    marginVertical: 20
  },
  categoryTitle: {
    textAlignVertical: "center",
    textAlign: "center",
    maxWidth: isSmallScreen ? 150 : 220,
    marginTop: 15,
    marginBottom: 15
  }
});

export default CategoryItem;
