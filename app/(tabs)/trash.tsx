import { StyleSheet, Text, View } from "react-native";

export default function TrashScreen() {
  return <View style={styles.container}>
    <Text>Trash</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});