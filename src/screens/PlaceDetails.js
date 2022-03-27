import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "@ui-kitten/components";
import { connect, useSelector } from "react-redux";
import Toast from "react-native-root-toast";

import DisplayError from "../components/DisplayError";
import TagsIcon from "../components/TagsIcon";
import TagsList from "../components/TagsList";
import { copyPlace, deletePlace } from "../../config/firebase";

const PlaceDetails = ({ route, dispatch }) => {
  const { placeData, ownPlace } = route.params;
  const [savedText, setSavedText] = useState("Sauvegarder");
  const [saved, setSaved] = useState(false);
  const places = useSelector((state) => state.places.places);

  useEffect(() => {
    (() => {
      const originalId = placeData.originalId || placeData.id;
      const found = places.find((p) => {
        const pId = p.originalId || p.id;
        return pId === originalId;
      });
      if (found) {
        setSavedText("Sauvegardé");
        setSaved(true)
      } else {
        setSavedText("Sauvegarder");
        setSaved(false)
      }
    })();
  }, [places]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{placeData.name}</Text>
          <TagsList tags={placeData.tags} />
        </View>

        <View style={styles.containerInfo}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              <Text style={styles.text2}>Adresse :</Text> {placeData.address}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              <Text style={styles.text2}>Description :</Text>{" "}
              {placeData.description}
            </Text>
          </View>
        </View>
      </View>
      <View>
        {ownPlace ? (
          <Button
            style={[styles.button, styles.buttonDelete]}
            onPress={async () => {
              await deletePlace(placeData.id);
              Toast.show("Place supprimée", {
                duration: Toast.durations.LONG,
              });
            }}
          >
            Supprimer
          </Button>
        ) : (
          <Button
            style={[styles.button, saved ? null : styles.buttonSave]}
            disabled={saved}
            onPress={async () => {
              const res = await copyPlace(placeData, places);
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
            }}
          >
            {savedText}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    places: state.places.places,
  };
};

export default connect(mapStateToProps)(PlaceDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 5,
    paddingTop: 20,
    justifyContent: "space-around",
  },

  containerTitle: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  containerInfo: {
    //width: "95%",
    borderTopWidth: 3,
    borderColor: "#6db966",
  },

  title: {
    margin: 10,
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold",
  },

  text: {
    margin: 10,
    fontSize: 17,
  },

  text2: {
    fontWeight: "bold",
  },

  textContainer: {
    borderBottomWidth: 1,
  },
  button: {
    flexDirection: "row",
    margin: 10,

    borderRadius: 10,
    height: 45,
  },
  buttonDelete: {
    backgroundColor: "#CB0600",
    borderColor: "#CB0600",
  },
  buttonSave: {
    backgroundColor: "#0093fd",
    borderColor: "#0093fd",
  },
});
