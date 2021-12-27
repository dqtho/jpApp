import React from "react"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import LinhTinh from "../LinhTinh"
import Socketio from "../Socketio"
import md5 from "md5"

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: null,
            oldPassword: null,
            newPassword: null,
            retypeNewPassword: null
        }
    }

    async componentDidMount() {
        this.setState({ email: await LinhTinh.getData("email") })
    }

    handle() {
        if (this.state.newPassword == null || this.state.retypeNewPassword == null || this.state.oldPassword == null) {
            Alert.alert("vui long nhap day du thong tin")
        } else if (this.state.newPassword != this.state.retypeNewPassword) {
            Alert.alert("mat khau khong khop")
        } else {
            Socketio.emit("changePassword", {
                oldPassword: md5(this.state.email + this.state.oldPassword),
                newPassword: md5(this.state.email + this.state.newPassword),
            })
        }
    }

    render() {
        Socketio.on("changePasswordResponse", async val=>{
            console.log(val)
            if(val.isSuccess){
                await LinhTinh.storeData("password", val.newPassword)
                Alert.alert("doi mat khau thanh cong")
                this.props.navigation.navigate("About")

            }else{
                Alert.alert("doi mat khau khong thanh cong")
            }
        })
        return (
            <View>
                <Text style={{ color: "black", fontSize: 20, marginTop: 20, marginLeft: 10 }}> Nhap mat khau:</Text>
                <View>
                    <TextInput
                        style={{ height: 50, backgroundColor: "white", borderRadius: 10, color: "black", fontSize: 20, marginLeft: 10, marginTop: 10 }}
                        onChangeText={(oldPassword) => this.setState({ oldPassword })}
                        value={this.state.oldPassword}
                        placeholder="Nhập password"
                        placeholderTextColor="#999999"
                    />
                </View>
                <Text style={{ color: "black", fontSize: 20, marginTop: 20, marginLeft: 10 }}> mat khau moi:</Text>
                <TextInput
                    style={{ height: 50, backgroundColor: "white", borderRadius: 10, color: "black", fontSize: 20, marginLeft: 10, marginTop: 10 }}
                    onChangeText={(newPassword) => this.setState({ newPassword })}
                    value={this.state.newPassword}
                    placeholder="Nhập mat khau moi"
                    placeholderTextColor="#999999"
                />
                <Text style={{ color: "black", fontSize: 20, marginTop: 20, marginLeft: 10 }}> Nhap lai mat khau:</Text>
                <TextInput
                    style={{ height: 50, backgroundColor: "white", borderRadius: 10, color: "black", fontSize: 20, marginLeft: 10, marginTop: 10 }}
                    onChangeText={(retypeNewPassword) => this.setState({ retypeNewPassword })}
                    value={this.state.retypeNewPassword}
                    placeholder="Nhập lai mat khau moi"
                    placeholderTextColor="#999999"
                />

                <TouchableOpacity onPress={() => this.handle()} style={{ width: "80%", height: 50, backgroundColor: "red", justifyContent: "center", alignItems: "center", marginLeft: "10%", marginTop: 20, borderRadius: 10 }}>
                    <Text style={{ color: "black", fontSize: 20 }}>doi mat khau</Text>
                </TouchableOpacity>
            </View>
        )
    }
}