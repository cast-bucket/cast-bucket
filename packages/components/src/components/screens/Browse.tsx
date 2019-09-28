import React from "react";
import { ScrollView, View, FlatList, TextInput, Dimensions, StyleSheet } from "react-native";
import { Colors } from "react-native-paper";
import * as constants from "../../utils/constants";
import PodcastsSection from "../layout/PodcastsSection";
import { SectionTitle, Title, PageHeading } from "../common/Typography";
import { MaterialIcons as Icon } from "../../libs/vector-icons";
import { Link } from "../../libs/router";
import { isSmallScreen, isMobile } from "../../utils/platforms";
import { Page } from "../common/Page";

export class Browse extends React.PureComponent {
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

  state = {
    text: ""
  };

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
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 50,
              borderColor: Colors.grey400,
              borderWidth: 1,
              padding: 20
            }}
          >
            <Icon name="search" size={15} color={Colors.grey600} style={{ paddingRight: 5 }} />
            <TextInput
              placeholder="Search for Podcasts"
              style={{
                // @ts-ignore
                outlineStyle: "none",
                backgroundColor: "white",
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
                  style={{ textDecoration: "none" }}
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
