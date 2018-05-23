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
import styles from '../style';
import Friends from '../seed';

export default class DashboardContainer extends Component<Props> {
  constructor(props) {
  	super(props);
  	this.state = {
  		friends: [],
      username: this.props ? this.props.username : '',
      showSel: false,
      emotion: ''
  	}
  }
  componentDidMount() {
    this.getEmotion();

  	this.getFriendsEmotions();
  }
  getEmotion = async () => {
    const emotion = '😍'
    this.setState({emotion: emotion})
  }
  getFriendsEmotions = async () => {
    //database call to populate friends array
    //use this.username for lookup
    const friends = Friends;
    this.setState({ friends: friends });
  }
  showSel = () => {
    this.setState({showSel: true})
  }
  addEmotion = (emoji) => {
    //create emotion on the  database  
    const username = this.props.username;
    //update user on the database
    //user.emotion = emotion;
    //user.save
    this.setState({ emotion: emoji.native, showSel: false });
  }
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.header}>Friend Dashboard</Text>
        {this.state.showSel ?
          <AddEmotion addEmotion={this.addEmotion}/> :
          <FriendHex emotion={this.state.emotion} showSel={this.showSel} friends={this.state.friends} />
        }
      </View>
    );
  }
}
//{friendEmotions}
//<AddEmotion addEmotion={this.addEmotion}/>
//<CurrentEmotion username={this.state.username} />