import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function Block({ item }) {
  const request = {
    patientId: item.patientId,
    name: item.name,
    condition: item.condition,
    symptoms: item.symptoms,
    symptomLength: item.symptomLength,
    treatments: item.treatments,
    treatmentLength: item.treatmentLength,
    comments: item.comments,
    treatmentCenter: item.treatmentCenter,
  };

  return (
    <View>
      <View style={styles.item}>
        <View style={styles.left}>
          <Text style={styles.text}>
            {item.condition} | {item.symptomLength} weeks
          </Text>
          <Text style={styles.bodyText}>Symptoms</Text>
          {item.symptoms.map((item) => (
            <Text style={styles.descText}>- {item}</Text>
          ))}
        </View>
        <View style={styles.right}>
          <Text style={styles.treatmentsText}>Treatments</Text>
          {item.treatments.map((item) => (
            <Text style={styles.descText}>- {item}</Text>
          ))}
        </View>
        <View style={styles.comments}>
          <Text style={{ color: "white", fontSize: 20 }}>
            Comments: {item.comments}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    height: 280,
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    marginHorizontal: 15,
    borderColor: "#bbb",
    backgroundColor: "#247BA0",
    borderWidth: 1,
    borderStyle: "solid",
  },
  bodyText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 5,
  },
  treatmentsText: {
    fontSize: 20,
    paddingTop: 40,
    color: "white",
    fontWeight: "bold",
  },
  descText: {
    paddingTop: 5,
    paddingLeft: 5,
    fontSize: 20,
    color: "white",
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    width: "200%",
  },
  left: {
    width: 200,
  },
  comments: {
    justifyContent: "flex-end",
    left: -310,
    paddingBottom: 30,
  },
});
