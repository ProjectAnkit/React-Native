import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.symbol}>
       {[...Array(3).keys()].map((index) => {
          return (
            <MotiView 
            from={{
              opacity: 1,
              scale: 1
            }}
            animate={{
              opacity: 0,
              scale: 3
            }}
            transition={{
              type: "timing",
              duration: 1700,
              loop: true,
              delay: index*400,
              repeatReverse: false
            }}
            key={index} style={[StyleSheet.absoluteFillObject,styles.symbol]}>
              
            </MotiView>
          );
        })}
        <Feather name="phone-call" size={34} color="white" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  symbol: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  }
});
//dont forgot to consider documentation
