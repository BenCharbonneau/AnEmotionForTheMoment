'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from '../style.js';

export default function CurrentEmotion(props) {
	return (
		<Text style={styles.emoji} onPress={props.showSel}>{props.emotion || '😀'}</Text>
	);
}