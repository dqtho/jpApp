import React from "react"
import { Text, StyleSheet, Image, TextInput, ScrollView, View, TouchableOpacity, Alert } from "react-native"
import Socketio from "../Socketio"
import LinhTinh from "../LinhTinh"

import NavigationBar from "../NavigationBar"

export default class InputOtp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            serverOtp: null,
            userOtp: null,
            alert: null
        }
    }

    sentButton() {
        if (this.state.userOtp == null) {
            this.alert("vui long nhap otp")
        }
        else if (this.state.userOtp == this.state.serverOtp) {
            Socketio.emit("signUp", { email: this.state.email, password: this.state.password })
        } else {
            this.alert("otp khong dung")
        }
    }
    componentDidMount() {

    }
    alert(msg) {
        Alert.alert(msg)


    }
    render() {
        Socketio.on("signUpGetOtpResponse", val => {
            console.log(val.otp)
            if (val.isSuccess) {
                this.setState({ password: val.password, email: val.email, serverOtp: val.otp })
            } else {
                this.alert("email da duoc dang ky")
                this.props.navigation.navigate("Login")
            }

        })
        Socketio.on("signUpResponse", async val => {
            await LinhTinh.storeData("email", this.state.email)
            await LinhTinh.storeData("password", val.password)
            this.props.navigation.navigate("About")
        })
        return (
            <View style={{ width: "100%", height: "100%" }}>
                {this.state.alert != null ? (
                    <View style={{ margin: 10, marginTop: 50, width: "auto", height: 150 }}>
                        <Text style={[{ fontSize: 20, borderWidth: 1, borderRadius: 10, padding: 10, borderColor: "red", color: "red", opacity: 0.5 }]}>{this.state.alert}</Text>
                    </View>
                ) : null}
                <View style={{ position: "absolute", width: "95%", left: "2.5%", bottom: 200, height: 200, backgroundColor: "white", borderRadius: 10, padding: 10, alignItems: "center" }}>
                    <Text style={{ color: "black", fontSize: 20 }}>Vui lòng nhập mã OTP được gửi đến email của bạn</Text>
                    <TextInput

                        style={{ marginTop: 30, borderWidth: 0.5, width: "90%", height: 40, backgroundColor: "white", margin: 10, borderRadius: 7, paddingLeft: 5, color: "black", fontSize: 20 }}
                        onChangeText={(userOtp) => this.setState({ userOtp })}
                        value={this.state.userOtp}
                        placeholder="Nhập mã OTP"
                        placeholderTextColor="#999999"
                        keyboardType="number-pad"
                    />
                    <TouchableOpacity onPress={() => { this.sentButton() }} style={{ width: 150, heigh: 40, borderWidth: 0.5, alignItems: "center", padding: 5, opacity: 0.7, borderRadius: 10, }}>
                        <Text style={{ color: "black", fontSize: 20 }}>gửi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}