import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen({ children }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#020617",
      }}
    >
      {children}
    </SafeAreaView>
  );
}

// llama asi:

// import Screen from "../components/Screen";

// return (
//   <Screen>
//     ...
//   </Screen>
// )