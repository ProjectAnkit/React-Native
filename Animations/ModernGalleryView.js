 import { useEffect, useState,useRef } from 'react'
import {View,StyleSheet, FlatList,Image,Dimensions, ActivityIndicator, TouchableOpacity} from 'react-native'
import {API_Key} from '@env'

export default function App(){

  const [pixelimages, setpixelimages] = useState(null)
  const bigref = useRef(null)
  const smallref = useRef(null)
  const width = Dimensions.get('screen').width
  const [activeindex, setactiveindex] = useState(0)
  const IMAGE_size = 80
  const SPACING = 10

  const ScrolltoActiveIndex = (activei)=> {
    setactiveindex(activei)
    console.log("active",activei)
    bigref.current.scrollToOffset({
      offset: activei * width,
      animated: true
    })

    if((activei*(IMAGE_size+SPACING)+(IMAGE_size/2))>(width/2))
    {
      smallref.current.scrollToOffset({
        offset: (activei*(IMAGE_size+SPACING))+(IMAGE_size/2)-(width/2),
        animated: true
      })
    }
    else{
      smallref.current.scrollToOffset({
        offset: 0,
        animated: true
      })
    }
   
}

  useEffect(() => {

    const fetchdata = async()=> {
      try{
        const response = await fetch(
          "https://api.pexels.com/v1/search?query=nature&per_page=10",
          {
            headers: {
              Authorization: API_Key,
            },
          }
        );

        const imagedata = await response.json();
        setpixelimages(imagedata.photos || [])
      }
      catch(e){
        console.log(e)
      }
    }

    fetchdata()
   
  }, [])



  
  
  
 if(!pixelimages)
 {
   return <ActivityIndicator color={"black"} size={18}></ActivityIndicator>
 }

 return(
  <View style={style.screen}>
     <FlatList
      ref={bigref}
      horizontal={true} 
      pagingEnabled={true} 
      showsHorizontalScrollIndicator={false}
      data={pixelimages}
      onMomentumScrollEnd={ev=> {
        console.log(Math.round(ev.nativeEvent.contentOffset.x/width))
        ScrolltoActiveIndex(Math.round(ev.nativeEvent.contentOffset.x / width))  
      }}
      renderItem={({item})=> <View style={{width: Dimensions.get('screen').width,flex: 1}}>
        <Image
        style={{flex: 1,width: null,height: null}}
         source={{uri: item.src.portrait}}
        ></Image>
      </View>}
     />

      <FlatList
      horizontal={true} 
      ref={smallref}
      pagingEnabled={true} 
      showsHorizontalScrollIndicator={false}
      data={pixelimages}
      style={{position: "absolute",bottom: IMAGE_size}}
      contentContainerStyle={{paddingHorizontal: SPACING}}
      renderItem={({item,index})=> 
        <TouchableOpacity onPress={()=> ScrolltoActiveIndex(index)}>
          <Image
           style={[{borderRadius: 10,height: IMAGE_size,width: IMAGE_size,marginRight: SPACING,borderColor: index===activeindex?"white": "transparent",borderWidth: 2}]}
           source={{uri: item.src.portrait}}
        ></Image>
        </TouchableOpacity>
      }
     />
  </View>
)
}


const style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  }
})
