'use strict';

import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import FriendEmotion from '../FriendEmotion';
import CurrentEmotion from '../CurrentEmotion';
import styles from '../style.js';

export default function FriendRow(props) {

	const friends = props.friends.map((friend) => {
		return (
			<FriendEmotion key={friend.id} style={styles.emoji} emotion={friend.emotion} />
		);
	})

	// if (props.padTo) {

	// 	let padTo = props.padTo;

	// 	if (props.emotion) {
	// 		padTo--;
	// 	}

	// 	for (let i = friends.length; i < padTo; i++) {
	// 		friends.push(<FriendEmotion key={"pad"+i} style={styles.emoji} emotion={' '}/>)
	// 	}

	// }

	if (props.emotion) {
		friends.splice(friends.length/2,0,<CurrentEmotion key={"currEm"} emotion={props.emotion} showSel={props.showSel}/>);
	}

	return (
		<View style={styles.friendRow}>
			{friends}
		</View>
	);
}