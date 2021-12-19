import React from "react";
import { View, Text, Image } from "react-native"

export default class About extends React.Component {
    render() {
        return (
            <View>
                <View style={{ flexDirection: "row", width: "100%", height: 120, backgroundColor: "white", marginTop: 20, opacity:0.8}}>
                    <Image
                        style={{ width: 80, height: 80, margin: 20, borderRadius: 10 }}
                        source={require('../../image/nhaO.png')}
                    />
                    <View style={{ width: "100%", height: 120, backgroundColor: "white", justifyContent: "center" }}>
                        <View style={{ flex: 1, borderBottomWidth:0.5, borderColor:"#a3a3a3" }}>
                            <Text style={{fontSize:30, marginTop:10, color:"black", marginLeft:10}}>username here</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize:20, marginTop:5, marginLeft:10, color:"black" }}>point here</Text>
                            <Text style={{ fontSize:20, marginTop:0, marginLeft:10, color:"black" }}>account health</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}