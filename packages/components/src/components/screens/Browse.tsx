import React from "react";
import { FlatList, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Colors } from "react-native-paper";
import { Link } from "../../libs/router";
import { MaterialIcons as Icon } from "../../libs/vector-icons";
import * as constants from "../../utils/constants";
import { isMobile, isSmallScreen } from "../../utils/platforms";
import { Page } from "../common/Page";
import { PageHeading, SectionTitle, Title } from "../common/Typography";
import PodcastsSection from "../layout/PodcastsSection";

export class Browse extends React.PureComponent {
  state = {
    text: ""
  };

  resize = () => this.forceUpdate();

  componentDidMount() {
    if (!isMobile) {
      window.addEventListener("resize", this.resize);
    }
  }

  componentWillUnmount() {
    if (!isMobile) {
      window.removeEventListener("resize", this.resize);
    }
  }

  render() {
    const categories = constants.data.appCategories;
    return (
      <ScrollView>
        <Page>
          <PageHeading>Discover</PageHeading>
          <View
            style={{
              margin: constants.ui.containers.margin.value,
              marginTop: 0,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 50,
              borderColor: Colors.grey400,
              ...(isSmallScreen ? { padding: 0 } : { padding: 16 }),
              borderWidth: 1
            }}
          >
            <Icon
              name="search"
              size={22}
              color={Colors.grey400}
              style={{ marginHorizontal: 5, paddingLeft: 5 }}
            />
            <TextInput
              placeholder="Search for Podcasts"
              style={{
                fontSize: 18,
                fontFamily: "Inter",
                padding: 7,
                // @ts-ignore
                ...(!isMobile && { outlineStyle: "none" }),
                borderWidth: 0
              }}
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
          </View>
          <PodcastsSection sectionType="recommended" />
          <SectionTitle style={{ marginTop: 10 }}>Topics</SectionTitle>
          <FlatList
            contentContainerStyle={{
              margin: constants.ui.containers.margin.value,
              flex: 1
            }}
            // TODO: Should we use fetchCategories here instead?
            data={categories}
            renderItem={({ item, index }) => {
              return (
                <Link
                  style={{ ...(!isMobile && { textDecoration: "none" }) }}
                  // TODO: Add link once Podcasts Page is done
                  // to={{
                  //   pathname: `/podcasts/${item}`
                  // }}
                >
                  <View
                    style={{
                      ...(index === 0 ? { paddingBottom: 20 } : { paddingVertical: 20 }),
                      ...(index === categories.length - 1
                        ? { borderBottomWidth: 0 }
                        : { borderBottomWidth: 1 }),
                      borderBottomColor: Colors.grey300,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ alignSelf: "flex-start" }}>
                      <Title style={styles.topicTitle}>{item}</Title>
                    </View>
                    <Icon
                      name="chevron-right"
                      size={22}
                      style={{ alignSelf: "flex-end" }}
                      color={Colors.indigo600}
                    />
                  </View>
                </Link>
              );
            }}
            keyExtractor={(item: any, index: number) => `${item.link}${index.toString()}`}
          />
        </Page>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  topicTitle: {
    ...(isSmallScreen
      ? {
          fontSize: 16,
          maxWidth: 200
        }
      : {
          fontSize: 18,
          maxWidth: 400
        })
  }
});
