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

    this.socket = SocketIOClient(env.server);
  
  }
  componentDidMount() {
    this.getFriendReqs()
  }
  componentWillUnmount() {
    this.socket.close();
  }
  getFriendReqs = async () => {
    try {

      this.socket.on(this.props.userId+"_reqs", (freqs) => {
        this.setState({ friendReqs: freqs });
      })

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
      const request = ReactNativeComponentTree.getInstanceFromNode(e.target);
      const requestId = request.memoizedProps.id;
      const newFrndReqs = this.state.friendReqs.filter((req) => {
        return req.id !== requestId;
      })

      this.setState({ friendReqs: newFrndReqs})

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