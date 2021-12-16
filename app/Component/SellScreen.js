import React from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Sell from "./SellScreen/Sell"
import PostProduct from "./SellScreen/PostProduct";

export default class SellScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const Stack = createNativeStackNavigator();

        return (
            <View style={{ width: "100%", height: "100%", backgroundColor: "#e8e8e8" }}>

                {/* <Sell /> */}
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: true }}>
                        <Stack.Screen name="Sell" component={Sell} options={{
                            title: 'Quản Lý Bán Hàng',
                            headerShown: true,
                            headerStyle: { backgroundColor: 'red' },
                            headerTitleStyle: { fontWeight: 'bold', }
                        }} />
                        <Stack.Screen name="PostProduct" component={PostProduct} options={{
                            title: 'dang san pham moi',
                            headerShown: true,
                            headerStyle: { backgroundColor: 'red' },
                            headerTitleStyle: { fontWeight: 'bold', }
                        }} />
                    </Stack.Navigator>
                </NavigationContainer>

            </View>
        )
    }
}
