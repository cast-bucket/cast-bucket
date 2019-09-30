import styled from "@emotion/native";
import React, { FunctionComponent } from "react";
import { View } from "react-native";
import titleCase from "title-case";
import { MaterialIcons as Icon } from "../../libs/vector-icons";


const ignoreTransformations = {
  iOS: "iOS",
  bsd: "BSD",
  "data-science-and-machine-learning": "Data Science and Machine Learning",
  "programming-languages-and-frameworks": "Programming Languages and Frameworks"
};

const appendUnit = (dimensions: number) => `${dimensions}px`;


interface CategoryItemProps {
  categoryId: string;
  dimensions: number;
  selectCategory: (categoryId: string) => void;
  unselectCategory: (categoryId: string) => void;
  selected: string[];
  isSelected?: boolean;
}

const Checked = styled(Icon)`
  width: 15px;
  height: 15px;
  position: absolute;
  right: 10;
  top: 10;
  z-index: 1;
  opacity: 0.9;
`;

const CategoryImage = styled.Image`
  width: ${(props: CategoryItemProps) => appendUnit(props.dimensions)};
  height: ${(props: CategoryItemProps) => appendUnit(props.dimensions)};
  border-radius: 5px;
  ${(props: CategoryItemProps) => {
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

const transformTitle = (title: string) => ignoreTransformations[title] || titleCase(title);

export const CategoryItem: FunctionComponent<CategoryItemProps> = React.memo(props => {
  const { categoryId, dimensions, selectCategory, unselectCategory, selected } = props;
  const isSelected: boolean = selected.includes(categoryId);

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <CategoryTouchable
        activeOpacity={0.8}
        elevation={10}
        isSelected={isSelected}
        onPress={() => (isSelected ? unselectCategory(categoryId) : selectCategory(categoryId))}
        underlayColor="black"
      >
        {isSelected && <Checked name="check-circle" />}
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
