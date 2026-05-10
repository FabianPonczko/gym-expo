// LoadingOverlay.js
import { ActivityIndicator } from 'react-native'; 
import { View, StyleSheet } from 'react-native';

const LoadingOverlay = ({ cargando }) => {
  if (!cargando) return null;

  return (
    <View style={styles.overlay}>

      <View >
        <ActivityIndicator
          size="large"
          color="#4bad33"
          />
      </View>

    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "rgba(14, 16, 18, 0.93)",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 999,
  },

  
});

