'use strict';

import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

//display a user's emotion in a Text element
export default function FriendEmotion(props) {
	return (
		<Text style={props.style}>{props.emotion}</Text>
	);
}