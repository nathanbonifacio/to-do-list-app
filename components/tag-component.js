import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TagComponent = ({ name, color }) => {
  return (
    <View style={[styles.tag, { backgroundColor: color }]}> 
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default TagComponent;
