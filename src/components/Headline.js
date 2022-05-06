
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Linking } from 'expo';

export default function Headline(props) {
    const openArticle = () => {
        Linking.openURL(props.url);
    }
     return (
        <View style={styles.headline}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{props.headline}</Text>
                <Button style={styles.btn} title="Open" color="#000" onPress={openArticle}/>
            </View>
            <Image source={{ uri: props.img }} alt={props.headline} style={{width: 400, height: 250, margin: "auto"}}/>
            <Text>By: {props.author}</Text>
            <Text>{props.desc}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headline: {
        borderWidth: 2,
        borderColor: "black",
        padding: 10,
    },
    // author: {

    // },
    btn: {
        flex: 1,
    },
    title: {
        display: "flex",
        flexDirection: "row",
    },
    titleText: {
        flex: 3,
    },
    // desc: {

    // },
    // cont: {
        
    // }
});
