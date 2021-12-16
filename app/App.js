import React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./Component/HomeScreen"
import NavigationBar from './Component/NavigationBar';
import SellScreen from './Component/SellScreen';
import MoreScreen from './Component/MoreScreen';
import Login from './Component/MoreScreen/Login';
import InputOtp from './Component/MoreScreen/InputOtp';

class App extends React.Component {

  componentDidMount() {
    // StatusBar.setHidden(true);
 }

  render() {
    const Stack = createNativeStackNavigator();
    return (
      <View style={{ width: "100%", height: "100%", backgroundColor:"#e8e8e8" }}>
        <StatusBar backgroundColor={"black"} />
        <NavigationBar/>
        {/* <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}>
            <Stack.Screen name="NavigationBar" component={NavigationBar} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SellScreen" component={SellScreen} />
            <Stack.Screen name="MoreScreen" component={MoreScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="InputOtp" component={InputOtp} />
          </Stack.Navigator>
        </NavigationContainer> */}
      </View>

    );
  };
}


export default App;
