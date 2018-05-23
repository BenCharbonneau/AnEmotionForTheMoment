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
import styles from './style';

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      username: 'Ben'
    }
  }
  componentDidMount() {
    //open database connection
  }
  updateUser = (username,password) => {
    //Add password handling code when you have a database
    this.setState({ username: username });
  }
  render() {

    let comp;

    if (this.state.username) {
      comp = <DashboardContainer username={this.state.username}/>
    }
    else {
      comp = <Login updateUser={this.updateUser} />
    }

    return (
      <View>
        {comp}
      </View>
    );
  }
}
