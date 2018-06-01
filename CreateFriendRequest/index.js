'use strict';

import React, { Component } from 'react';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import {
  Button
} from 'react-native-elements';
import SocketIOClient from 'socket.io-client';
import env from '../env';
import styles from '../style';

export default class CreateFriendRequest extends Component<Props> {
  constructor() {
  	super();
  	this.state = {
  		//users: [],
      canReqUsers: [],
      message: ''
  	}

    //this.socket = SocketIOClient('http://'+env.ip+':3000');
  
  }
  // componentDidMount() {
  //   this.getUsers()
  // }
  // componentWillUnmount() {
  //   this.socket.close();
  // }
  getUsers = async (text) => {
    try {

      // this.socket.on("userlist", (users) => {
      //   const newUsers = users.filter((user) => {
      //     return !this.state.users.includes(user.id);
      //   })

      //   const newUserIds = newUsers.map((user) => {
      //     return user.id;
      //   })

      //   this.setState({ users: [...this.state.users, ...newUserIds], canReqUsers: [...this.state.canReqUsers, ...newUsers] });
      // })
      if (text) {

        const usersJSON = await fetch(env.server+'/friends/requestsearch/'+ this.props.userId + '/' + text,{
          credentials: 'include'
        });
        const users = await usersJSON.json();

        // const userIds = users.users.map((user) => {
        //   return user.id;
        // })

        //this.setState({ users: userIds, canReqUsers: users.users });

        this.setState({canReqUsers: users.users, message: ''});
      }

    }
    catch (err) {
      console.error(err);
    }
  }
  sendFriendRequest = async (e) => {
    try {
      const friendText = ReactNativeComponentTree.getInstanceFromNode(e.target);
      const friendId = friendText.memoizedProps.id;

      this.textInput.setNativeProps({text: ''})
      this.setState({ canReqUsers: []})

      fetch(env.server+'/friends/request/'+this.props.userId,{
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friendId: friendId
        })
      })

      this.setState({message: "Friend request sent."})
    }
    catch (err) {
      console.error(err)
    }
  }
  render() {

    const users = this.state.canReqUsers.map((user) => {
      if (!user.message) {
        return <Text style={styles.frndReqRow} key={user.id} id={user.id} onPress={this.sendFriendRequest}>{user.username}</Text>
      }
      else {
        return <Text style={styles.frndReqRow} key={user.id} id={user.id} onPress={() => this.setState({message: user.message})}>{user.username}</Text>
      }
    })

    return (
      <View style={styles.view}>
        {this.state.message ? <Text style={styles.message}>{this.state.message}</Text> : undefined}
        <Text style={styles.text}>Enter a search and then pick a user to send a friend request to</Text>
        <TextInput ref={input => this.textInput = input} onChangeText={this.getUsers}/>
        {users}
        <Button onPress={this.props.hide} title='Done'/>
      </View>
    );
  }
}