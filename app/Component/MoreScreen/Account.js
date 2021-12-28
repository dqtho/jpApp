import React from "react"
import { View, Text, Image, TouchableOpacity, TextInput, Touchable, ScrollView, Alert } from "react-native"
import ImagePicker from "react-native-image-crop-picker"
import LinhTinh from "../LinhTinh"
// import { Socket } from "socket.io-client"
import Socketio from "../Socketio"

export default class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.route.params.username,
            avata: this.props.route.params.avata,
            email: this.props.route.params.email,

            facebook: this.props.route.params.facebook,
            phoneNumber: this.props.route.params.phoneNumber,
            address: this.props.route.params.address,

        }
    }
    componentDidMount() {
        console.log("params")
        console.log(this.props.route.params)
    }

    showPicker() {
        ImagePicker.openPicker({
            includeBase64: true,
            mediaType: "photo",
            compressImageQuality:0.5,
            compressImageMaxWidth:500,
            compressImageMaxHeight:500
        }).then(avata => {
            this.setState({ avata: avata.data })
        });
    }

    async handle() {
        Socketio.emit("changeAccountData", {
            password: await LinhTinh.getData("password"),
            avata: this.state.avata,
            username:this.state.username,
            facebook:this.state.facebook,
            phoneNumber:this.state.phoneNumber,
            address:this.state.address
        })
    }

    render() {
        Socketio.on("changeAccountDataResponse", async val=>{
            if(val.isSuccess){
                Alert.alert("cap nhat thong tin thanh cong")
                this.props.navigation.goBack("About")
            }else{
                Alert.alert("cap nhat thong tin khong thanh cong")
            }
        })
        return (
            <ScrollView>
                <View style={{ width: "100%", height: 150, backgroundColor: "white", marginTop: 20, flexDirection: "row" }}>
                    <View>

                        <TouchableOpacity onPress={() => this.showPicker()} style={{ alignItems: "center" }}>
                            {this.state.avata == null ? (
                                <Image
                                    style={{ width: 90, height: 90, margin: 20, borderRadius: 10 }}
                                    source={require('../../image/avata.png')}
                                />
                            ) : (
                                <Image
                                    style={{ width: 90, height: 90, margin: 20, borderRadius: 10 }}
                                    source={{ uri: `data:image/jpg;base64,${this.state.avata}` }}
                                />
                            )}
                            <Text style={{ position: "absolute", color: "blue", fontSize: 20, bottom: 15, right: 15, backgroundColor: "white", opacity: 0.8, borderRadius: 10, padding: 3 }}>sửa</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: "100%", height: 120, backgroundColor: "white", justifyContent: "center" }}>
                        <View style={{ borderColor: "#a3a3a3", height: 90, marginTop: 15, borderWidth: 0.5, borderRadius: 10, padding: 5 }}>
                            <Text style={{ color: "black", fontSize: 20 }}>Username:</Text>
                            <TextInput
                                style={{ height: 50, backgroundColor: "white", borderRadius: 10, color: "black", fontSize: 20 }}
                                onChangeText={(username) => this.setState({ username })}
                                value={this.state.username}
                                placeholder="Nhập username"
                                placeholderTextColor="#999999"
                            />
                        </View>
                    </View>
                </View>

                <View style={{ width: "100%", height: 100, backgroundColor: "white", marginTop: 25 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ChangeEmail")} style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 1, color: "black", fontSize: 20, marginTop: 10, marginLeft: 10 }}>Đổi email:</Text>
                        <Text style={{ flex: 3, fontSize: 20, color: "blue", marginTop: 10 }}>{this.state.email}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ChangePassword")} style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 1, color: "black", fontSize: 20, marginTop: 10, marginLeft: 10 }}>Đổi password:</Text>
                        <Text style={{ flex: 3, fontSize: 20, color: "blue", marginTop: 10 }}>*********</Text>

                    </TouchableOpacity>



                </View>

                <View style={{ width: "100%", height: 200, backgroundColor: "white", marginTop: 25 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "black", fontSize: 20, flex: 1, marginTop: 20, marginLeft: 10 }}>Facebook:</Text>
                        <TextInput
                            style={{ flex: 3, height: 50, backgroundColor: "white", borderRadius: 10, color: "black", fontSize: 20, borderBottomWidth: 0.5 }}
                            onChangeText={(facebook) => this.setState({ facebook })}
                            value={this.state.facebook}
                            placeholder="Nhập username"
                            placeholderTextColor="#999999"
                        />
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "black", fontSize: 20, flex: 1, marginTop: 20, marginLeft: 10 }}>SDT:</Text>
                        <TextInput
                            style={{ flex: 3, height: 50, backgroundColor: "white", borderRadius: 10, color: "black", fontSize: 20, borderBottomWidth: 0.5 }}
                            onChangeText={(phoneNumber) => this.setState({ phoneNumber:phoneNumber.replace(/[^0-9]+/, '').toString() })}
                            value={this.state.phoneNumber}
                            placeholder="Nhập phoneNumber"
                            placeholderTextColor="#999999"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "black", fontSize: 20, flex: 1, marginTop: 20, marginLeft: 10 }}>Dia chi:</Text>
                        <TextInput
                            style={{ flex: 3, height: 50, backgroundColor: "white", borderRadius: 10, color: "black", fontSize: 20, borderBottomWidth: 0.5 }}
                            onChangeText={(address) => this.setState({ address })}
                            value={this.state.address}
                            placeholder="Nhập address"
                            placeholderTextColor="#999999"
                        />
                    </View>

                </View>

                <TouchableOpacity onPress={() => this.handle()} style={{ width: "80%", height: 50, backgroundColor: "red", justifyContent: "center", alignItems: "center", marginLeft: "10%", marginTop: 50, borderRadius: 10 }}>
                    <Text style={{ color: "black", fontSize: 20 }}>cap nhat</Text>
                </TouchableOpacity>

            </ScrollView >
        )
    }
}