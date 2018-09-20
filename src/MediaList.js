import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

export default class MediaList extends Component {

    constructor(props){
      super(props);
      this.state = {
         mediaList : this.props.searchMedia
      }

    }
    componentDidMount(){
      console.log('MEDIA LIST MOUNTED');
      console.log('THIS PROPS',this.props)
    }

    render() {
      return (
        <View>
        
             <Text style={styles.item}>{this.props.searchMedia[0] !== undefined ?  this.props.searchMedia[0].snippet.title: null}</Text>
     
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })