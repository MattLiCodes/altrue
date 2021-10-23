import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { format } from "date-fns";

export default function Block({ item }) {
  const request = {
    patientId: item.patientId,
    condition: item.condition,
    symptoms: item.symptoms,
    symptomLength: item.symptomLength,
    treatments: item.treatments,
    treatmentLength: item.treatmentLength,
    comments: item.comments,
    treatmentCenter: item.treatmentCenter,
  };

  const time = new Date(item.date);
  const formattedTime = format(time, "hh:mm aa");

  return (
    <View>
      <View></View>
    </View>
  );
}
