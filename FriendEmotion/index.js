'use strict';

import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function FriendEmotion(props) {
	return (
		<Text style={props.style}>{props.emotion}</Text>
	);
}