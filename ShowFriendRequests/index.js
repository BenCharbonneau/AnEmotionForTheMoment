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

export default class ShowFriendRequests extends Component<Props> {
  constructor() {
  	super();
  	this.state = {
  		friendReqs: []
  	}

    //open a web socket with the server
    this.socket = SocketIOClient(env.server);
  
  }
  componentDidMount() {
    this.getFriendReqs()
  }
  componentWillUnmount() {
    //close the web socket
    this.socket.close();
  }
  getFriendReqs = async () => {
    try {

      //listen for changes the the user's existing friend requests
      this.socket.on(this.props.userId+"_reqs", (freqs) => {
        this.setState({ friendReqs: freqs });
      })

      //tell the server to listen for changes to the user's friend requests
      await fetch(env.server+'/friends/requests/'+this.props.userId,{
        credentials: 'include'
      });
      
    }
    catch (err) {
      console.error(err);
    }
  }
  acceptFriendRequest = async (e) => {
  	try {

      //get the request that the user selected to accept
      const request = ReactNativeComponentTree.getInstanceFromNode(e.target);
      const requestId = request.memoizedProps.id;

      //remove the request from the list
      const newFrndReqs = this.state.friendReqs.filter((req) => {
        return req.id !== requestId;
      })

      this.setState({ friendReqs: newFrndReqs})

      //tell the server to update the friend request to accepted
      fetch(env.server+'/friends/request/accept/'+requestId,{
        method: 'POST',
        credentials: 'include'
      })
    }
    catch (err) {
      console.error(err)
    }
  }
  render() {

    //convert the list of friend requests to React Native components
    const freqs = this.state.friendReqs.map((freq) => {
      return <Text style={styles.frndReqRow} key={freq.id} id={freq.id} onPress={this.acceptFriendRequest}>{freq.requestor.username}</Text>
    })

    return (
      <View style={styles.view}>
      	<Text style={styles.text}>Click on a username to accept their friend request</Text>
        {freqs}
        <Button onPress={this.props.hide} title='Done'/>
      </View>
    );
  }
}