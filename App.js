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
      //login or register a user on the server

      let respJSON;
      const body = await JSON.stringify({
        username: username,
        password: password
      })

      if (register) {
        respJSON = await fetch(env.server+'/users/register',{
          method: 'POST',
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
          body: body
        })
      }
      else {
        respJSON = await fetch(env.server+'/users/login',{
          method: 'POST',
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
          body: body
        })
      }

      const response = await respJSON.json();
      const user = response.user;

      //if successful, login the user
      if (user) {
        this.setState({ username: user.username, userId: user.id, message: '' });
      }
      //otherwise, show any error messages
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

    //show the dashboard if the user is logged in
    if (this.state.userId) {
      comp = <DashboardContainer userId={this.state.userId}/>
    }
    //otherwise, show the login page
    else {
      comp = <Login message={this.state.message} updateUser={this.updateUser}/>
    }

    return (
      <View>
        {comp}
      </View>
    );
  }
}
