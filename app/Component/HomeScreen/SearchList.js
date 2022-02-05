import React from "react"
import { Text, StyleSheet, Image, TextInput, ScrollView, View, TouchableOpacity, Platform, Keyboard } from "react-native"
import LinhTinh from "../LinhTinh"
import Socketio from "../Socketio"

import RNPickerSelect from 'react-native-picker-select'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'


export default class SearchList extends React.Component {
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

            itemList:[],

            openFilter: false
        }
    }

    async componentDidMount(){
        await this.setState({
            searchKeyWord: this.props.route.params.searchKeyWord,
            danhMuc: this.props.route.params.danhMuc,
            khuVuc: this.props.route.params.khuVuc,
            mucGiaTu: this.props.route.params.mucGiaTu,
            mucGiaDen: this.props.route.params.mucGiaDen,
            sapXepTheo: this.props.route.params.sapXepTheo,
        })

        Socketio.emit("getSearchList", {
            searchKeyWord: this.state.searchKeyWord,
            danhMuc: this.state.danhMuc,
            khuVuc: this.state.khuVuc,
            mucGiaTu: this.state.mucGiaTu,
            mucGiaDen: this.state.mucGiaDen,
            sapXepTheo: this.state.sapXepTheo,
        })

    }

    render() {
        console.log(this.props.route.params)
        return (
            <ScrollView style={{ width: "100%", height: "100%" }}>
                <TouchableOpacity onPress={()=>{this.setState({openFilter:!this.state.openFilter})}} style={{ position: "absolute", right: 15 }}>
                    <Text style={{ marginLeft: 10, fontSize: 20, color: "blue", fontWeight: "bold", marginTop: 10, opacity: 0.7 }}>filter</Text>
                </TouchableOpacity>

                {this.state.openFilter ? (
                    <View style={styles.searchFilter}>
                        <ScrollView>
                            <View style={{ flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#a3a3a3", opacity: 0.8 }}>
                                <Text style={{ flex: 1, fontSize: 20, color: "black", marginTop: 10, marginLeft: 10 }}>Danh mục:</Text>
                                <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: 'Chọn một danh mục...',
                                            value: null,
                                        }}
                                        placeholderTextColor="#999999"
                                        onValueChange={(danhMuc) => this.setState({ danhMuc })}
                                        itemStyle={{ backgroundColor: "black" }}
                                        value={this.state.danhMuc}
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
                                <Text style={{ flex: 1, fontSize: 20, color: "black", marginTop: 10, marginLeft: 10 }}>Khu vực:</Text>
                                <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: 'Chọn khu vực...',
                                            value: null,
                                        }}
                                        value={this.state.khuVuc}
                                        placeholderTextColor="black"
                                        onValueChange={(khuVuc) => this.setState({ khuVuc })}
                                        items={this.tinh}
                                    />
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#a3a3a3", opacity: 0.8 }}>
                                <Text style={{ flex: 1, fontSize: 20, color: "black", marginTop: 10, marginLeft: 10 }}>Mức giá:</Text>
                                <View style={{ flex: 2, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
                                    <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
                                        <Text style={{ color: "black", fontSize: 20, marginTop: 15 }}>¥</Text>
                                        <TextInput
                                            style={{ borderBottomWidth: 0.5, borderColor: "black", fontSize: 15, color: "black", width: 100 }}
                                            onChangeText={(mucGiaTu) => this.setState({ mucGiaTu })}
                                            value={this.state.mucGiaTu}
                                            placeholder="từ..."
                                            placeholderTextColor="#999999"
                                            keyboardType='number-pad'
                                        />
                                        <Text style={{ color: "black", fontSize: 20, marginTop: 15 }}> ~ ¥</Text>
                                        <TextInput
                                            style={{ borderBottomWidth: 0.5, borderColor: "black", color: "black", width: 100 }}
                                            onChangeText={(mucGiaDen) => this.setState({ mucGiaDen })}
                                            value={this.state.mucGiaDen}
                                            placeholder="đến..."
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
                                        { label: 'Sắp xếp theo thời gian đăng ', value: "time" },
                                        { label: 'sap xep theo gia tang dan', value: "priceUp" },
                                        { label: 'sap xep theo gia giam dan', value: "priceDown" },
                                    ]}
                                    buttonColor={'black'}
                                    selectedButtonColor={'black'}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    initial={0}
                                    onPress={(value) => { this.setState({ value: value }) }}
                                />
                            </View>

                            <TouchableOpacity style={{width:"90%", height:50, backgroundColor:"red", margin:"5%", alignItems:"center", justifyContent:"center", borderRadius:10, opacity:0.7}}>
                                <Text style={{color:"black", fontSize:25}}>ap dung loc</Text>
                            </TouchableOpacity>



                        </ScrollView>


                    </View>
                ) : null}


                <Text style={{ color: "black", fontSize: 25, fontWeight: "bold", marginLeft: 10, marginTop: 20 }}>Kết quả tìm kiếm:</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    searchFilter: {
        width: "96%",
        height: "auto",
        backgroundColor: "#d9d9d9",
        // marginTop: 10,
        marginLeft: "2%",
        borderRadius: 5,
        marginBottom: 10,
        marginTop:50

    },
});