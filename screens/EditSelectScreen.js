import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Block from "../components/Block";
import { AntDesign } from "@expo/vector-icons";

export default class EditSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  filterByPatient = (key) => {
    const filteredData = this.state.dataSource.filter(
      (item) => item.name == key
    );
    this.setState({ currData: filteredData });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/blocks/")
      .then((response) => {
        this.setState({
          dataSource: response.data,
          currData: response.data.filter(
            (item) => item.patientId == "matthew li"
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textContainer}>My Treatments</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("EditBlockScreen")}
        >
          <AntDesign
            name="edit"
            size={32}
            color="#da4167"
            style={styles.edit}
          />
        </TouchableOpacity>
        <FlatList
          style={styles.list}
          data={this.state.currData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                this.props.navigation.navigate("CompareScreen", {
                  id: item._id,
                })
              }
            >
              <Block item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
        />
        <TouchableOpacity
          style={styles.footer}
          onPress={() => this.props.navigation.navigate("MainScreen")}
        >
          <Text style={{ color: "white" }}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  edit: {
    left: 370,
    top: -40,
  },
  textContainer: {
    fontSize: 40,
    marginTop: 30,
    marginHorizontal: 20,
  },
  list: {
    marginTop: -30,
    height: 750,
  },
  item: {
    top: 10,
    marginTop: 10,
  },
  footer: {
    bottom: 0,
    alignItems: "center",
    backgroundColor: "#da4167",
    marginHorizontal: 180,
    borderRadius: 5,
  },
});
