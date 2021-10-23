import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const data = [
  {
    key: "Find/Compare Treatments",
    route: "SelectScreen",
    color: "#9224f9",
  },
  { key: "Update Your Information", route: "AddBlockScreen", color: "#00b2ca" },
  { key: "Find Centers of Treatment", route: "SelectScreen", color: "#da4167" },
];

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome Back.</Text>
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
  },
  welcome: {
    fontSize: 40,
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
    fontSize: 35,
    color: "white",
    fontFamily: "AvenirNext-DemiBold",
  },
  textContainer: {
    width: "68%",
  },
});

export default MainScreen;
