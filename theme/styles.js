// theme/styles.js
import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: 20,
  },

  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
  },

  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },

  text: {
    color: colors.text,
  },

  muted: {
    color: colors.muted,
  },
});