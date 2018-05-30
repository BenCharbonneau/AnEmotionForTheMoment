'use strict';

import React, { Component } from 'react';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Button
} from 'react-native-elements';
import SocketIOClient from 'socket.io-client';
import env from '../env';
import styles from '../style';

export default class DashboardContainer extends Component<Props> {
  constructor() {
  	super();
  	this.state = {
  		users: [],
      canReqUsers: []
  	}

    this.socket = SocketIOClient('http://'+env.ip+':3000');
  
  }
  componentDidMount() {
    this.getUsers()
  }
  getUsers = async () => {
    try {

      this.socket.on("userlist", (users) => {
        const newUsers = users.filter((user) => {
          return !this.state.users.includes(user.id);
        })

        const newUserIds = newUsers.map((user) => {
          return user.id;
        })

        this.setState({ users: [...this.state.users, ...newUserIds], canReqUsers: [...this.state.canReqUsers, ...newUsers] });
      })

      const usersJSON = await fetch('http://'+env.ip+':3000/users');
      const users = await usersJSON.json();

      const userIds = users.users.map((user) => {
        return user.id;
      })

      this.setState({ users: userIds, canReqUsers: users.users });

    }
    catch (err) {
      console.error(err);
    }
  }
  sendFriendRequest = async (e) => {
    try {
      const friendText = ReactNativeComponentTree.getInstanceFromNode(e.target);
      const friendId = friendText.memoizedProps.id;
      const canReqUsers = this.state.canReqUsers.filter((user) => {
        return user.id !== friendId;
      })

      this.setState({ canReqUsers: canReqUsers})

      fetch('http://'+env.ip+':3000/friends/request/'+this.props.userId,{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friendId: friendId
        })
      })
    }
    catch (err) {
      console.error(err)
    }
  }
  render() {

    const users = this.state.canReqUsers.map((user) => {
      return <Text key={user.id} id={user.id} onPress={this.sendFriendRequest}>{user.username}</Text>
    })

    return (
      <View style={styles.view}>
        {users}
        <Button onPress={this.props.hideFReq} title='Done'/>
      </View>
    );
  }
}