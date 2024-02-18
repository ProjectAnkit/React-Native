//HomeScreen

import {View,StyleSheet,Text,FlatList, ActivityIndicator, TextInput, TouchableOpacity, Animated} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Newsbox from './Components/Newsbox';
import {API_KEY} from '@env';

export default function HomeScreen(){

   const flatlistref = useRef(null)
   const [findex, setfindex] = useState(0)
   const [viewport, setviewport] = useState(0.5)
   const [loading, setloading] = useState(true)
   const [data, setdata] = useState(null)
   const [searchtxt, setsearchtxt] = useState("")
   const [totalArticles, setTotalArticles] = useState(0);
   

   useEffect(() => {
     (async()=> {
       try{
        var response = await fetch(`https://newsapi.org/v2/everything?q=keyword&apiKey=${API_KEY}`)
        var jsondata = await response.json();
        setdata(jsondata);
        setTotalArticles(data?.articles?.length)
       }
       catch(e){
        console.error("error while fetching")
       }
       finally{
        setloading(false)
       }
     })()
   }, [])


   useEffect(() => {
    if(flatlistref.current)
    {
        flatlistref.current.scrollToIndex({animated: true , viewOffset: 0,index: findex ?? 0,viewPosition: viewport ?? 0})
    }
   
   }, [findex,viewport])
   

   if(loading)
   {
     return(
        <View style={style.loadingscreen}>
            <ActivityIndicator color={"black"} size={18}></ActivityIndicator>
        </View>
     )
   }

   return(
    <View style={style.screenbackground}>
         {Scrollbuttons(setfindex, findex, totalArticles)}
        <FlatList
        ref={flatlistref}
        initialScrollIndex={findex}
        scrollEnabled={true}
        onScrollToIndexFailed={(e)=> console.log(e)}
        ListHeaderComponent={()=> Headercomp(searchtxt, setsearchtxt,findex,setfindex)}
        data={data.articles}
        keyExtractor={(item,index)=> index.toString()}
        renderItem={({item,index})=> <Newsbox item={item} index={index} findex={findex}/>}
        ItemSeparatorComponent={()=>spacing()}
        />
    </View>
   )
}

const style = StyleSheet.create(
    {
        headerstyling: {
            alignItems: "center",
            flexDirection: "column",
            marginBottom: 10,
        },

        titlestyling: {
            backgroundColor: "white",
            borderRadius: 10,
            width: "90%",
            height: 60,
            marginBottom: 10,
            marginRight: "auto",
            marginLeft: "auto",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 20,
            elevation: 10,
            shadowOffset: (2,-2),
            shadowColor:"black",
            opacity: 1
        },

        loadingscreen : {
            backgroundColor: "#ffd966",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },

        screenbackground : {
            paddingTop: 50,
            backgroundColor: "#ffd966",
            flex: 1,
        },
    }
)

function Scrollbuttons(setfindex, findex, totalArticles) {
    return <View style={{ flexDirection: "row", marginLeft: "auto", marginRight: "auto" }}>
        <TouchableOpacity onPress={() => setfindex(findex == (totalArticles-1) ? findex : findex + 1)}>
            <View style={{ backgroundColor: "white", borderRadius: 10, height: 50, width: 50, margin: 10, alignItems: "center", justifyContent: "center" }}>
                <AntDesign name="arrowdown" size={24} color="black" />
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setfindex(findex == 0 ? findex : findex - 1)}>
            <View style={{ backgroundColor: "white", borderRadius: 10, height: 50, width: 50, margin: 10, alignItems: "center", justifyContent: "center" }}>
                <AntDesign name="arrowup" size={24} color="black" />
            </View>
        </TouchableOpacity>
    </View>;
}

function spacing() {
    return <View style={{ height: 10 }}></View>;
}

function Headercomp(searchtxt, setsearchtxt) {
    return(
            <View style={style.titlestyling}>
             <TextInput 
             placeholder='Search the latest news' 
             maxLength={35} 
             value={searchtxt} 
             onChangeText={(txt)=> setsearchtxt(txt)}>
            </TextInput>
            
            <Ionicons 
            name="person-circle" 
            size={50} 
            color="#ffd966" 
            style={{ alignSelf: "center" }} />
            </View>
    )
}


//NewsBox

import React from 'react'
import { Linking } from 'react-native'
import { View ,StyleSheet,Text,Image, TouchableOpacity} from 'react-native'

const openurl = (url)=>{
  Linking.openURL(url).catch(e => console.error("error while redirecting"))
}

const Newsbox = (props) => {
  
  const {title,urlToImage,content,url} = props.item
  
  const redirecttoweb = ()=> {
    openurl(url)
  }

  
  return (
   <TouchableOpacity onPress={()=> redirecttoweb()}>
      <View style={[styles.framestyle,{opacity: props.index==props.findex?1:0.4}]}>
      
      <View>
        <Image source={urlToImage?{uri: urlToImage}: {uri :"https://thumbs.dreamstime.com/z/influencer-recording-video-multiple-devices-jpg-happy-playing-cinetic-sand-using-214721040.jpg?ct=jpeg"}} style={styles.imagestyle}/>
      </View>

      <View>
        <Text style={{fontSize: 18,color: "black",fontWeight: "500"}}>{title}</Text>
      </View>

      <View>
        <Text style={{fontSize: 14,color: "grey",fontWeight: "400"}}>{content}</Text>
      </View>
      
    </View>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create(
    {
        imagestyle: {
           height: 140,
           width: "100%",
           borderRadius: 10
        },

        framestyle : {
            borderColor: "#faedae",
            backgroundColor: "#faedae",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: 10,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 10,
            borderWidth: 3,
            height: "auto",
            width: "90%",
        },
    }
)
export default Newsbox
