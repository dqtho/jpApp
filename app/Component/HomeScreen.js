import React from "react"
import { Text, StyleSheet, Image, TextInput, ScrollView, View, TouchableOpacity, Platform } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import NavigationBar from "./NavigationBar"
import Home from "./HomeScreen/Home.js"
import ShowItem from "./HomeScreen/ShowItem.js";

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchKeyWord: null,
            searchBarOnFocus: false
        }
    }
    render() {
        const Stack = createNativeStackNavigator();
        return (
            <View style={{ width: "100%", height: "100%", backgroundColor: "#e8e8e8" }}>
                {/* <Home /> */}
                <NavigationContainer screenOptions={{ headerShown: true }}>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={Home} key={1}
                            options={{
                                title: 'Trang chu',
                                headerShown: false,
                                headerStyle: { backgroundColor: 'red' },
                                headerTitleStyle: { fontWeight: 'bold', }
                            }}
                        />
                        <Stack.Screen name="ShowItem" component={ShowItem} key={2}
                            options={{
                                title: 'chi tiet san pham',
                                headerShown: true,
                                headerStyle: { backgroundColor: 'red' },
                                headerTitleStyle: { fontWeight: 'bold', }
                            }}
                        />
                        {/* <Stack.Screen name="InputOtp" component={InputOtp} /> */}
                    </Stack.Navigator>
                </NavigationContainer>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: "bold",
        // fontFamily: "monospace",
        fontSize: 20,
        color: "black",
        marginLeft: 10
    },
    nomalText: {
        fontSize: 15,
        color: "black",
        marginBottom: 5
    },
    searchFilter: {
        position: "absolute",
        zIndex: 1,
        width: "96%",
        height: "50%",
        backgroundColor: "#dedede",
        marginTop: 0,
        marginLeft: "2%",
        borderRadius: 5

    },
    categoryImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 20,
        marginBottom: 5
    }

});