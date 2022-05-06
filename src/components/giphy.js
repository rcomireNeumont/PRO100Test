import React, { Component } from 'react';
import { View, Button, Text, Image } from 'react-native';

export default class GIPHY extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {};
    }

    getData() {

        let url = "https://api.giphy.com/v1/gifs/search?q=" + this.props.search + "&limit=10&api_key=ZzAG9fXpIo3QJ391hwZwh9GbClp8H9ja";

        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                let rand = Math.floor(Math.random() * 10) ;
                this.setState({ gif: json.data[rand].images.downsized_medium.url });
                console.log(this.state.gif)
            });

    }


    componentDidMount() {
        this.getData();
    }

    render() {

        return (
            <View style={{width: "100%", padding: 10, alignItems: "center"}}>
                <Image style={{width: 250, height: 250}} source={{uri: this.state.gif}} />
                <Text>Powered by GIPHY</Text>
                <Button
                    onPress={() => {
                        this.getData()
                    }}
                    title="Refresh" />
            </View>
        );
    }
};