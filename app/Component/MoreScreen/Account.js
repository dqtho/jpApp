import React from "react"
import { View, Text, Image, TouchableOpacity, TextInput, Touchable } from "react-native"
import ImagePicker from "react-native-image-crop-picker"

export default class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.route.params.username,
            avata: this.props.route.params.avata,
            email: this.props.route.params.email
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
        }).then(avata => {
            this.setState({ avata: avata.data })
        });
    }

    render() {
        return (
            <View>
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

                <View style={{ width: "100%", height: 200, backgroundColor: "white", marginTop: 20 }}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("ChangeEmail")} style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 1, color: "black", fontSize: 20, marginTop: 10, marginLeft: 10 }}>Đổi email:</Text>
                        <Text style={{ flex: 3, fontSize: 20, color: "blue", marginTop:10 }}>{this.state.email}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("ChangePassword")} style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 1, color: "black", fontSize: 20, marginTop: 10, marginLeft: 10 }}>Đổi password:</Text>
                    </TouchableOpacity>

                    

                </View>
            </View >
        )
    }
}