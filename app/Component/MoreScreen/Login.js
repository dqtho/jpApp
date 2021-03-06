import { VISITOR_KEYS } from "@babel/types"
import React from "react"
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Keyboard, Alert } from "react-native"
import md5 from "md5"
import LinhTinh from "../LinhTinh"
import Socketio from "../Socketio"


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            retypePassword: null,


            isSignIn: true,
            alert: null
        }
    }

    alert(msg) {
        Alert.alert(msg)
        // this.setState({ alert: msg })
        // setTimeout(() => { this.setState({ alert: null }) }, 3000)


    }

    async componentDidMount() {
        // console.log(await LinhTinh.getData("hello") == undefined)
        if (await LinhTinh.getData("password") != undefined) {
            this.props.navigation.navigate("About")
        }
    }

    signInhandle() {
        console.log(md5(this.state.email + this.state.password))
        let signIn = () => {
            Socketio.emit("signIn", { password: md5(this.state.email.toLowerCase() + this.state.password) })
        }
        Keyboard.dismiss()
        Socketio.on("signInResponse", async val => {
            if (val.isSuccess) {
                // console.log(val)
                // await LinhTinh.removeData("email")
                // await LinhTinh.removeData("password", val.password)
                // await LinhTinh.removeData("id", val.id)
                // await LinhTinh.removeData("avata", val.avata)
                await LinhTinh.storeData("email", this.state.email)
                await LinhTinh.storeData("password", val.password)
                // await LinhTinh.storeData("id", val.id)
                // await LinhTinh.storeData("avata", val.avata)
                this.props.navigation.replace("About")
            } else {
                console.log("sign in false")
                this.alert("dang nhap khong thanh cong")
            }

        })
        this.state.email == null || this.state.password == null ? this.alert("Vui l??ng nh???p ?????y ????? th??ng tin") :
            this.state.email.indexOf("@") == -1 ? this.alert("Email kh??ng h???p l???") :
                this.state.password.length < 8 ? this.alert("M???t kh???u ph???i t??? 8 k?? t??? tr??? l??n") : signIn()
    }

    signUpHandle() {

        let signUp = () => {
            Socketio.emit("signUpGetOtp", {
                type: "getOTP",
                email: this.state.email,
                password: md5(this.state.email + this.state.password)
            })
            this.props.navigation.navigate("InputOtp")
            // Socketio.on("signUpResponse", val =>{
            //     console.log(val)
            // })
        }

        Keyboard.dismiss()
        this.state.email == null || this.state.password == null || this.state.retypePassword == null ? this.alert("Vui l??ng nh???p ?????y ????? th??ng tin") :
            this.state.email.indexOf("@") == -1 ? this.alert("Email kh??ng h???p l???") :
                this.state.password.length < 8 ? this.alert("M???t kh???u ph???i t??? 8 k?? t??? tr??? l??n") :
                    this.state.password != this.state.retypePassword ? this.alert("M???t kh???u kh??ng kh???p") : signUp()






    }

    render() {
        return (
            <View style={{ position: "absolute", width: "100%", height: "100%", zIndex: 20 }}>
                {/* <View style={{ width: "100%", height: 60, backgroundColor: "red", marginTop: 0, justifyContent: "center" }}>
                    <Text style={styles.headerText}>????ng Nh???p:</Text>
                </View> */}
                {this.state.alert != null ? (
                    <View style={{ margin: 10, marginTop: 50, width: "auto", height: 150 }}>
                        <Text style={[styles.nomalText, { fontSize: 20, borderWidth: 1, borderRadius: 10, padding: 10, borderColor: "red", color: "red", opacity: 0.5 }]}>{this.state.alert}</Text>
                    </View>
                ) : null}
                <View style={{ position: "absolute", bottom: 100, width: "90%", height: 500, marginLeft: "5%", }}>
                    <View style={{ backgroundColor: "white", borderRadius: 10, height: 300 }}>
                        <Text style={styles.nomalText}>email</Text>
                        <TextInput
                            style={{ borderWidth: 0.5, height: 40, backgroundColor: "white", margin: 10, borderRadius: 7, paddingLeft: 5, color: "black", fontSize: 20 }}
                            onChangeText={(email) => this.setState({ email:email.toLowerCase() })}
                            value={this.state.email}
                            placeholder="Nh???p ?????a ch??? email"
                            placeholderTextColor="#999999"
                            keyboardType="email-address"

                        />
                        <Text style={styles.nomalText}>M???t Kh???u:</Text>

                        <TextInput
                            style={{ borderWidth: 0.5, height: 40, backgroundColor: "white", margin: 10, borderRadius: 7, paddingLeft: 5, color: "black", fontSize: 20, marginBottom: 20 }}
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                            placeholder="Nh???p m???t kh???u"
                            placeholderTextColor="#999999"
                        />
                        {!this.state.isSignIn ? (
                            <View>
                                <Text style={styles.nomalText}>Nh???p L???i M???t Kh???u:</Text>

                                <TextInput
                                    style={{ borderWidth: 0.5, height: 40, backgroundColor: "white", margin: 10, borderRadius: 7, paddingLeft: 5, color: "black", fontSize: 20, marginBottom: 20 }}
                                    onChangeText={(retypePassword) => this.setState({ retypePassword })}
                                    value={this.state.retypePassword}
                                    placeholder="Nh???p l???i m???t kh???u"
                                    placeholderTextColor="#999999"
                                />
                            </View>

                        ) : null}
                    </View>
                    <View style={{ backgroundColor: "white", width: "100%", height: 180, marginTop: 15, borderRadius: 10 }}>
                        <TouchableOpacity
                            onPress={() => { this.state.isSignIn ? this.signInhandle() : this.signUpHandle() }}
                            style={{ borderWidth: 0.5, margin: 10, marginTop: 30, height: 40, borderRadius: 10, justifyContent: "center", alignItems: "center" }}
                        >
                            {this.state.isSignIn ? (
                                <Text style={[styles.nomalText, { marginLeft: 0 }]}>????ng Nh???p</Text>
                            ) : (
                                <Text style={[styles.nomalText, { marginLeft: 0 }]}>????ng K??</Text>
                            )}
                        </TouchableOpacity>
                        <View style={{ alignItems: "center", }}>
                            <TouchableOpacity onPress={() => { this.setState({ isSignIn: !this.state.isSignIn }) }}>
                                {this.state.isSignIn ? (
                                    <Text style={{ fontSize: 15, color: "blue", margin: 5 }}> Ch??a c?? t??i kho???n? ????ng k?? ngay</Text>

                                ) : (
                                    <Text style={{ fontSize: 15, color: "blue", margin: 5 }}> ???? c?? t??i kho???n? ????ng nh???p ngay</Text>

                                )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.alert("heloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo") }} style={{}}>
                                <Text style={{ fontSize: 15, color: "blue" }}>Qu??n m???t kh???u</Text>
                            </TouchableOpacity>
                        </View>


                    </View>


                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    headerText: {
        fontWeight: "bold",
        fontFamily: "monospace",
        fontSize: 25,
        color: "#2b2b2b",
        marginLeft: 10
    },
    nomalText: {
        fontSize: 25,
        color: "black",
        marginLeft: 10,
        opacity: 0.7
    }

});