import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Text } from "@ui-kitten/components";
import { Icon } from "@ui-kitten/components";
import Toast from "react-native-root-toast";

import { copyPlace } from "../../config/firebase";
import TagsList from "./TagsList";

const PlaceListItem = ({
  place,
  navigation,
  centerOnPlace,
  map,
  dispatch,
  places,
}) => {
  function navigateToPlaceDetails() {
    return navigation.navigate("ViewPlaceDetails", {
      placeData: place,
      ownPlace: map,
    });
  }

  const copyUserPlace = async () => {
    const res = await copyPlace(place, places);
    if (res) {
      const action = { type: "ADD_PLACE", value: res };
      dispatch(action);

      Toast.show("Lieux copié", {
        duration: Toast.durations.LONG,
      });
    } else {
      Toast.show("Vous avez déjà ce lieu", {
        duration: Toast.durations.LONG,
      });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToPlaceDetails}>
      <View style={styles.informationContainer}>
        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.city}>
          {place.description.length > 12
            ? place.description.substring(0, 12) + "..."
            : place.description}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <TagsList tags={place.tags} />
        {map ? (
          <TouchableOpacity onPress={centerOnPlace}>
            <Icon name={"map-outline"} style={styles.icon} fill="#8F9BB3" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={copyUserPlace}>
            <Icon name={"copy"} style={styles.icon} fill="#8F9BB3" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    places: state.places.places,
  };
};

export default connect(mapStateToProps)(PlaceListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderColor: "#e6e6e6",
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  city: {
    fontSize: 20,
  },
  iconContainer: {
    flex: 1,
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    marginLeft: 4,
    marginTop: 4,
    width: 28,
    height: 28,
  },
});
