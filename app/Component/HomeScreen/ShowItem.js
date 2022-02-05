import React from "react"
import { View, Text, ScrollView, Image, Linking, TouchableOpacity } from "react-native"
import LinhTinh from "../LinhTinh"
import Socketio from "../Socketio"

// import Swiper from 'react-native-swiper'
// import Swiper from 'react-native-swipe-image';
import GallerySwiper from "react-native-gallery-swiper"

export default class ShowItem extends React.Component {
    constructor(props) {
        super(props)
        this.imgArr = []
        this.state = {
            id: null,
            tieuDe: null,
            moTa: null,
            khuVuc: null,
            gia: null,
            phiShip: null,

            image: [],

            username: null,
            avata: null,
            email: null,

            sameSeller: [],

            sellerPassword: null,
            isDataLoaded: false,
            isMounted: false
        }
    }

    async componentDidMount() {
        this.setState({ id: this.props.route.params.id, isMounted: true })
        // console.log(this.props.route.params.id)
        await Socketio.emit("getItemData", { id: this.props.route.params.id })
        // await Socketio.emit("getUserData", { password: this.state.sellerPassword })
        // await Socketio.emit("getListedItemOfUser", { password: this.state.sellerPassword, limit: 10 })


    }

    async UNSAFE_componentWillMount() {

    }
    componentWillUnmount() {
        this.setState({
            id: null,
            tieuDe: null,
            moTa: null,
            khuVuc: null,
            gia: null,
            phiShip: null,

            image: [],
            imageCount: 0,
            imageLength: 0,

            username: null,
            avata: null,
            email: null,

            listedItem: [],

            sellerPassword: null,
            isDataLoaded: false,
            isMounted: false
        })
        // Socketio.off("getItemDataResponse")
        // Socketio.off("getUserDataResponse")
        // Socketio.off("getListedItemOfUserResponse")
    }

    async handle() {

        if (this.state.isMounted) {
            Socketio.on("getItemDataResponse", async val => {

                this.setState({ image: [] })
                val.image.map(img => {
                    // let join = this.state.image.concat({ uri: `data:image/jpg;base64,${img.base64}` })
                    // this.setState({image:join})
                    this.imgArr.push({ uri: `data:image/jpg;base64,${img.base64}` })
                })

                this.setState({
                    tieuDe: val.tieuDe,
                    moTa: val.moTa,
                    khuVuc: val.khuVuc,
                    gia: val.gia,
                    phiShip: val.phiShip,
                    image: this.imgArr,
                    sellerPassword: val.password,

                    email: val.email,
                    username: val.username,
                    avata: val.avata,
                    facebook: val.facebook,
                    phoneNumber: val.phoneNumber,

                    listedItem: val.listedItem,
                    // imageLength: imgArr,
                    isDataLoaded: true
                })

                console.log(val.facebook)

            })

            // Socketio.on("getUserDataResponse", async val => {
            //     console.log("get user data1")
            //     this.setState({
            //         username: val.username,
            //         avata: val.avata,
            //         email: val.email
            //     })



            // })

            // Socketio.on("getListedItemOfUserResponse", val => {
            //     // this.setState({ sameSeller: val })
            // })
        }

    }

    itemHandle(id) {
        this.props.navigation.replace("ShowItem", { id })
    }

    render() {
        this.handle()
        return (
            <ScrollView style={{ width: "100%", height: "200%" }}>
                {this.state.isDataLoaded ? (
                    <View style={{ marginTop: 10 }}>
                        <GallerySwiper
                            useNativeDriver={false}
                            style={{ width: "100%", height: 300, backgroundColor: "white" }}
                            images={this.state.image}
                        />
                    </View>

                ) : null}

                <View style={{ width: "100%", height: "auto", backgroundColor: "white", marginTop: 20, marginBottom:100 }}>
                    <Text style={{ color: "black", fontSize: 25, marginTop: 10, marginLeft: 10 }}>{this.state.tieuDe}</Text>
                    <Text style={{ marginTop: 20, marginLeft: 10 }}>
                        <Text style={{ color: "red", fontSize: 20 }}>¥{this.state.gia}</Text>
                        <Text style={{ color: "black", fontSize: 15 }}> + </Text>
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../../image/shippingFee.png')}
                        />
                        <Text style={{ color: "red", fontSize: 15 }}> ¥{this.state.phiShip}</Text>
                    </Text>

                    <Text style={{ color: "black", fontSize: 20, opacity: 0.7, marginLeft: 10 }}>{this.state.khuVuc}</Text>
                    <View style={{ flexDirection: "row", width: "100%", height: 80, backgroundColor: "white", marginTop: 10, borderColor: "rgba(99,99,99,0.5)", borderWidth: 1 }}>
                        <Image
                            style={{ width: 60, height: 60, margin: 10, borderRadius: 10 }}
                            source={{ uri: `data:image/jpg;base64,${this.state.avata}` }}
                        />
                        <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
                            <Text style={{ color: "black", fontSize: 25 }}>{this.state.username}</Text>
                            <Text style={{ color: "black", fontSize: 15, opacity: 0.7, }}>{this.state.email}</Text>
                        </View>
                    </View>
                    <Text style={{ color: "black", fontSize: 20, fontWeight: "bold", marginTop: 10, marginLeft: 10 }}>Mo ta:</Text>
                    <Text style={{ color: "black", fontSize: 20, marginLeft: 10, marginTop: 10, }}>{this.state.moTa}</Text>

                    <View style={{ borderTopWidth: 0.5, borderColor: "rgba(99,99,99,0.5)", marginTop: 30 }}>
                        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold", marginLeft: 10, marginTop: 10 }}>Lien he ngay:</Text>
                    </View>
                    <View style={{ flexDirection: "row", width: "100%", height: 60, opacity: 0.7 }}>

                        <TouchableOpacity onPress={() => Linking.openURL(`http://facebook.com/hong.magui.5`)} style={{ flex: 1, width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={require('../../image/chat.png')}
                            />
                        </TouchableOpacity>
                        {this.state.facebook == null ? null : (
                            <TouchableOpacity onPress={() => Linking.openURL(`http://facebook.com/hong.magui.5`)} style={{ flex: 1, width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={{ width: 40, height: 40 }}
                                    source={require('../../image/facebook.png')}
                                />
                            </TouchableOpacity>
                        )}

                        {this.state.phoneNumber == null ? null : (
                            <TouchableOpacity onPress={() => Linking.openURL(`tel:${this.state.phoneNumber}`)} style={{ flex: 1, width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={{ width: 40, height: 40 }}
                                    source={require('../../image/phone.png')}
                                />
                            </TouchableOpacity>
                        )}


                    </View>

                    <View style={{ width: "100%", marginTop: 10, borderTopWidth: 0.5, borderColor: "rgba(99,99,99,0.5)", marginBottom:40 }}>
                        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold", marginTop: 10, marginLeft: 10 }}>cung nguoi ban:</Text>
                        <View style={{ width: "100%", height: "auto", flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>
                            {this.state.isDataLoaded && this.state.listedItem.map((val, i) => {
                                return (
                                    <TouchableOpacity onPress={() => this.itemHandle(val.id)} style={{ width: LinhTinh.deviceWidth * 0.48, height: LinhTinh.deviceWidth / 2, margin: "1%", backgroundColor: "white", borderWidth: 0.5, borderColor: "red", borderRadius: 10 }} key={i}>
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

                </View>
            </ScrollView >
        )
    }
}