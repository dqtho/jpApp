import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import LinhTinh from "./LinhTinh"
import HomeScreen from './HomeScreen';
import SellScreen from './SellScreen';
import MoreScreen from './MoreScreen';
import NotificationScreen from './NotificationCreen';
import MessageScreen from './MessageScreen';
export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            homeButtonOpacity: 1,
            sellButtonOpacity: 0.5,
            notificationButtonOpacity: 0.5,
            moreButtonOpacity: 0.5,
            messageButtonOpacity: 0.5,

            homeTabZIndex: 1,
            sellTabZIndex: 0,
            messageTabZIndex: 0,
            notificationTabZIndex: 0,
            moreTabZIndex: 0,

            hideNavigationBar: false
        }
    }

    homeButtonPress() {
        this.setState({ homeTabZIndex: 1, sellTabZIndex: 0, messageTabZIndex: 0, notificationTabZIndex: 0, moreTabZIndex: 0, homeButtonOpacity: 1, sellButtonOpacity: 0.5, messageButtonOpacity: 0.5, notificationButtonOpacity: 0.5, moreButtonOpacity: 0.5 })
    }
    sellButtonPress() {
        this.setState({ homeTabZIndex: 0, sellTabZIndex: 1, messageTabZIndex: 0, notificationTabZIndex: 0, moreTabZIndex: 0, homeButtonOpacity: 0.5, sellButtonOpacity: 1, messageButtonOpacity: 0.5, notificationButtonOpacity: 0.5, moreButtonOpacity: 0.5 })

    }
    messageButtonPress() {
        this.setState({ homeTabZIndex: 0, sellTabZIndex: 0, messageTabZIndex: 1, notificationTabZIndex: 0, moreTabZIndex: 0, homeButtonOpacity: 0.5, sellButtonOpacity: 0.5, messageButtonOpacity: 1, notificationButtonOpacity: 0.5, moreButtonOpacity: 0.5 })
    }
    notificationButtonPress() {
        this.setState({ homeTabZIndex: 0, sellTabZIndex: 0, messageTabZIndex: 0, notificationTabZIndex: 1, moreTabZIndex: 0, homeButtonOpacity: 0.5, sellButtonOpacity: 0.5, messageButtonOpacity: 0.5, notificationButtonOpacity: 1, moreButtonOpacity: 0.5 })

    }
    moreButtonPress() {
        this.setState({ homeTabZIndex: 0, sellTabZIndex: 0, messageTabZIndex: 0, notificationTabZIndex: 0, moreTabZIndex: 1, homeButtonOpacity: 0.5, sellButtonOpacity: 0.5, messageButtonOpacity: 0.5, notificationButtonOpacity: 0.5, moreButtonOpacity: 1 })

    }

    componentDidMount() {
        // this.props.navigation.popToTop("SellScreen")
    }

    hideNavigationBar(bool) {
        this.setState({ hideNavigationBar: bool })
    }

    render() {
        return (
            <View style={{ width: LinhTinh.deviceWidth, height: "100%" }}>

                {/* {this.state.screen} */}
                <View style={{ position: "absolute", width: "100%", height: "100%", zIndex: this.state.homeTabZIndex }}>
                    <HomeScreen />
                </View>
                <View style={{ position: "absolute", width: "100%", height: "100%", zIndex: this.state.sellTabZIndex }}>
                    <SellScreen />
                </View>
                <View style={{ position: "absolute", width: "100%", height: "100%", zIndex: this.state.messageTabZIndex }}>
                    <MessageScreen />
                </View>
                <View style={{ position: "absolute", width: "100%", height: "100%", zIndex: this.state.notificationTabZIndex }}>
                    <NotificationScreen />
                </View>
                <View style={{ position: "absolute", width: "100%", height: "100%", zIndex: this.state.moreTabZIndex }}>
                    <MoreScreen />
                </View>
                {!this.state.hideNavigationBar ? (
                    <View style={styles.navigationBar}>

                        <TouchableOpacity style={styles.button} onPress={() => this.messageButtonPress()}>
                            <Image
                                style={{ opacity: this.state.messageButtonOpacity, width: 30, height: 30 }}
                                source={require('../image/message.png')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.sellButtonPress()}>
                            <Image
                                style={{ opacity: this.state.sellButtonOpacity }}
                                source={require('../image/sell.png')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.homeButtonPress()}>
                            <Image
                                style={{ opacity: this.state.homeButtonOpacity, width: 40, height: 40 }}
                                source={require('../image/home.png')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.notificationButtonPress()}>
                            <Image
                                style={{ opacity: this.state.notificationButtonOpacity }}
                                source={require('../image/notification.png')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.moreButtonPress()}>
                            <Image
                                style={{ width: 35, height: 35, opacity: this.state.moreButtonOpacity }}
                                source={require('../image/moreInfo.png')}
                            />
                        </TouchableOpacity>
                    </View>
                ) : null}








            </View>
        )
    }
}

const styles = StyleSheet.create({
    navigationBar: {
        position: "absolute",
        // top: 1000,
        bottom: 0,
        height: 60,
        width: "100%",
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        zIndex: 10
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titleBar: {

    }
});