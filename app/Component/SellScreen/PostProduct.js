import React from "react"
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Alert } from "react-native"
import ImagePicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select'
import LinhTinh from "../LinhTinh";
import Socketio from "../Socketio";

export default class PostProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tieuDe: null,
            moTa: null,
            gia: null,
            phiShip: null,
            khuVuc: null,
            danhMuc: null,
            image: []
        }
        this.tinh = ["Toàn Nhật Bản   ", "愛知県", "秋田県", "青森県", "千葉県", "愛媛県", "福井県", "福岡県", "福島県", "岐阜県", "群馬県", "広島県", "北海道", "兵庫県", "	茨城県", "石川県", "岩手県", "香川県", "鹿児島県", "神奈川県", "高知県", "熊本県", "京都府", "三重県", "宮城県", "宮崎県", "長野県", "長崎県", "奈良県", "新潟県", "大分県", "岡山県", "沖縄県", "大阪府", "佐賀県", "埼玉県", "滋賀県", "島根県", "静岡県", "栃木県", "徳島県", "東京都", "鳥取県", "富山県", "和歌山県", "山形県", "山口県", "山梨県"]
        this.tinh.map((val, i) => {
            this.tinh[i] = { label: val, value: val, color: "black" }
        })
    }

    async showPicker() {
        ImagePicker.openPicker({
            includeBase64: true,
            mediaType: "photo",
        }).then(image => {
            let img = this.state.image
            img.push(image.data)
            // console.log(image);
            this.setState({ image: img })
        });
        console.log(this.state.image.length)
    }

    async postHandle() {
        if (this.state.tieuDe == null || this.state.moTa == null || this.state.gia == null || this.state.phiShip == null || this.state.khuVuc == null || this.state.danhMuc == null || this.state.image == []) {
            Alert.alert("Vui lòng nhập đầy đủ thông tin")
        } else {
            Socketio.emit("postProduct", {
                password: await LinhTinh.getData("password"),

                tieuDe: this.state.tieuDe,
                moTa: this.state.moTa,
                gia: this.state.gia,
                phiShip: this.state.phiShip,
                khuVuc: this.state.khuVuc,
                danhMuc: this.state.danhMuc,
                image: this.state.image,
            })
            Socketio.on("postProductResponse", val=>{
                if(val.isSuccess){
                    Alert.alert("Sản phẩm đã được đăng thành công")
                }
            })
        }

    }

    render() {
        return (
            <ScrollView style={{ width: "100%", height: "100%" }}>
                <View style={{ width: "100%", height: 300, backgroundColor: "white", marginTop: 20 }}>
                    <ScrollView horizontal={true} style={{ width: "100%", height: 200 }}>

                        {this.state.image.length == 0 ? (
                            // <Text style={{ color: "black", fontSize: 40 }}>hello</Text>
                            <Image
                                style={{ width: LinhTinh.deviceWidth, height: 250, resizeMode: "contain", margin: 5 }}
                                source={require('/Users/damquangtho/Desktop/jpApp/app/image/image.png')}
                            />
                        ) : this.state.image.map((val, i) => {
                            return (
                                <Image
                                    style={{ width: 300, height: "100%", resizeMode: "contain", margin: 5 }}
                                    source={{ uri: `data:image/jpg;base64,${val}` }}
                                />
                                // <Image
                                //     style={{ width: 40, height: 40 }}
                                //     source={require('/Users/damquangtho/Desktop/jpApp/app/image/giaDung.png')}
                                // />
                            )
                        })}
                    </ScrollView>
                    <View style={{ flexDirection: "row", width: "100%" }}>
                        <TouchableOpacity onPress={() => this.showPicker()} style={{ width: "50%", height: 50, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "blue", fontSize: 25 }}>thêm ảnh({this.state.image.length})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ image: [] })} style={{ width: "50%", height: 50, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "red", fontSize: 25 }}>xoá ảnh</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ width: "100%", height: 400, marginTop: 20, backgroundColor: "white" }}>
                    <Text style={{ color: "black", fontSize: 25, fontWeight: "bold", opacity: 0.8, marginTop: 10, marginLeft: 10 }}>Tiêu đề sản phẩm:</Text>
                    <TextInput
                        style={{ borderBottomWidth: 0.5, height: 40, backgroundColor: "white", margin: 5, paddingLeft: 5, color: "black", fontSize: 20 }}
                        onChangeText={(tieuDe) => this.setState({ tieuDe })}
                        value={this.state.tieuDe}
                        placeholder="Nhập tiêu đề sản phẩm"
                        placeholderTextColor="#999999"
                    />
                    <Text style={{ color: "black", fontSize: 25, fontWeight: "bold", opacity: 0.8, marginTop: 10, marginLeft: 10 }}>Mô tả:</Text>
                    <TextInput
                        style={{ borderBottomWidth: 0.5, height: 250, backgroundColor: "white", margin: 5, paddingLeft: 5, color: "black", fontSize: 20 }}
                        onChangeText={(moTa) => this.setState({ moTa })}
                        value={this.state.moTa}
                        multiline={true}
                        placeholder="Nhập mô tả"
                        placeholderTextColor="#999999"
                    />

                </View>

                <View style={{ width: "100%", height: 210, marginTop: 20, backgroundColor: "white" }}>
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "black", flex: 1, fontSize: 20, marginLeft: 10, fontWeight: "bold" }}>Danh mục:</Text>
                        <View style={{ flex: 2, height: 50, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderBottomWidth: 0.5, borderBottomColor: "black" }}>
                            <RNPickerSelect

                                placeholder={{
                                    label: 'Chọn một danh mục...',
                                    value: null,
                                }}
                                placeholderTextColor="#999999"
                                onValueChange={(danhMuc) => this.setState({ danhMuc })}
                                itemStyle={{ backgroundColor: "white" }}
                                items={[
                                    { label: 'Quần áo', value: 'quanAo', color: "black" },
                                    { label: 'Điện tử', value: 'dienTu', color: "black" },
                                    { label: 'Làm đẹp', value: 'lamDep', color: "black" },
                                    { label: 'Thực phẩm', value: 'thucPham', color: "black" },
                                    { label: 'Dịch vụ', value: 'dichVu', color: "black" },
                                    { label: 'Gia dụng', value: 'giaDung', color: "black" },
                                    { label: 'Việc làm', value: 'viecLam', color: "black" },
                                    { label: 'Nhà ở', value: 'nhaO', color: "black" },
                                ]}
                            />
                        </View>


                    </View>
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "black", flex: 1, fontSize: 20, marginLeft: 10, fontWeight: "bold" }}>Khu vực:</Text>
                        <View style={{ flex: 2, height: 50, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderBottomWidth: 0.5, borderBottomColor: "black" }}>
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

                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ flex: 1, color: "black", fontSize: 20, fontWeight: "bold", opacity: 0.8, marginLeft: 10 }}>Giá:</Text>
                        <TextInput
                            style={{ flex: 2, height: 40, backgroundColor: "white", margin: 5, paddingLeft: 5, color: "black", fontSize: 15, borderBottomWidth: 0.5, borderBottomColor: "black" }}
                            onChangeText={(gia) => this.setState({ gia })}
                            value={this.state.gia}
                            placeholder="Nhập giá sản phẩm..."
                            placeholderTextColor="#999999"
                            keyboardType='number-pad'
                        />
                    </View>

                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ flex: 1, color: "black", fontSize: 20, fontWeight: "bold", opacity: 0.8, marginLeft: 10 }}>Phí ship:</Text>
                        <TextInput
                            style={{ flex: 2, height: 40, backgroundColor: "white", margin: 5, paddingLeft: 5, color: "black", fontSize: 15, borderBottomWidth: 0.5, borderBottomColor: "black" }}
                            onChangeText={(phiShip) => this.setState({ phiShip })}
                            value={this.state.phiShip}
                            placeholder="Nhập phí ship..."
                            placeholderTextColor="#999999"
                            keyboardType='number-pad'
                        />
                    </View>

                </View>

                <View style={{ width: "100%", height: 300, backgroundColor: "white", marginTop: 20, marginBottom: 200 }}>
                    <TouchableOpacity onPress={() => this.postHandle()} style={{ width: "80%", height: 50, backgroundColor: "red", justifyContent: "center", alignItems: "center", marginTop: 50, borderRadius: 10, marginLeft: "10%" }}>
                        <Text style={{ color: "black", fontSize: 25, opacity: 0.8 }}>Đăng sản phẩm</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        )
    }
}