import React from "react";
import FastImage from "../presentation/FastImage/FastImage";
import { StyleSheet, Text, View, Image, Platform, TouchableHighlight } from "react-native";
import { Redirect } from "../../routes/routes";
import global from "../../config/globals";
import randomColor from "random-hex-color";

const CategoryItem = props => {
  console.log(">>>-SHRIRAM->>> props", props);
  return (
    <View style={styles.categoryItem}>
      <TouchableHighlight
        onPress={() => {
          console.log("touched!");
        }}
      >
        <View style={styles.categoryImage} />
      </TouchableHighlight>
      <Text style={[styles.categoryTitle, global.styles.defaultSansFont, global.styles.fontXSmall]}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
    backgroundColor: randomColor(),
    borderWidth: 0.005,
    marginTop: 30,
    marginBottom: 20
  },
  categoryItem: {
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 20
  },
  categoryTitle: {
    textAlignVertical: "center",
    textAlign: "center",
    maxWidth: 150
  }
});

export default CategoryItem;
