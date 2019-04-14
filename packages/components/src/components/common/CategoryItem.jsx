import React from "react";
// import FastImage from "../presentation/FastImage/FastImage";
import styled from "@emotion/native";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import titleCase from "title-case";

const ignoreTransformations = {
  iOS: "iOS",
  bsd: "BSD",
  "data-science-and-machine-learning": "Data Science and Machine Learning",
  "programming-languages-and-frameworks": "Programming Languages and Frameworks"
};

const appendDimUnit = dimensions => `${dimensions}px`;

const CategoryImage = styled.Image`
  width: ${props => appendDimUnit(props.dimensions)};
  height: ${props => appendDimUnit(props.dimensions)};
  border-radius: 5px;
  background-color: #1ad195;
  cursor: pointer;
`;

const CategoryTitle = styled.Text`
  font-size: 1.05rem;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const transformTitle = title => ignoreTransformations[title] || titleCase(title);
const CategoryItem = props => {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <TouchableOpacity
        onPress={props.onPress}
        elevation={5}
        style={styles.categoryItemTouchable}
        activeOpacity={0.6}
      >
        <CategoryImage dimensions={props.dimensions} style={{ resizeMode: "cover" }} />
      </TouchableOpacity>
      <CategoryTitle>{transformTitle(props.title)}</CategoryTitle>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    resizeMode: "cover",
    backgroundColor: "#1ad195"
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
  categoryTitle: {
    fontSize: "14px",
    textAlignVertical: "center",
    textAlign: "center",
    marginTop: 15
    // marginBottom: 15
  }
});

export default CategoryItem;
