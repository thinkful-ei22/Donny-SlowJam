import React, { Component } from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';

class ProfileScreen extends React.Component {
    static navigationOptions = {
      title: 'Profile Screen',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <Button
          title="Go Home"
          onPress={() =>
            navigate('Home', { name: 'Jane' })
          }
        />
      );
    }
  }

  export default ProfileScreen;
  