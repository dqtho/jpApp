import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage.js';

export default class LinhTinh {
    static deviceWidth = Dimensions.get('window').width;
    static deviceHeight = Dimensions.get('window').height;

    static async storeData(key, data) {
        try {
            await AsyncStorage.setItem(key, data);
            console.log("store data success")
        } catch (error) {
            // Error saving data
        }
    }
    static async getData(key) {
        try {
            let value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // console.log( "getData "+value)
                return value
            }
        } catch (error) {
            // console.log("get data " + error)
            return null
        }
    }

    static removeData(key) {
        console.log("remove item")
        AsyncStorage.removeItem(key)
    }

}