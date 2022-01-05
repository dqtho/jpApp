import React from "react"
import { View, Text, ScrollView, Image } from "react-native"
import LinhTinh from "../LinhTinh"
import Socketio from "../Socketio"

// import Swiper from 'react-native-swiper'
// import Swiper from 'react-native-swipe-image';
import GallerySwiper from "react-native-gallery-swiper"

export default class ShowItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            tieuDe: null,
            moTa: null,
            khuVuc: null,
            gia: null,
            phiShip: null,

            image: [],
            imageCount: 0,
            imageLength: 0,
            isLoaded: false
        }
    }

    componentDidMount() {
        this.setState({ id: this.props.route.params.id })
        // console.log(this.props.route.params.id)
        Socketio.emit("getItemData", { id: this.props.route.params.id })
    }

    render() {
        Socketio.on("getItemDataResponse", async val => {
            imgArr = []
            this.setState({ image: [] })
            await Promise.all(
                val.image.map(img => {
                    // let join = this.state.image.concat({ uri: `data:image/jpg;base64,${img.base64}` })
                    // this.setState({image:join})
                    imgArr.push({ uri: `data:image/jpg;base64,${img.base64}` })
                })
            )
            this.setState({
                tieuDe: val.tieuDe,
                moTa: val.moTa,
                khuVuc: val.khuVuc,
                gia: val.gia,
                phiShip: val.phiShip,
                image: imgArr,
                // imageLength: imgArr,
                isLoaded: true
            })

        })
        return (
            <ScrollView style={{ width: "105%", height: "200%" }}>
                {this.state.isLoaded ? (
                    <View>
                        <GallerySwiper
                            useNativeDriver={false}
                            style={{ width: "100%", height: 250, backgroundColor: "white" }}
                            images={this.state.image}
                        />
                    </View>

                ) : null}

                <View style={{ width: "100%", height: 3000, backgroundColor: "white", marginTop: 20, marginLeft:10 }}>
                    <Text style={{ color: "black", fontSize: 25 }}>{this.state.tieuDe}</Text>
                    <Text style={{marginTop:20}}>
                        <Text style={{ color: "red", fontSize: 20 }}>¥{this.state.gia}</Text>
                        <Text style={{color:"black", fontSize:15}}> + </Text>
                        <Image
                                    style={{width:20, height:20}}
                                    source={require('../../image/shippingFee.png')}
                                />
                        <Text style={{ color: "red", fontSize: 15 }}> ¥{this.state.phiShip}</Text>
                    </Text>

                    <Text style={{ color: "black", fontSize: 20 }}>{this.state.khuVuc}</Text>
                    <Text style={{ color: "black", fontSize: 20 }}>{this.state.moTa}</Text>
                </View>
            </ScrollView >
        )
    }
}