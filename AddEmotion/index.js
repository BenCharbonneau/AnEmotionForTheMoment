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

export default function AddEmotion(props) {
	return (
	    <Picker style={StyleSheet.flatten(styles.emojiSelect)}
	    	onSelect={props.addEmotion}
		/>
	);
}