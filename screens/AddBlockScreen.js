import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const AddBlockScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    var patientId = "matthew li";
    var condition = data["condition"];
    var symptoms = data["symptoms"].split(", ");
    var symptomLength = data["symptomLength"];
    var severity = data["severity"];
    var treatments = data["treatments"].split(", ");
    var treatmentLength = data["treatmentLength"];
    var comments = data["comments"];
    var treatmentCenter = "Stamps";
    const formattedData = {
      patientId: patientId,
      condition: condition,
      symptoms: symptoms,
      symptomLength: symptomLength,
      severity: severity,
      treatments: treatments,
      treatmentLength: treatmentLength,
      comments: comments,
      treatmentCenter: treatmentCenter,
    };
    axios
      .post("http://localhost:5000/blocks/add", formattedData)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    setTimeout(() => {
      navigation.navigate("EditSelectScreen");
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="condition"
        render={({ field: { onChange, value, onBlur } }) => (
          <View>
            <Text style={styles.labels}>Condition</Text>
            <TextInput
              style={styles.inputs}
              placeholder="What condition are we looking to overcome?"
              placeholderTextColor="#999999"
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              style={styles.inputs}
            />
          </View>
        )}
      />
      <Controller
        control={control}
        name="symptoms"
        render={({ field: { onChange, value, onBlur } }) => (
          <View>
            <Text style={styles.labels}>Symptoms</Text>
            <TextInput
              style={styles.inputs}
              placeholder="What symptoms do you have? (Comma separated)"
              placeholderTextColor="#999999"
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
            />
          </View>
        )}
      />
      <Controller
        control={control}
        name="symptomLength"
        render={({ field: { onChange, value, onBlur } }) => (
          <View>
            <Text style={styles.labels}>Symptom Length</Text>
            <TextInput
              style={styles.inputs}
              placeholder="How long have you had your symptoms?"
              placeholderTextColor="#999999"
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
            />
          </View>
        )}
      />
      <Controller
        control={control}
        name="severity"
        render={({ field: { onChange, value, onBlur } }) => (
          <View>
            <Text style={styles.labels}>Severity of Symptoms</Text>
            <TextInput
              style={styles.inputs}
              placeholder="How severe are your symptoms?"
              placeholderTextColor="#999999"
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
            />
          </View>
        )}
      />
      <Controller
        control={control}
        name="treatments"
        render={({ field: { onChange, value, onBlur } }) => (
          <View>
            <Text style={styles.labels}>Treatments</Text>
            <TextInput
              style={styles.inputs}
              placeholder="What treatments have you received? (Comma separated)"
              placeholderTextColor="#999999"
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
            />
          </View>
        )}
      />
      <Controller
        control={control}
        name="treatmentLength"
        render={({ field: { onChange, value, onBlur } }) => (
          <View>
            <Text style={styles.labels}>Treatment Length</Text>
            <TextInput
              style={styles.inputs}
              placeholder="How long have you been on your current treatment plan?"
              placeholderTextColor="#999999"
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
            />
          </View>
        )}
      />
      <Controller
        control={control}
        name="comments"
        render={({ field: { onChange, value, onBlur } }) => (
          <View>
            <Text style={styles.labels}>Comments</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Note any additional comments here!"
              placeholderTextColor="#999999"
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
            />
          </View>
        )}
      />
      <Button
        style={styles.button}
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        color="#da4167"
      />
      <TouchableOpacity
        style={styles.footer}
        onPress={() => navigation.navigate("MainScreen")}
      >
        <Text style={{ color: "white" }}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  input: {
    backgroundColor: "blue",
  },
  footer: {
    bottom: -20,
    alignItems: "center",
    backgroundColor: "#da4167",
    marginHorizontal: 180,
    borderRadius: 5,
  },
  inputs: {
    paddingHorizontal: 18,
    fontSize: 20,
    borderRadius: 5,
    paddingBottom: 35,
    color: "#000",
  },
  labels: {
    fontSize: 35,
    paddingHorizontal: 15,
    fontWeight: "bold",
    color: "#00b2ca",
  },
  button: {
    elevation: 3,
    backgroundColor: "black",
  },
});

export default AddBlockScreen;
