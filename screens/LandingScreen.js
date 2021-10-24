import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const data = [
  { key: "New User", route: "ProfileFormScreen", color: "#00b2ca" },
  { key: "Returning User", route: "MainScreen", color: "#da4167" },
];

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://i.imgur.com/xGRvO05.jpg" }}
      />
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.route)}
            style={{
              backgroundColor: item.color,
              width: "95%",
              height: 150,
              marginTop: 20,
              borderRadius: "8px",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.listText}>{item.key}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: "white",
  },
  welcome: {
    fontSize: 40,
    fontFamily: "AvenirNext-DemiBold",
    top: 200,
    marginLeft: "5%",
  },
  list: {
    marginLeft: "2.5%",
    padding: "1%",
    top: 255,
    height: 550,
  },
  listText: {
    fontSize: 35,
    color: "white",
    fontFamily: "AvenirNext-DemiBold",
  },
  textContainer: {
    width: "90%",
  },
  image: {
    width: 300,
    height: 60,
    left: 58,
    top: 40,
  },
});

export default LandingScreen;
