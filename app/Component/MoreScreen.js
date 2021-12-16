import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./MoreScreen/Login"
import InputOtp from "./MoreScreen/InputOtp";
import About from "./MoreScreen/About";

export default class MoreScreen extends React.Component {

    render() {
        const Stack = createNativeStackNavigator();
        return (

            <View style={{ position: "absolute", zIndex: 2, width: "100%", height: "100%", backgroundColor: "#e8e8e8" }}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: true
                        }}>
                        <Stack.Screen name="Login" component={Login} options={{
                            title: 'Dang nhap',
                            headerStyle: { backgroundColor: 'red' },
                            headerTitleStyle: { fontWeight: 'bold', }
                        }} />
                        <Stack.Screen name="InputOtp" component={InputOtp} options={{
                            title: 'Xác Thực OTP',
                            headerStyle: { backgroundColor: 'red' },
                            headerTitleStyle: { fontWeight: 'bold', } 
                        }}/>
                        <Stack.Screen name="About" component={About} options={{
                            title: 'thong tin tai khoan',
                            headerStyle: { backgroundColor: 'red' },
                            headerTitleStyle: { fontWeight: 'bold', } 
                        }}/>
                    </Stack.Navigator>
                </NavigationContainer>
                {/* <Login /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: "bold",
        // fontFamily: "monospace",
        fontSize: 25,
        color: "#2b2b2b",
        marginLeft: 10
    },
    nomalText: {
        fontSize: 20,
        color: "black",
    }

});