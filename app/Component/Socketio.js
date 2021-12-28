import { io } from "socket.io-client"
import React, { Component } from "react"
import {
    Dimensions, AsyncStorage, StyleSheet
} from "react-native"
// import Data from "./Data.js"
const socket = io("http://192.168.1.7:3000")
export default class Socketio{

    static emit(name, json){
        socket.emit(name, json)
    }

    static on(name, cb){
        socket.on(name, val=>{
            cb(val)
        })
    }
}