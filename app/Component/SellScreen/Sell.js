import React from "react"
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native"
import LinhTinh from "../LinhTinh"

export default class SellScreen extends React.Component {
    constructor(props) {
        super(props)
       
    }

 

    async postProductHandle() {
        if(await LinhTinh.getData("password") == undefined){
            Alert.alert("vui long dang nhap")
        }else{
            this.props.navigation.navigate("PostProduct")
        }
            
        
        
    }

    render() {
        return (
            <View style={{ width: "100%", height: "100%", backgroundColor: "#e8e8e8" }}>
                
                    <View style={{ position: "absolute", bottom: 80, width: "90%", height: "30%", zIndex: 2, margin: 10, marginLeft: "5%" }}>
                        <TouchableOpacity onPress={() => this.postProductHandle()} style={{ flex: 1, height: 60, width: "100%", marginTop: 10, backgroundColor: "white", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                            <Text style={[styles.nomalText, { fontSize: 30 }]}>Đăng Sản Phẩm Mới</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
                            <TouchableOpacity style={{ flex: 1, alignItems: "center", height: 100, marginTop: 10, width: "auto", backgroundColor: "white", justifyContent: "center", borderRadius: 10 }}>
                                <Text style={styles.nomalText}>Đang Bán</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, margin: 10, alignItems: "center", height: 100, marginTop: 10, backgroundColor: "white", justifyContent: "center", borderRadius: 10 }}>
                                <Text style={styles.nomalText}>Chờ Duyệt</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, alignItems: "center", height: 100, marginTop: 10, backgroundColor: "white", justifyContent: "center", borderRadius: 10 }}>
                                <Text style={styles.nomalText}>Bị Từ Chối</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                



            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: "bold",
        // fontFamily: "monospace",
        fontSize: 25,
        color: "#2b2b2b",
        marginLeft: 10
    },
    nomalText: {
        fontSize: 20,
        color: "black",
    }

});