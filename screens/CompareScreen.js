import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Block from "../components/Block";
import Carousel from "react-native-snap-carousel";

export default class CompareScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  filterByPatient = (key) => {
    const filteredData = this.state.dataSource.filter(
      (item) => item.name == key
    );
    this.setState({ currData: filteredData });
  };

  optimize = () => {
    const data = this.state.otherCase;
    const pdata = this.state.otherPatient;
    const conditionMultiplier = 3;
    const symptomMultiplier = 5;
    const symptomLengthMultiplier = 5;
    const severityMultiplier = 8;
    const genderMultiplier = 5;
    const ethnicityMultiplier = 3;
    const ageMultiplier = 4;
    const preexistingMultiplier = 7;

    const map = new Map();
    for (var i = 0; i < data.length; i++) {
      map.set(data[i]["_id"], 0);
      if (data[i]["condition"] == this.state.myBlock[0]["condition"]) {
        map.set(data[i]["_id"], map.get(data[i]["_id"]) + conditionMultiplier);
      }
      if (data[i]["symptomLength"] == this.state.myBlock[0]["symptomLength"]) {
        map.set(
          data[i]["_id"],
          map.get(data[i]["_id"]) + symptomLengthMultiplier
        );
      }
      if (data[i]["severity"] == this.state.myBlock[0]["severity"]) {
        map.set(data[i]["_id"], map.get(data[i]["_id"]) + severityMultiplier);
      }
      if (this.state.myPatient[0]["sex"] == "male") {
        map.set(data[i]["_id"], map.get(data[i]["_id"]) + genderMultiplier);
      }
      if (this.state.myPatient[0]["ethnicity"] == "asian") {
        map.set(data[i]["_id"], map.get(data[i]["_id"]) + ethnicityMultiplier);
      }
      if (this.state.myPatient[0]["age"] == "18") {
        map.set(data[i]["_id"], map.get(data[i]["_id"]) + ageMultiplier);
      }
      if (data[i]["preexisting"] == this.state.myBlock[0]["preexisting"]) {
        map.set(
          data[i]["_id"],
          map.get(data[i]["_id"]) + preexistingMultiplier
        );
      }
      for (var j = 0; j < data[i]["symptoms"].length; j++) {
        if (
          this.state.myBlock[0]["symptoms"].includes(data[i]["symptoms"][j])
        ) {
          map.set(data[i]["_id"], map.get(data[i]["_id"]) + symptomMultiplier);
        }
      }
      var newData = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
      var newBlocks = [];
      for (const [key, value] of newData.entries()) {
        for (var i = 0; i < data.length; i++) {
          if (data[i]["_id"] == key) {
            newBlocks.push(data[i]);
          }
        }
      }
      // this.setState({ otherCase: newBlocks });
    }
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/blocks/")
      .then((response) => {
        this.setState({
          myBlock: response.data.filter(
            (item) => item._id == this.props.route.params.id
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/blocks/")
      .then((response) => {
        this.setState({
          otherCase: response.data.filter(
            (item) => item.patientId !== "matthew li"
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get("http://localhost:5000/patients/").then((response) => {
      this.setState({
        myPatient: response.data.filter(
          (item) => item.patientId == "matthew li"
        ),
      });
    });

    axios.get("http://localhost:5000/patients/").then((response) => {
      this.setState({
        otherPatient: response.data.filter(
          (item) => item.patientId !== "matthew li"
        ),
      });
    });
    setTimeout(() => {
      this.setState({
        loaded: true,
      });
      this.optimize();
    }, 2500);
  }

  render() {
    return this.state.loaded ? (
      <View style={styles.container}>
        <Text style={styles.textContainer}>Compare Treatments</Text>
        <Text style={styles.myCase}>My Case</Text>
        <FlatList
          style={styles.list}
          data={this.state.myBlock}
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
        <Text style={styles.myCase}>Other Cases</Text>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.state.otherCase}
          renderItem={({ item }) => (
            <View>
              <View style={styles.citem}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={styles.cleft}>
                    <Text style={styles.ctext}>
                      {item.condition} | {item.symptomLength} weeks
                    </Text>
                    <Text style={styles.cbodyText}>Symptoms</Text>
                    {item.symptoms.map((item) => (
                      <Text style={styles.cdescText}>- {item}</Text>
                    ))}
                  </View>
                  <View style={styles.cright}>
                    <Text style={styles.ctreatmentsText}>Treatments</Text>
                    {item.treatments.map((item) => (
                      <Text style={styles.cdescText}>- {item}</Text>
                    ))}
                  </View>
                </View>
                <View style={styles.ccomments}>
                  <Text style={{ color: "white", fontSize: 20 }}>
                    Comments: {item.comments}
                  </Text>
                </View>
              </View>
            </View>
          )}
          sliderWidth={400}
          itemWidth={450}
        />
        <TouchableOpacity
          style={styles.footer}
          onPress={() => this.props.navigation.navigate("MainScreen")}
        >
          <Text style={{ color: "white" }}>Home</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={styles.textContainer}>Compare Treatments</Text>
        <Text style={styles.myCase}>My Case</Text>
        <FlatList
          style={styles.list}
          data={this.state.myBlock}
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
        <Text style={styles.myCase}>Looking For Similar Cases</Text>
        <ActivityIndicator
          style={{ paddingTop: 100 }}
          size="large"
          color="#da4167"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  myCase: {
    fontSize: 25,
    marginHorizontal: 20,
    marginTop: 10,
  },
  textContainer: {
    fontSize: 40,
    marginTop: 30,
    marginHorizontal: 20,
  },
  list: {
    height: 320,
  },
  item: {
    top: 0,
    marginTop: 10,
  },
  footer: {
    bottom: -40,
    alignItems: "center",
    backgroundColor: "#da4167",
    marginHorizontal: 180,
    borderRadius: 5,
  },
  citem: {
    width: 380,
    height: 280,
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    marginHorizontal: 15,
    borderColor: "#bbb",
    backgroundColor: "#da4167",
    borderWidth: 1,
    borderStyle: "solid",
  },
  cbodyText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 5,
  },
  ctreatmentsText: {
    fontSize: 20,
    paddingTop: 40,
    color: "white",
    fontWeight: "bold",
  },
  cdescText: {
    paddingTop: 5,
    paddingLeft: 5,
    fontSize: 20,
    color: "white",
  },
  ctext: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    width: "400%",
  },
  cleft: {
    width: 150,
    left: 0,
  },
  ccomments: {
    justifyContent: "flex-end",
    left: 0,
    paddingBottom: 20,
  },
  cright: {
    width: 200,
    alignItems: "center",
  },
});
