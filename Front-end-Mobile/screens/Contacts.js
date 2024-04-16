import React from "react";
import { View, Text, StyleSheet } from "react-native"; // Importation de View et Text depuis React Native

const Contacts = (props) => {
  return (
    <View style={styles.container}>
      <Text>Nos Contrat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Contacts;