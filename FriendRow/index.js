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
	//take an array of friends' emotions and converts them to React Native components
	//the commented out code can be used to pad the row with empty emotions

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

	//if this is a center row, then add the current user's emotion to the center
	if (props.center) {
		friends.splice(friends.length/2,0,<CurrentEmotion key={"currEm"} emotion={props.emotion} showSel={props.showSel}/>);
	}

	return (
		<View style={styles.friendRow}>
			{friends}
		</View>
	);
}