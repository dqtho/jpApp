import { io } from "socket.io-client"
import React, { Component } from "react"
import {
    Dimensions, AsyncStorage, StyleSheet
} from "react-native"
// import Data from "./Data.js"
const socket = io("http://192.168.1.6:3000")
export default class Socketio{

    static async emit(name, json){
        socket.emit(name, json)
    }

    static on(name, cb){
        socket.on(name, val=>{
            cb(val)
        })
    }

    static off(name, cb){
        socket.off(name, val=>
            cb(val))
    }
}