import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { Button, Icon } from "@ui-kitten/components";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth();

const Settings = ({ navigation }) => {
  const handleSignOut = () => {
    signOut(auth)
  };

  return (
    <SafeAreaView>
      <Button onPress={handleSignOut} style={styles.button}>
        Déconnexion
      </Button>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6db966",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#6db966",
  },
});
