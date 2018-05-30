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
      password: '',
      register: false
    }
  }
  toggleRegister = (e) => {
    if (!this.state.register) {
      this.setState({register: true})
    }
    else {
      this.setState({register: false})
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
    this.props.updateUser(this.state.username,this.state.password,this.state.register);
    this.setState({ password: '' });
  }
  render() {
    return (
      <View>
        <Text>{this.state.register ? 'Register' : 'Login' }</Text>
        <TextInput name='username' placeholder='Username' onChange={this.updateText}/>
        <PasswordInputText name='password' placeholder='Password' onChange={this.updateText}/>
        <Button onPress={this.handleSubmit} title={this.state.register ? 'Register' : 'Login' }/>
        <Text onPress={this.toggleRegister}>{this.state.register ? 'Click here to login' : 'Click here to register' }</Text>
      </View>
    );
  }
}