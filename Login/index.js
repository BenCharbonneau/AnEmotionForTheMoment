'use strict';

import React, { Component } from 'react';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';
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
import styles from '../style';

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
        <Text style={styles.header}>{this.state.register ? 'Register' : 'Login' }</Text>
        {this.props.message ? <Text style={styles.text}>{this.props.message}</Text> : undefined}
        <Text style={styles.label}>Username</Text>
        <TextInput name='username' style={styles.input} onChange={this.updateText} autoFocus={true} value={this.state.username}/>
        <TextInput name='password' style={styles.input} onChange={this.updateText} secureTextEntry={true} placeholder='Password' value={this.state.password}/>
        <Button onPress={this.handleSubmit} title={this.state.register ? 'Register' : 'Login' }/>
        <Text onPress={this.toggleRegister} style={styles.text} >{this.state.register ? 'Click here to login' : 'Click here to register' }</Text>
      </View>
    );
  }
}