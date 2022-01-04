import React from "react"
import { Text, StyleSheet, Image, TextInput, ScrollView, View, TouchableOpacity, Platform, ShadowPropTypesIOS } from "react-native"
import LinhTinh from "../LinhTinh"
import Socketio from "../Socketio"

// import NavigationBar from "./NavigationBar"

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchKeyWord: null,
            searchBarOnFocus: false,
            newItem: []
        }
    }

    componentDidMount() {
        Socketio.emit("getNewItem")
        console.log("get new item")
    }

    itemHandle(id){
        this.props.navigation.navigate("ShowItem", {id})
    }
    render() {
        Socketio.on("getNewItemResponse", val => {
            this.setState({ newItem: val })
        })
        return (
            <View style={{ width: "100%", height: "100%", backgroundColor: "#e8e8e8" }}>
                {/* search bar */}
                <View style={{ width: "100%", height: Platform.OS == "ios" ? 100 : 80, backgroundColor: "red", marginTop: 0 }}>
                    <TextInput
                        onBlur={() => this.setState({ searchBarOnFocus: false })}
                        onFocus={() => this.setState({ searchBarOnFocus: true })}
                        style={{ marginTop: Platform.OS == "ios" ? 50 : 30, borderWidth: 0.5, height: 40, backgroundColor: "white", margin: 10, borderRadius: 7, paddingLeft: 5, color: "black", fontSize: 20 }}
                        onChangeText={(searchKeyWord) => this.setState({ searchKeyWord })}
                        value={this.state.searchKeyWord}
                        placeholder="Tìm Kiếm Sản Phẩm"
                        placeholderTextColor="#999999"
                    />
                </View>

                <ScrollView style={{ marginTop: 0 }}>



                    {/* banner */}
                    <View style={{ width: "100%", height: 200, backgroundColor: "white", marginTop: 10, }}>
                        <Text style={{ color: "red" }}>banner place</Text>
                    </View>


                    {/* category */}
                    <View style={{ backgroundColor: "white", marginTop: 20 }}>
                        <Text style={styles.headerText}>Khám Phá Danh Mục: </Text>
                        <ScrollView horizontal={true} style={{ height: "auto" }}>
                            <TouchableOpacity onPress={() => console.log("hello")} style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/tatCa.png')}
                                />
                                <Text style={styles.nomalText}>tat ca</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => console.log("hello")} style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/quanAo.png')}
                                />
                                <Text style={styles.nomalText}>quann ao</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/dienTu.png')}
                                />
                                <Text style={styles.nomalText}>dien tu</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/lamDep.png')}
                                />
                                <Text style={styles.nomalText}>lam dep</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/thucPham.png')}
                                />
                                <Text style={styles.nomalText}>thuc pham</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/dichVu.png')}
                                />
                                <Text style={styles.nomalText}>dich vu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/giaDung.png')}
                                />
                                <Text style={styles.nomalText}>gia dung</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/viecLam.png')}
                                />
                                <Text style={styles.nomalText}>viec lam</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/nhaO.png')}
                                />
                                <Text style={styles.nomalText}>nha o</Text>
                            </TouchableOpacity>


                        </ScrollView>
                    </View>

                    {/* new post listing */}
                    <View style={{ backgroundColor: "white", marginTop: 20, height: "auto", marginBottom: 100 }}>
                        <Text style={styles.headerText}>Bài Đăng Mới:</Text>
                        <View style={{ flexDirection: "row", flexWrap: 'wrap', marginTop: 20 }}>

                            {this.state.newItem.map((val, i) => {
                                return (
                                    <TouchableOpacity onPress={()=>this.itemHandle(val.id)} style={{ width: "48%", height: LinhTinh.deviceWidth / 2, margin: "1%", backgroundColor: "white", borderWidth: 0.5, borderColor: "red", borderRadius: 10 }} id={i}>
                                        <View style={{ width: "96%", height: "64%", backgroundColor: "white", marginTop: "2%", marginLeft: "2%", borderRadius: 5 }}>
                                            <Image
                                                style={{ width: "100%", height: "100%", borderRadius: 10 }}
                                                source={{ uri: `data:image/jpg;base64,${val.image}` }}
                                            />
                                        </View>
                                        <View style={{ width: "96%", height: "30%", backgroundColor: "white", marginTop: "2%", marginLeft: "2%", borderRadius: 5 }}>
                                            <Text numberOfLines={1} style={{ fontSize: 17, color: "black" }}>{val.tieuDe}</Text>
                                            <Text style={{ position: "absolute", bottom: 20, fontSize: 15, color: "red" }}>{val.gia}</Text>
                                            <Text style={{ position: "absolute", bottom: 0, fontSize: 15, opacity: 0.7, color: "black" }}>{val.khuVuc}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}



                            

                        </View>

                    </View>

                    {/* search filter */}
                    {this.state.searchBarOnFocus ? (
                        <View style={styles.searchFilter}>

                        </View>
                    ) : null}

                    {/* <NavigationBar/> */}
                    {/* <StatusBar translucent barStyle="light-content" /> */}


                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: "bold",
        // fontFamily: "monospace",
        fontSize: 20,
        color: "black",
        marginLeft: 10
    },
    nomalText: {
        fontSize: 15,
        color: "black",
        marginBottom: 5
    },
    searchFilter: {
        position: "absolute",
        zIndex: 1,
        width: "96%",
        height: "50%",
        backgroundColor: "#dedede",
        marginTop: 0,
        marginLeft: "2%",
        borderRadius: 5

    },
    categoryImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 20,
        marginBottom: 5
    }

});