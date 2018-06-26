'use strict';

import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Picker } from 'emoji-mart-native';
import styles from '../style';

//show emoji picker from emoji-mart package and return the emoji using passed in function
export default function AddEmotion(props) {
	return (
	    <Picker style={StyleSheet.flatten(styles.emojiSelect)}
	    	onSelect={props.addEmotion}
		/>
	);
}