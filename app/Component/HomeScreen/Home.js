import React from "react"
import { Text, StyleSheet, Image, TextInput, ScrollView, View, TouchableOpacity, Platform, Keyboard } from "react-native"
import LinhTinh from "../LinhTinh"
import Socketio from "../Socketio"

// import NavigationBar from "./NavigationBar"
import RNPickerSelect from 'react-native-picker-select'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'


export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.tinh = ["Toàn Nhật Bản   ", "愛知県", "秋田県", "青森県", "千葉県", "愛媛県", "福井県", "福岡県", "福島県", "岐阜県", "群馬県", "広島県", "北海道", "兵庫県", "茨城県", "石川県", "岩手県", "香川県", "鹿児島県", "神奈川県", "高知県", "熊本県", "京都府", "三重県", "宮城県", "宮崎県", "長野県", "長崎県", "奈良県", "新潟県", "大分県", "岡山県", "沖縄県", "大阪府", "佐賀県", "埼玉県", "滋賀県", "島根県", "静岡県", "栃木県", "徳島県", "東京都", "鳥取県", "富山県", "和歌山県", "山形県", "山口県", "山梨県"]
        this.tinh.map((val, i) => {
            this.tinh[i] = { label: val, value: val, color: "black", id: i }
        })
        this.state = {
            searchKeyWord: null,
            danhMuc: null,
            khuVuc: null,
            mucGiaTu: null,
            mucGiaDen: null,
            sapXepTheo: "time",


            searchBarOnFocus: false,
            newItem: []
        }
    }

    componentDidMount() {
        Socketio.emit("getNewItem")
        console.log("get new item")
    }

    itemHandle(id) {
        this.props.navigation.navigate("ShowItem", { id })
    }

    searchHandle() {
        this.props.navigation.navigate("SearchList", {
            searchKeyWord: this.state.searchKeyWord,
            danhMuc: this.state.danhMuc,
            khuVuc: this.state.khuVuc,
            mucGiaTu: this.state.mucGiaTu,
            mucGiaDen: this.state.mucGiaDen,
            sapXepTheo: this.state.sapXepTheo
        })
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
                        // onBlur={() => this.setState({ searchBarOnFocus: false })}
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
                            <TouchableOpacity
                                onPress={async () => { await this.setState({ danhMuc: "tatCa" }), this.searchHandle() }}
                                style={{ alignItems: "center", justifyContent: "center" }}
                            >
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/tatCa.png')}
                                />
                                <Text style={styles.nomalText}>tat ca</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={async () => { await this.setState({ danhMuc: "quanAo" }), this.searchHandle() }}
                                style={{ alignItems: "center", justifyContent: "center" }}
                            >
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/quanAo.png')}
                                />
                                <Text style={styles.nomalText}>quann ao</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={async () => { await this.setState({ danhMuc: "dienTu" }), this.searchHandle() }}
                                style={{ alignItems: "center", justifyContent: "center" }}
                            >
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/dienTu.png')}
                                />
                                <Text style={styles.nomalText}>dien tu</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={async () => { await this.setState({ danhMuc: "lamDep" }), this.searchHandle() }}
                                style={{ alignItems: "center", justifyContent: "center" }}
                            >
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/lamDep.png')}
                                />
                                <Text style={styles.nomalText}>lam dep</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={async () => { await this.setState({ danhMuc: "thucPham" }), this.searchHandle() }}
                                style={{ alignItems: "center", justifyContent: "center" }}
                            >
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/thucPham.png')}
                                />
                                <Text style={styles.nomalText}>thuc pham</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={async () => { await this.setState({ danhMuc: "dichVu" }), this.searchHandle() }}
                                style={{ alignItems: "center", justifyContent: "center" }}
                            >
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/dichVu.png')}
                                />
                                <Text style={styles.nomalText}>dich vu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={async () => { await this.setState({ danhMuc: "giaDung" }), this.searchHandle() }}
                                style={{ alignItems: "center", justifyContent: "center" }}
                            >
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/giaDung.png')}
                                />
                                <Text style={styles.nomalText}>gia dung</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={async () => { await this.setState({ danhMuc: "viecLam" }), this.searchHandle() }}
                                style={{ alignItems: "center", justifyContent: "center" }}
                            >
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../../image/viecLam.png')}
                                />
                                <Text style={styles.nomalText}>viec lam</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={async () => { await this.setState({ danhMuc: "nhaO" }), this.searchHandle() }}
                                style={{ alignItems: "center", justifyContent: "center" }}
                            >
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
                                    <TouchableOpacity onPress={() => this.itemHandle(val.id)} style={{ width: "48%", height: LinhTinh.deviceWidth / 2, margin: "1%", backgroundColor: "white", borderWidth: 0.5, borderColor: "red", borderRadius: 10 }} key={i}>
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



                    {/* <NavigationBar/> */}
                    {/* <StatusBar translucent barStyle="light-content" /> */}


                </ScrollView>
                {/* search filter */}
                {this.state.searchBarOnFocus ? (
                    <View style={styles.searchFilter}>
                        <ScrollView>
                            <View style={{ flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#a3a3a3", opacity: 0.8 }}>
                                <Text style={{ flex: 1, fontSize: 20, color: "black", marginTop: 10, marginLeft: 10 }}>danh muc</Text>
                                <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: 'Chọn một danh mục...',
                                            value: null,
                                        }}
                                        placeholderTextColor="#999999"
                                        onValueChange={(danhMuc) => this.setState({ danhMuc })}
                                        itemStyle={{ backgroundColor: "black" }}
                                        items={[
                                            { label: 'Quần áo', value: 'quanAo', color: "black", id: 1 },
                                            { label: 'Điện tử', value: 'dienTu', color: "black", id: 2 },
                                            { label: 'Làm đẹp', value: 'lamDep', color: "black", id: 3 },
                                            { label: 'Thực phẩm', value: 'thucPham', color: "black", id: 4 },
                                            { label: 'Dịch vụ', value: 'dichVu', color: "black", id: 5 },
                                            { label: 'Gia dụng', value: 'giaDung', color: "black", id: 6 },
                                            { label: 'Việc làm', value: 'viecLam', color: "black", id: 7 },
                                            { label: 'Nhà ở', value: 'nhaO', color: "black", id: 8 },
                                        ]}
                                    />
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#a3a3a3", opacity: 0.8 }}>
                                <Text style={{ flex: 1, fontSize: 20, color: "black", marginTop: 10, marginLeft: 10 }}>khu vuc</Text>
                                <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: 'Chọn khu vực...',
                                            value: null,
                                        }}
                                        placeholderTextColor="#999999"
                                        onValueChange={(khuVuc) => this.setState({ khuVuc })}
                                        items={this.tinh}
                                    />
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#a3a3a3", opacity: 0.8 }}>
                                <Text style={{ flex: 1, fontSize: 20, color: "black", marginTop: 10, marginLeft: 10 }}>muc gia:</Text>
                                <View style={{ flex: 2, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
                                    <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
                                        <Text style={{ color: "black", fontSize: 20, marginTop: 15 }}>¥</Text>
                                        <TextInput
                                            style={{ borderBottomWidth: 0.5, borderColor: "black", fontSize: 15, color: "black" }}
                                            onChangeText={(mucGiaTu) => this.setState({ mucGiaTu })}
                                            value={this.state.mucGiaTu}
                                            placeholder="Tìm Kiếm Sản Phẩm"
                                            placeholderTextColor="#999999"
                                            keyboardType='number-pad'
                                        />
                                        <Text style={{ color: "black", fontSize: 20, marginTop: 15 }}> ~ ¥</Text>
                                        <TextInput
                                            style={{ borderBottomWidth: 0.5, borderColor: "black", color: "black" }}
                                            onChangeText={(mucGiaDen) => this.setState({ mucGiaDen })}
                                            value={this.state.mucGiaDen}
                                            placeholder="Tìm Kiếm Sản Phẩm"
                                            placeholderTextColor="#999999"
                                            keyboardType='number-pad'
                                        />
                                    </View>

                                </View>
                            </View>

                            <View style={{ flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#a3a3a3", opacity: 0.8 }}>
                                <RadioForm
                                    style={{ margin: 10 }}
                                    radio_props={[
                                        { label: 'sap xep theo thoi gian dang ', value: "time" },
                                        { label: 'sap xep theo gia', value: "price" },
                                    ]}
                                    buttonColor={'black'}
                                    selectedButtonColor={'black'}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    initial={"time"}
                                    onPress={(value) => { this.setState({ value: value }) }}
                                />
                            </View>



                        </ScrollView>

                        <View style={{ position: "absolute", flexDirection: "row", zIndex: 5, width: "100%", height: 50, bottom: 10 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        searchBarOnFocus: false,
                                        searchKeyWord: null,
                                        danhMuc: null,
                                        khuVuc: null,
                                        mucGiaTu: null,
                                        mucGiaDen: null,
                                        sapXepTheo: null,
                                    })
                                    Keyboard.dismiss()
                                }}
                                style={{ flex: 1, borderWidth: 0.5, borderColor: "red", justifyContent: "center", alignItems: "center", borderRadius: 5, margin: 5 }}
                            >
                                <Text style={{ color: "black", fontSize: 20 }}>cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.searchHandle()} style={{ flex: 1, borderWidth: 0.5, borderColor: "red", justifyContent: "center", alignItems: "center", borderRadius: 5, margin: 5 }}>
                                <Text style={{ color: "black", fontSize: 20 }}>search</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
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
        height: LinhTinh.deviceHeight * 0.4,
        backgroundColor: "#dedede",
        marginTop: 0,
        marginLeft: "2%",
        borderRadius: 5,
        top: Platform.OS == "ios" ? 100 : 80,

    },
    categoryImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 20,
        marginBottom: 5
    }

});