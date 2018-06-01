'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AddEmotion from '../AddEmotion';
import FriendHex from '../FriendHex';
import CrtFrndReq from '../CreateFriendRequest';
import ShowFriendRequests from '../ShowFriendRequests';
import NavMenu from '../NavMenu';
import env from '../env';
import styles from '../style';

import SocketIOClient from 'socket.io-client';

export default class DashboardContainer extends Component<Props> {
  constructor() {
  	super();
  	this.state = {
  		friends: [],
      page: '',
      emotion: '',
      message: '',
      help: ''
  	}

    this.socket = SocketIOClient(env.server);
  
  }
  componentDidMount() {
    this.getEmotion();

  	this.getFriendsEmotions();
  }
  componentWillUnmount() {
    this.socket.close();
  }
  getEmotion = async () => {
    const userJSON = await fetch(env.server+'/users/'+this.props.userId,{
      credentials: 'include'
    })
    const user = await userJSON.json();

    const emotion = user.user.emotion;
    
    if (emotion) {
      this.setState({emotion: emotion})
    }
    else {
      this.setState({help: 'Click your emotion below to change it'})
    }
  }
  getFriendsEmotions = async () => {
    try {
      // await this.socket.on("message",(message) => {
      //   console.error(message)
      // })
      this.socket.on(this.props.userId, (friends) => {
        this.setState({ friends: friends.friends });
      })

      await fetch(env.server+'/friends/'+this.props.userId,{
        credentials: 'include'
      });

      // const messageJSON = await fetch(env.server);
      // const message = await messageJSON.json();
      // this.setState({message: message.message});
      // const friendsJSON = await fetch(env.server+'/friends/'+this.props.userId);
      // const friends = await friendsJSON.json();
      // this.setState({ friends: friends.friends });
    }
    catch (err) {
      console.error(err);
    }
  }
  showSel = () => {
    this.setState({page: 'emotion select'})
  }
  showFReq = () => {
    this.setState({page: 'friend request', help: ''})
  }
  showFCrtReq = () => {
    this.setState({page: 'create friend request', help: ''})
  }
  showHome = () => {
    this.setState({page: ''})
  }
  addEmotion = (emoji) => {
    try {
      await fetch(env.server+'/users/emotion/'+this.props.userId,{
        method: 'PATCH',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emotion: emoji.native
        })
      });

      this.setState({ emotion: emoji.native, page: '', help: '' });
    }
    catch (err) {
      console.error(err)
    }
  }
  render() {
    let page;
    switch (this.state.page) {
      case 'emotion select': page = <AddEmotion addEmotion={this.addEmotion}/>
      break;
      case 'friend request': page = <ShowFriendRequests hide={this.showHome} userId={this.props.userId} />
      break;
      case 'create friend request': page = <CrtFrndReq hide={this.showHome} userId={this.props.userId} />
      break;
      default: page = <FriendHex emotion={this.state.emotion} showSel={this.showSel} friends={this.state.friends} />
    }

    let message;
    if (this.state.message) {
      message = <Text style={styles.text}>{this.state.message}</Text>
    }

    let help;
    if (this.state.help) {
      help = <Text style={styles.text}>{this.state.help}</Text>
    }

    return (
      <View style={styles.view}>
        <Text style={styles.header}>An Emotion for the Moment</Text>
        <NavMenu showFReq={this.showFReq} showFCrtReq={this.showFCrtReq} showHome={this.showHome} page={this.state.page}/>
        {help}
        {message}
        {page}
      </View>
    );
  }
}