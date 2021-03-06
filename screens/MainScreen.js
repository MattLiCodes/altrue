import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const data = [
  {
    key: "Find/Compare Treatments",
    route: "SelectScreen",
    color: "#9224f9",
    icon: "search1",
  },
  {
    key: "Update Your Information",
    route: "AddBlockScreen",
    color: "#00b2ca",
    icon: "book",
  },
  {
    key: "Find Centers of Treatment",
    route: "SelectScreen",
    color: "#da4167",
    icon: "home",
  },
];

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://i.imgur.com/xGRvO05.jpg" }}
      />
      <Text style={styles.welcome}>Welcome.</Text>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("SelectScreen")}
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
              <AntDesign
                name={item.icon}
                size={70}
                color="white"
                style={styles.icons}
              />
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
    fontSize: 50,
    fontFamily: "AvenirNext-DemiBold",
    top: 150,
    marginLeft: "5%",
  },
  list: {
    marginLeft: "2.5%",
    padding: "1%",
    top: 155,
    height: 550,
  },
  listText: {
    bottom: 35,
    left: 110,
    fontSize: 35,
    color: "white",
    fontFamily: "AvenirNext-DemiBold",
  },
  textContainer: {
    width: "100%",
  },
  icons: {
    left: 15,
    top: 45,
  },
  image: {
    width: 300,
    height: 60,
    left: 58,
    top: 40,
  },
});

export default MainScreen;
