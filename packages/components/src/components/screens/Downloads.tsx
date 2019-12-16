import { IEpisodeItem } from "@cast-bucket/core";
import styled from "@emotion/native";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, View } from "react-native";
import { Colors } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "../../libs/router";
import { MaterialIcons as Icon } from "../../libs/vector-icons";
import { fetchDownloads, togglePlaying } from "../../redux/actions";
import { AppState } from "../../redux/store";
import * as constants from "../../utils/constants";
import { isWeb } from "../../utils/platforms";
import { PageWrapper } from "../common/PageWrapper";
import { Text } from "../common/Typography";

const DownloadItem = styled.View`
  min-width: 0px;
  min-height: 150px;
  cursor: pointer;
  ${isWeb ? `box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 16px` : {}};
  margin-vertical: 10px;
  border-radius: 5px;
  padding: 20px;
`;

const PlayButtonIcon = styled(Icon)`
  justify-content: center;
  margin-right: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

const DownloadListItem = ({ item, nowPlaying, index, setNowPlaying }) => {
  const episodeItem: IEpisodeItem | any = item;
  const dispatch = useDispatch();
  const [isPlaying, setPlaying] = useState(false);

  return (
    <DownloadItem style={{ flexDirection: "column" }}>
      <Row>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            maxWidth: 64
          }}
        >
          <Image
            style={{ width: 64, height: 64, padding: 10, borderRadius: 4 }}
            source={{ uri: "https://i.pravatar.cc/120" }}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text numberOfLines={2} style={{ lineHeight: 22, fontWeight: "600", fontSize: 14 }}>
            {episodeItem.title}
          </Text>
          <Text numberOfLines={1} style={{ color: Colors.grey700, marginTop: 3, fontSize: 12 }}>
            {episodeItem.creator}
          </Text>
        </View>
      </Row>
      <Text numberOfLines={2} style={{ marginVertical: 10, lineHeight: 18, fontSize: 12 }}>
        {episodeItem.contentSnippet}
      </Text>
      <Row style={{ marginTop: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <PlayButtonIcon
            style={{
              userSelect: "none"
            }}
            name={isPlaying && nowPlaying === index ? "pause-circle-filled" : "play-circle-filled"}
            size={30}
            color="#5e5fb8"
            onPress={() => {
              dispatch(togglePlaying(episodeItem, { isPlaying }));
              setPlaying(!isPlaying);
              setNowPlaying(index);
            }}
          />
          <Text
            style={{
              letterSpacing: 1.5,
              fontSize: 10,
              fontWeight: "500",
              textTransform: "uppercase"
            }}
          >
            {dayjs(episodeItem.isoDate).format("MMM DD, YYYY")}
          </Text>
        </View>
        <View
          style={{
            width: 20,
            height: 20,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#37b299",
            borderRadius: 100,
            padding: 4
          }}
        >
          <Icon size={14} color="white" name="arrow-downward" />
        </View>
      </Row>
    </DownloadItem>
  );
};

export const Downloads = () => {
  const dispatch = useDispatch();
  const downloads = useSelector((state: AppState) => state.downloads.items);
  useEffect(() => {
    dispatch(fetchDownloads());
  }, []);

  const [nowPlaying, setNowPlaying] = useState();

  return (
    <PageWrapper title="Downloads">
      <FlatList
        contentContainerStyle={{
          marginTop: 20,
          marginHorizontal: constants.ui.containers.margin.value,
          flex: 1
        }}
        data={downloads}
        renderItem={({ item, index }) => (
          <DownloadListItem
            item={item}
            nowPlaying={nowPlaying}
            setNowPlaying={setNowPlaying}
            index={index}
          />
        )}
      />
    </PageWrapper>
  );
};
