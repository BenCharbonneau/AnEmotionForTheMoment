'use strict';

import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Button
} from 'react-native-elements';
import styles from '../style.js';

export default function NavMenu({showFReq,showFCrtReq,showHome,page}) {
	return (
		<View style={styles.nav} >
			{page !== 'create friend request' ? <Button onPress={showFCrtReq} title='Send Friend Request' /> : undefined }
        	{page !== 'friend request' ? <Button onPress={showFReq} title='See Friend Requests' /> : undefined }
        	{page ? <Button onPress={showHome} title='Home' /> : undefined}
		</View>
	);
}