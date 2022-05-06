import React, { Component } from 'react';
import { View, Button, Text, Image, ScrollView, Picker, Linking } from 'react-native';

const OneHeadline = ({headline, author, description, img, url}) => {
    return (
        <View style={{paddingLeft: 15, paddingRight: 15}}>
            <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20, paddingTop: 15}}>{headline}</Text>
            <Text style={{textAlign: 'center'}}>by: {author}</Text>
            <Text style={{textAlign: 'center', paddingBottom: 5}}>{description}</Text>
            <Image source={{uri: img}} style={{width: 200, height: 200, alignSelf: 'center'}} />
            <Button title='Go to Article' style={{width: 'auto', height: 20}} color='#F00' onPress={ () => Linking.openURL(url) } />
        </View>
    )
}

export default class News extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            news_source: 'ABC-News',
            news_idx: 0,
            news: []
        };
    }

    getData() {
        let url = "https://newsapi.org/v2/top-headlines?sources=" + this.state.news_source + "&apiKey=79105c74e0314d31bd805f87d6f3cd3b"

        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                this.setState({ news: json.articles });
            });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        // console.log(this.state.news);
        let news_holder = [];
        for(let i = 0; i< this.state.news.length; i++) {
            news_holder.push(
                <OneHeadline
                    key={'news'+i}
                    headline={this.state.news[i].title}
                    author={this.state.news[i].author}
                    description={this.state.news[i].description}
                    img={this.state.news[i].urlToImage}
                    url={this.state.news[i].url}
                />
            )
        }

        return (
            <View style={{ paddingTop: 10 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Choose news source:</Text>
                    <Picker
                        selectedValue={this.state.news_source}
                        style={{ height: 200, width: 300 , alignSelf: 'center'}}
                        onValueChange={(source, idx) => {
                            this.setState({news_source: source}, () => this.getData());
                            this.setState({news_idx: idx});
                        }}
                        
                    >
                        <Picker.Item label="ABC News" value="ABC-News" />
                        <Picker.Item label="Associated Press" value="associated-press" />
                        <Picker.Item label="BBC News" value="BBC-News" />
                        <Picker.Item label="CBS News" value="CBS-News" />
                        <Picker.Item label="CNBC" value="CNBC" />
                        <Picker.Item label="CNN" value="CNN" />
                        <Picker.Item label="Polygon" value="Polygon" />
                        <Picker.Item label="TechCrunch" value="TechCrunch" />
                        <Picker.Item label="The Wall Street Journal" value="The-Wall-Street-Journal" />
                        <Picker.Item label="USA Today" value="USA-Today" />
                    </Picker>
                <ScrollView style={{paddingTop: 50}}>
                        {news_holder}
                </ScrollView>
            </View>
        )
    }
}