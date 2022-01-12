import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./MoreScreen/Login"
import InputOtp from "./MoreScreen/InputOtp";
import About from "./MoreScreen/About";
import Account from "./MoreScreen/Account";
import ChangeEmail from "./MoreScreen/ChangeEmail";
import ChangePassword from "./MoreScreen/ChangePassword";

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
                        <Stack.Screen name="Login" component={Login} key={1}
                            options={{
                                id: 1,
                                title: 'Dang nhap',
                                headerStyle: { backgroundColor: 'red' },
                                headerTitleStyle: { fontWeight: 'bold', }
                            }}
                        />
                        <Stack.Screen name="InputOtp" component={InputOtp} key={2}
                            options={{
                                id: 2,
                                title: 'Xác Thực OTP',
                                headerStyle: { backgroundColor: 'red' },
                                headerTitleStyle: { fontWeight: 'bold', }
                            }}
                        />
                        <Stack.Screen name="About" component={About} key={3}
                            options={{
                                id: 3,
                                title: 'thong tin tai khoan',
                                headerShown: true,
                                headerStyle: { backgroundColor: 'red' },

                                headerTitleStyle: { fontWeight: 'bold', }
                            }} 
                            />
                        <Stack.Screen name="Account" component={Account} key={4}
                            options={{
                                id: 4,
                                title: 'chinh sua thong tin tai khoan',
                                headerStyle: { backgroundColor: 'red' },
                                headerTitleStyle: { fontWeight: 'bold', }
                            }} 
                        />
                        <Stack.Screen name="ChangeEmail" component={ChangeEmail} key={5}
                            options={{
                                id: 5,
                                title: 'thay đổi địa chỉ email',
                                headerStyle: { backgroundColor: 'red' },
                                headerTitleStyle: { fontWeight: 'bold', }
                            }} 
                        />
                        <Stack.Screen name="ChangePassword" component={ChangePassword} key={6}
                            options={{
                                id: 6,
                                title: 'thay đổi mat khau',
                                headerStyle: { backgroundColor: 'red' },
                                headerTitleStyle: { fontWeight: 'bold', }
                            }} 
                        />
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