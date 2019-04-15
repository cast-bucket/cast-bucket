import React from "react";
import styled from "@emotion/native";
import { View } from "react-native";
import titleCase from "title-case";
const checkedIcon = require("../../assets/icons/checked.svg");

const ignoreTransformations = {
  iOS: "iOS",
  bsd: "BSD",
  "data-science-and-machine-learning": "Data Science and Machine Learning",
  "programming-languages-and-frameworks": "Programming Languages and Frameworks"
};

const appendUnit = dimensions => `${dimensions}px`;

const Checked = styled.Image`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
`;

const CategoryImage = styled.Image`
  width: ${props => appendUnit(props.dimensions)};
  height: ${props => appendUnit(props.dimensions)};
  border-radius: 5px;
  border: ${props => (props.isSelected ? "1.5px solid green" : "0px")};
  background-color: #1ad195;
  cursor: pointer;
`;

const CategoryTouchable = styled.TouchableOpacity`
  border-radius: 5px;
  shadow-color: black;
  shadow-opacity: 0.15;
  shadow-radius: 10;
  shadow-offset: {
    height: 1px,
    width: 1px
  }
`;

const CategoryTitle = styled.Text`
  font-size: 1.15rem;
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
`;

const transformTitle = title => ignoreTransformations[title] || titleCase(title);

const CategoryItem = props => {
  const { categoryId, dimensions, selectCategory, unselectCategory, selected } = props;
  const isSelected = selected.includes(categoryId);

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <CategoryTouchable
        activeOpacity={0.8}
        elevation={10}
        isSelected={isSelected}
        onPress={() => (isSelected ? unselectCategory(categoryId) : selectCategory(categoryId))}
        underlayColor="black"
      >
        {isSelected && <Checked source={checkedIcon} />}
        <CategoryImage
          dimensions={dimensions}
          style={{ resizeMode: "cover" }}
          isSelected={isSelected}
        />
      </CategoryTouchable>
      <CategoryTitle>{transformTitle(categoryId)}</CategoryTitle>
    </View>
  );
};

export default CategoryItem;
