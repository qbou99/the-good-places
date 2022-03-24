import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar 
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import { setUser } from "../../config/firebase";

const auth = getAuth();

const Authentication = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Futura: require("../../assets/futura.ttf"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);

  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("ViewHome");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Inscription de ", user.uid);
        setUser(user.uid, username, email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Connexion de ", user.uid);
      })
      .catch((error) => alert(error.message));
  };

  const toogleLogin = () => {
    setLogin(!login);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView
      style={styles.container1}
    //contentContainerStyle={styles.container2}
    >
      <ScrollView>
        <KeyboardAvoidingView style={[styles.container2]} behavior="padding">
          <Text
            style={{
              fontFamily: "Futura",
              fontSize: 72,
              textAlign: "center",
              color: "#6db966",
              paddingBottom: 24,
              lineHeight: 80
            }}
          >
            The{"\n"}Good{"\n"}Places
          </Text>
          <View style={styles.inputContainer}>
            {login ? null : (
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
              />
            )}
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <View style={styles.buttonContainer}>
            {login ? (
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Connexion</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleSignUp} style={[styles.button]}>
                <Text style={styles.buttonText}>Inscription</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={toogleLogin}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>
                {login ? "S'inscrire" : "Se connecter"}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#6db966",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#6db966",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#6db966",
    fontWeight: "700",
    fontSize: 16,
  },
});
