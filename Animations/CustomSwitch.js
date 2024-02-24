import {View,StyleSheet, Pressable} from 'react-native'
import { MotiView } from 'moti'
import { useState } from 'react';

const height = 80;
const width = 80;

export default function App(){

  const [state, setstate] = useState(true)
  return(
    <View style={style.screen}>
        <Pressable onPress={()=> setstate(!state)}>
         <MotiView 
           animate={{
            backgroundColor: state? "grey" :"red"
           }}
           transition={{
            type: "timing",
            duration: 800
           }}
           style={style.switchtrack}>


           <MotiView 
             animate={{
              translateX: state ? -(width/4): (width/4),
              }}
              transition={{
              type: "timing",
              duration: 800
             }}
            style={style.switchknob}>


              <MotiView
               animate={{
                width: state?20: 0,
                borderColor: state?"grey":"red"
               }}
               transition={{
                type: "timing",
                duration: 800
               }}
              style={style.switchicon}
              >
          
              </MotiView>
           </MotiView>
         </MotiView>
        </Pressable>
    </View>
  )
}

const style = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent :"center"
  },

  switchtrack: {
    height: height/3,
    width: width,
    borderRadius: 15,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center"
  },

  switchknob: {
    height: height/2,
    width: width/2,
    backgroundColor: "black",
    borderRadius: (height/2)/2,
    alignItems: "center",
    justifyContent: "center",
  },

  switchicon: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "white"
  }

})
