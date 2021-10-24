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

const ProfileFormScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    var patientId = data["patientId"];
    var age = data["age"];
    var sex = data["sex"];
    var ethnicity = data["ethnicity"];
    var insurance = data["insurance"];

    const formattedData = {
      patientId: patientId,
      age: age,
      sex: sex,
      ethnicity: ethnicity,
      insurance: insurance,
    };
    axios
      .post("http://localhost:5000/patients/add", formattedData)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    setTimeout(() => {
      navigation.navigate("MainScreen");
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Profile</Text>
      <Controller
        control={control}
        name="patientId"
        render={({ field: { onChange, value, onBlur } }) => (
          <View>
            <Text style={styles.labels}>Full Name</Text>
            <TextInput
              style={styles.inputs}
              placeholder="What's your name?"
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
        name="age"
        render={({ field: { onChange, value, onBlur } }) => (
          <View>
            <Text style={styles.labels}>Age</Text>
            <TextInput
              style={styles.inputs}
              placeholder="How old are you?"
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
        name="sex"
        render={({ field: { onChange, value, onBlur } }) => (
          <View>
            <Text style={styles.labels}>Sex</Text>
            <TextInput
              style={styles.inputs}
              placeholder="What is your sex?"
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
        name="ethnicity"
        render={({ field: { onChange, value, onBlur } }) => (
          <View>
            <Text style={styles.labels}>Ethnicity</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Which ethnic group(s) do you fall in?"
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
        name="insurance"
        render={({ field: { onChange, value, onBlur } }) => (
          <View>
            <Text style={styles.labels}>Insurance Carrier</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Who is your insurance carrier?"
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
  title: {
    fontSize: 40,
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: "center",
  },
});

export default ProfileFormScreen;
