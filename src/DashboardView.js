import React, { Component } from 'react';
import {TextInput, Button, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PlaybackView from './PlaybackView';

class DashboardView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
             text: 'Useless Placeholder' 
            };
      }

    static navigationOptions = {
      title: 'Hello World',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
            <Button
            title='Play Music'
            onPress={() =>
                navigate('Profile', { name: 'Jane' })
            }
            />

            <TextInput
            style={styles.input}
            ref={ref => {this._textInput = ref}}
            autoFocus={true}
            value={this.state.text}
            onChangeText={(text) => this.setState({text})}
            keyboardType="default"
            returnKeyType="send"
            onSubmitEditing={this._submit}
            blurOnSubmit={true}
           />

              <MaterialIcons name='search'  size={32} />
        </View>

     


      );
    }
    _submit = () => {
        alert(`Searching Youtube for ${this.state.text}!`);
      };

  }


  const styles = StyleSheet.create({
  
    input: {
      margin: 20,
      marginBottom: 0,
      height: 40,
      paddingHorizontal: 10,
      borderRadius: 4,
      borderColor: '#ccc',
      borderWidth: 1,
      fontSize: 16,
    },
  });
  

export default DashboardView;