import React from "react"
import { View, Text, ScrollView } from "react-native"
import LinhTinh from "../LinhTinh"
import Socketio from "../Socketio"

export default class ShowItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            tieuDe:null
        }
    }

    componentDidMount() {
        this.setState({ id: this.props.route.params.id })
        // console.log(this.props.route.params.id)
        Socketio.emit("getItemData", { id: this.props.route.params.id })
    }

    render() {
        Socketio.on("getItemDataResponse", val=>{
            // console.log(val)
            this.setState({tieuDe:val.tieuDe})
            // console.log(val.image.length)
        })
        return (
            <ScrollView>
                <View style={{ width: "100%", height: LinhTinh.deviceWidth * 0.6, backgroundColor: "white" }}>
                    <Text style={{ color: "black", fontSize: 20 }}>{this.state.tieuDe}</Text>
                </View>
            </ScrollView>
        )
    }
}