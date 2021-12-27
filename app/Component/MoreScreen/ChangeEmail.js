import md5 from "md5"
import React from "react"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import LinhTinh from "../LinhTinh"
import Socketio from "../Socketio"

export default class ChangeEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newEmail: null,
            password: null,
            userOtp: null,
            serverOtp: null,
            // newPassword: null
        }
    }

    async componentDidMount() {
        // this.setState({ password: await LinhTinh.getData("password") })
    }

    getOtpHandle() {
        if (this.state.newEmail == null) {
            Alert.alert("vui long nhap dia chi email")
        } else if (this.state.newEmail.indexOf("@") == -1) {
            Alert.alert("email khong hop le")
        } else {
            Socketio.emit("changeEmailGetOtp", { password: this.state.password, email: this.state.newEmail })
            Alert.alert("vui long check mail de lay ma otp")
        }
    }
    async handle() {
        if (this.state.newEmail == null || this.state.userOtp == null) {
            Alert.alert("vui long nhap day du thong tin")
        } else if (this.state.newEmail.indexOf("@") == -1) {
            Alert.alert("email khong hop le")
        } else if (this.state.userOtp != this.state.serverOtp) {
            Alert.alert("ma OTP khong chinh xac")
        } else if (await LinhTinh.getData("password") != md5(await LinhTinh.getData("email") + this.state.password)) {
            console.log(md5(await LinhTinh.getData("email") + this.state.password))
            console.log(await LinhTinh.getData("email"))
            console.log(await LinhTinh.getData("password"))
            Alert.alert("mat khau khong chinh xac")
        } else {
            Socketio.emit("changeEmail", {
                email: this.state.newEmail,
                password: await LinhTinh.getData("password"),
                newPassword: md5(this.state.newEmail + this.state.password)
            })
        }
    }
    render() {
        Socketio.on("changeEmailGetOtpResponse", val => {
            this.setState({ serverOtp: val.otp })
            console.log(val)
        })
        Socketio.on("changeEmailResponse", val => {
            if (val.isSuccess) {
                Alert.alert("doi email thanh cong")
                LinhTinh.storeData("email", this.state.newEmail)
                LinhTinh.storeData("password", val.newPassword)
                this.props.navigation.navigate("About")
            } else {
                Alert.alert(val.msg)
            }
        })
        return (
            <View>
                <Text style={{ color: "black", fontSize: 20, marginTop: 20, marginLeft: 10 }}> Email moi:</Text>
                <View>
                    <TextInput
                        style={{ height: 50, backgroundColor: "white", borderRadius: 10, color: "black", fontSize: 20, marginLeft: 10, marginTop: 10 }}
                        onChangeText={(newEmail) => this.setState({ newEmail: newEmail.toLowerCase() })}
                        value={this.state.newEmail}
                        placeholder="Nhập email"
                        placeholderTextColor="#999999"
                        keyboardType="email-address"
                    />
                    <TouchableOpacity onPress={() => this.getOtpHandle()} style={{ position: "absolute", right: 10, top: 20 }}>
                        <Text style={{ color: "blue", fontSize: 20 }}>lay ma</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: "black", fontSize: 20, marginTop: 20, marginLeft: 10 }}> Ma OTP:</Text>
                <TextInput
                    style={{ height: 50, backgroundColor: "white", borderRadius: 10, color: "black", fontSize: 20, marginLeft: 10, marginTop: 10 }}
                    onChangeText={(userOtp) => this.setState({ userOtp })}
                    value={this.state.userOtp}
                    placeholder="Nhập ma OTP"
                    placeholderTextColor="#999999"
                    keyboardType="number-pad"
                />

                <Text style={{ color: "black", fontSize: 20, marginTop: 20, marginLeft: 10 }}> Nhap mat khau:</Text>
                <TextInput
                    style={{ height: 50, backgroundColor: "white", borderRadius: 10, color: "black", fontSize: 20, marginLeft: 10, marginTop: 10 }}
                    onChangeText={(password) => this.setState({password })}
                    value={this.state.password}
                    placeholder="Nhập mat khau"
                    placeholderTextColor="#999999"
                />

                <TouchableOpacity onPress={() => this.handle()} style={{ width: "80%", height: 50, backgroundColor: "red", justifyContent: "center", alignItems: "center", marginLeft: "10%", marginTop: 20, borderRadius: 10 }}>
                    <Text style={{ color: "black", fontSize: 20 }}>doi mail</Text>
                </TouchableOpacity>
            </View>
        )
    }
}