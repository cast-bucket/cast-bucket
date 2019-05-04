import React from "react";
import styled from "@emotion/native";
import { View } from "react-native";
import titleCase from "title-case";

const checkedIcon = require("../../assets/icons/checkmark-green.png");

const ignoreTransformations = {
  iOS: "iOS",
  bsd: "BSD",
  "data-science-and-machine-learning": "Data Science and Machine Learning",
  "programming-languages-and-frameworks": "Programming Languages and Frameworks"
};

const appendUnit = dimensions => `${dimensions}px`;

const Checked = styled.Image`
  width: 15px;
  height: 15px;
  position: absolute;
  right: 10;
  top: 10;
  z-index: 1;
  opacity: 0.9;
`;

const CategoryImage = styled.Image`
  width: ${props => appendUnit(props.dimensions)};
  height: ${props => appendUnit(props.dimensions)};
  border-radius: 5px;
  ${props => {
    const borderEnabled = {
      borderRadius: 5,
      borderWidth: 1.5,
      borderColor: "#085039"
    };
    const borderDisabled = {
      borderWidth: 0
    };
    return props.isSelected ? borderEnabled : borderDisabled;
  }}
  background-color: #1ad195;
`;

const CategoryTouchable = styled.TouchableOpacity`
  border-radius: 25px;
  shadow-color: black;
  shadow-opacity: 0.15;
  shadow-radius: 10;
  shadow-offset: {
    height: 1px,
    width: 1px
  }
`;

const CategoryTitle = styled.Text`
  color: #0a0a0a;
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: -0.176px;
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
`;

const transformTitle = title => ignoreTransformations[title] || titleCase(title);

export const CategoryItem = React.memo(props => {
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
});
