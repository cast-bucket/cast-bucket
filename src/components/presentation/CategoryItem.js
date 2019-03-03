import { styles as s } from "react-native-style-tachyons";
import React from "react";
// import FastImage from "../presentation/FastImage/FastImage";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import global from "../../config/globals";
import randomColor from "random-hex-color";

const CategoryItem = props => {
  return (
    <View style={styles.categoryItem}>
      <TouchableOpacity onPress={props.onPress}>
        <Image style={[styles.categoryImage, s["bg_green"]]} />
      </TouchableOpacity>
      <Text style={[styles.categoryTitle, global.styles.subheading, s.f6]}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryImage: {
    width: 200,
    height: 200,
    borderRadius: 5
    // borderWidth: 0.005,
  },
  categoryItem: {
    flex: 1,
    alignItems: "center",
    margin: 20
  },
  categoryTitle: {
    textAlignVertical: "center",
    textAlign: "center",
    maxWidth: 200,
    marginTop: 15
  }
});

export default CategoryItem;
