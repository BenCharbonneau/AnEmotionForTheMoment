'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import DashboardContainer from './DashboardContainer';
import Login from './Login';
import env from './env';
import styles from './style';

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      username: '',
      userId: '',
      message: ''
    }
  }
  updateUser = async (username,password,register) => {
    try {
      let respJSON;
      const body = await JSON.stringify({
        username: username,
        password: password
      })

      if (register) {
        respJSON = await fetch('http://'+env.ip+':3000/users/register',{
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: body
        })
      }
      else {
        respJSON = await fetch('http://'+env.ip+':3000/users/login',{
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: body
        })
      }

      const response = await respJSON.json();
      const user = response.user;

      if (user) {
        this.setState({ username: user.username, userId: user.id, message: '' });
      }
      else {
        this.setState({ message: response.message })
      }
    }
    catch (err) {
      console.error(err);
    }
  }
  render() {

    let comp;

    if (this.state.userId) {
      comp = <DashboardContainer userId={this.state.userId}/>
    }
    else {
      comp = <Login updateUser={this.updateUser}/>
    }

    let message;
    if (this.state.message) {
      message = <Text>{this.state.message}</Text>
    }

    return (
      <View>
        {message}
        {comp}
      </View>
    );
  }
}
