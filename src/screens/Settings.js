import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth();

const Settings = ({ navigation }) => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //navigation.navigate("Authentification");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Déco</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
