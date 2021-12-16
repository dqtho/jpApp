import React from "react"
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native"

export default class PostProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tieuDe: null,
            moTa: null
        }
    }

    showPicker() {
        
    }

    render() {
        return (
            <ScrollView style={{ width: "100%", height: "100%" }}>
                <View style={{ width: "100%", height: 300, backgroundColor: "white", marginTop: 20 }}>
                    <ScrollView horizontal={true} style={{ width: "100%", height: 200, backgroundColor: "red" }}>
                        <Text style={{ fontSize: 30 }}>heljgoisjfdjafjsjdflawkjdfljsfjl aofj ajflk jaslkfdjawjfdlakszjdflj</Text>
                    </ScrollView>
                    <TouchableOpacity onPress={()=>this.showPicker()} style={{ width: "100%", height: 50, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "blue", fontSize: 25 }}>them anh</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ width: "100%", height: 400, marginTop: 20, backgroundColor: "white" }}>
                    <Text style={{ color: "black", fontSize: 25, fontWeight: "bold", opacity: 0.8, marginTop: 10, marginLeft: 10 }}>Tiêu đề sản phẩm:</Text>
                    <TextInput
                        style={{ borderBottomWidth: 0.5, height: 40, backgroundColor: "white", margin: 5, paddingLeft: 5, color: "black", fontSize: 20 }}
                        onChangeText={(tieuDe) => this.setState({ tieuDe })}
                        value={this.state.tieuDe}
                        placeholder="Nhập tieu de san pham"
                        placeholderTextColor="#999999"
                    />
                    <Text style={{ color: "black", fontSize: 25, fontWeight: "bold", opacity: 0.8, marginTop: 10, marginLeft: 10 }}>Mo ta:</Text>
                    <TextInput
                        style={{ borderBottomWidth: 0.5, height: 250, backgroundColor: "white", margin: 5, paddingLeft: 5, color: "black", fontSize: 20 }}
                        onChangeText={(moTa) => this.setState({ moTa })}
                        value={this.state.moTa}
                        multiline={true}
                        placeholder="Nhập mo ta"
                        placeholderTextColor="#999999"
                    />
                </View>

            </ScrollView>
        )
    }
}