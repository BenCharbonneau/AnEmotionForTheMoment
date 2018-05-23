'use strict';

import React, { Component } from 'react';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';
import PasswordInputText from 'react-native-hide-show-password-input';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import {
  Button,
  FormInput
} from 'react-native-elements';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }
  updateText = (e) => {
    const input = ReactNativeComponentTree.getInstanceFromNode(e.target);
    const name = input.memoizedProps.name;
    const text = e.nativeEvent.text;
    const stateObj = {};
    stateObj[name] = text;
    this.setState(stateObj);
  }
  handleSubmit = (e) => {
    this.props.updateUser(this.state.username,this.state.password);
    this.setState({ password: '' });
  }
  render() {
    return (
      <View>
        <Text>Login</Text>
        <TextInput name='username' placeholder='Username' onChange={this.updateText}/>
        <PasswordInputText name='password' placeholder='Password' onChange={this.updateText}/>
        <Button onPress={this.handleSubmit} title='Login' />
      </View>
    );
  }
}