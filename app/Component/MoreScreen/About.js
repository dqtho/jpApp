import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native"
import LinhTinh from "../LinhTinh";
import Socketio from "../Socketio";

export default class About extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            username: null,
            password: null,
            avata: null,
            facebook: null,
            address: null,
            phoneNumber: null,
            email: null,
            point: null,
            credit: null
        }
    }
    async componentDidMount() {
        Socketio.emit("getUserData", { password: await LinhTinh.getData("password") })

    }
    render() {
        Socketio.on("getUserDataResponse", val => {
            this.setState({
                id: val.id,
                username: val.username,
                password: val.password,
                avata: val.avata,
                facebook: val.facebook,
                address: val.address,
                phoneNumber: val.phoneNumber,
                // socketId: val.socketId,
                email: val.email,
                point: val.point,
                credit: val.credit
            })


            console.log(val)
        })
        return (

            <View>
                <View style={{ flexDirection: "row", width: "100%", height: 120, backgroundColor: "white", marginTop: 20, opacity: 0.8 }}>
                    {this.state.avata == null ? (
                        <Image
                            style={{ width: 80, height: 80, margin: 20, borderRadius: 10 }}
                            source={require('../../image/avata.png')}
                        />
                    ) : (
                        <Image
                            style={{ width: 80, height: 80, margin: 20, borderRadius: 10 }}
                            source={{ uri: `data:image/jpg;base64,${this.state.avata}` }}
                        />
                    )}

                    <View style={{ width: "100%", height: 120, backgroundColor: "white", justifyContent: "center" }}>
                        <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: "#a3a3a3" }}>
                            <Text style={{ fontSize: 30, marginTop: 10, color: "black", marginLeft: 10 }}>{this.state.username}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 10, color: "black" }}>point: {this.state.point}</Text>
                            <Text style={{ fontSize: 20, marginTop: 0, marginLeft: 10, color: "black" }}>credit: {this.state.credit}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width: "100%", height: 150, backgroundColor: "white", marginTop: 20 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Account", this.state)} style={{ flexDirection: "row" }}>
                        <Image
                            style={{ width: 25, height: 25, margin: 10, borderRadius: 10 }}
                            source={require('../../image/redheart.png')}
                        />
                        <Text style={{ color: "black", fontSize: 20, margin: 10 }}>Tai khoan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: "row" }}>
                        <Image
                            style={{ width: 25, height: 25, margin: 10, borderRadius: 10 }}
                            source={require('../../image/redheart.png')}
                        />
                        <Text style={{ color: "black", fontSize: 20, margin: 10 }}>Bai dang da luu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: "row" }}>
                        <Image
                            style={{ width: 25, height: 25, margin: 10, borderRadius: 10 }}
                            source={require('../../image/redheart.png')}
                        />
                        <Text style={{ color: "black", fontSize: 20, margin: 10 }}>Point</Text>
                    </TouchableOpacity>



                </View>

                <View style={{ width: "100%", height: 150, backgroundColor: "white", marginTop: 20 }}>
                    <TouchableOpacity style={{ flexDirection: "row" }}>
                        <Image
                            style={{ width: 25, height: 25, margin: 10, borderRadius: 10 }}
                            source={require('../../image/redheart.png')}
                        />
                        <Text style={{ color: "black", fontSize: 20, margin: 10 }}>Gioi thieu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: "row" }}>
                        <Image
                            style={{ width: 25, height: 25, margin: 10, borderRadius: 10 }}
                            source={require('../../image/redheart.png')}
                        />
                        <Text style={{ color: "black", fontSize: 20, margin: 10 }}>phan hoi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        LinhTinh.removeData("password")
                        this.props.navigation.navigate("Login")
                    }} style={{ flexDirection: "row" }}>
                        <Image
                            style={{ width: 25, height: 25, margin: 10, borderRadius: 10 }}
                            source={require('../../image/redheart.png')}
                        />
                        <Text style={{ color: "black", fontSize: 20, margin: 10 }}>dang xuat</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}