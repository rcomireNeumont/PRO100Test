import React, {Component} from 'react';
import {View, Button, Text, Image, Picker, Linking} from 'react-native';


export default class News extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  GetData(source) {
      //how to get random from 10
      //how to use animated gifs?
      let api = "c83ceb0dae3e493485f1d94459167f1e";
      let url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${api}`
      fetch(url,{
        method: 'GET'
      })
      
      //puts result from json into local variable 
      .then(response => response.json())
      .then(json =>{
        this.setState({title: json.articles[0].title,author: json.articles[0].author, description: json.articles[0].description,    urlToImage: json.articles[0].urlToImage, url: json.articles[0].url});
        
      });
    }
      componentDidMount(){
      this.GetData("bbc-news");
  }

  render(){
      return(
        <View>
        <Picker onValueChange = {(itemValue) => {this.GetData(itemValue)}}>
            <Picker.Item label="BBC News" value="bbc-news" />
            <Picker.Item label="Fox News" value="fox-news" />
            <Picker.Item label="CNN" value="cnn"/>
            <Picker.Item label="ABC News" value="abc-news"/>
            <Picker.Item label="Business Insider" value="business-insider"/>
            <Picker.Item label="Buzzfeed" value="buzzfeed"/>
            <Picker.Item label="National Geographic" value="national-geographic"/>
            <Picker.Item label="TechCrunch" value="techcrunch"/>
            <Picker.Item label="The Wall Street Journal" value="the-wall-street-journal"/>
            <Picker.Item label="USA Today" value="usa-today"/>

          </Picker>
          <Text>
            {this.state.title}
            {this.state.author}
            {this.state.description}
          </Text>
          <Image source = {{uri: this.state.urlToImage}} style = {{width: 250, height:250}}/>
          <Button onPress={() => {
            Linking.openURL(this.state.url)
          }}
          title= "Visit Article"/>
          
        </View>
        );
      }
  }
