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
      canReqUsers: [],
      message: ''
  	}
  }
  getUsers = async (text) => {
    try {

      if (text) {

        //search for users using the search term provided by the user
        const usersJSON = await fetch(env.server+'/friends/requestsearch/'+ this.props.userId + '/' + text,{
          credentials: 'include'
        });
        const users = await usersJSON.json();

        //put the returned users in state
        this.setState({canReqUsers: users.users, message: ''});
      }

    }
    catch (err) {
      console.error(err);
    }
  }
  sendFriendRequest = async (e) => {
    try {

      //get the user that the current user clicked on
      const friendText = ReactNativeComponentTree.getInstanceFromNode(e.target);
      const friendId = friendText.memoizedProps.id;

      //clear out the search input and results
      this.textInput.setNativeProps({text: ''})
      this.setState({ canReqUsers: []})

      //send the request to the server
      fetch(env.server+'/friends/request/'+this.props.userId,{
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friendId: friendId
        })
      })

      //let the user know that their request was sent
      this.setState({message: "Friend request sent."})
    }
    catch (err) {
      console.error(err)
    }
  }
  render() {

    //create a list of users from the search
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