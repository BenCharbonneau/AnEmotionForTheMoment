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

    //open a web socket with the server
    this.socket = SocketIOClient(env.server);
  
  }
  componentDidMount() {
    this.getEmotion();

  	this.getFriendsEmotions();
  }
  componentWillUnmount() {
    //close the web socket
    this.socket.close();
  }
  getEmotion = async () => {

    //get the current user's information from the server
    const userJSON = await fetch(env.server+'/users/'+this.props.userId,{
      credentials: 'include'
    })
    const user = await userJSON.json();

    //get the user's emotion
    const emotion = user.user.emotion;
    
    //add the emotion to state
    if (emotion) {
      this.setState({emotion: emotion})
    }
    //if the user doesn't have an emotion, then show help text telling them how to change it
    else {
      this.setState({help: 'Click your emotion below to change it'})
    }
  }
  getFriendsEmotions = async () => {
    try {

      //listen for updates to the user's friend list
      this.socket.on(this.props.userId, (friends) => {
        this.setState({ friends: friends.friends });
      })

      //tell the server to start listening for the user's friends
      await fetch(env.server+'/friends/'+this.props.userId,{
        credentials: 'include'
      });

    }
    catch (err) {
      console.error(err);
    }
  }
  //show functions to select the "page" to display to the user
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
  //end show functions
  addEmotion = async (emoji) => {
    try {

      //update the user's emtoion on the server
      await fetch(env.server+'/users/emotion/'+this.props.userId,{
        method: 'PATCH',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emotion: emoji.native
        })
      });

      //update the user's emotion in state
      this.setState({ emotion: emoji.native, page: '', help: '' });
    }
    catch (err) {
      console.error(err)
    }
  }
  render() {

    //get the page to show from state
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

    //get any messages from the server to display to the user
    let message;
    if (this.state.message) {
      message = <Text style={styles.text}>{this.state.message}</Text>
    }

    //get any help text from state to display to the user
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