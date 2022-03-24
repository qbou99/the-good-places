import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button } from "@ui-kitten/components";

import Map from "../components/Map";
import PlaceList from "../components/PlaceList";
import PlaceListItem from "../components/PlaceListItem";
import TagsIcon from "../components/TagsIcon";
import TagsList from "../components/TagsList";

const Home = ({ navigation }) => {
  return (
    <View>
      <Map />
      <Button
        onPress={() => {
          navigation.navigate("ViewEditPlace");
        }}
      >
        Ajouter
      </Button>
      <PlaceList />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
