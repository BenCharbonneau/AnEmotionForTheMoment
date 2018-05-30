'use strict';

import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CurrentEmotion from '../CurrentEmotion';
import FriendRow from '../FriendRow';
import styles from '../style';

export default function FriendHex({friends,emotion,showSel}) {

  const rows = [];
  let row = [];
  let maxRowNum = Math.ceil(Math.sqrt(1 + 4*(friends.length)/3))
  if (maxRowNum%2 === 0) {
    maxRowNum++;
  }
  let smallRowLength = 2;
  let middleRow = Math.ceil(maxRowNum/2) - 1;
  let smallRowTop = middleRow - 1;
  let smallRowBot = middleRow + 1;
  let direction = "up";
  let rowNum = middleRow;

  for (let friend of friends) {

    if (!rows[rowNum]) {
      rows[rowNum] = [];
    }

    row = rows[rowNum];
    
    if (rowNum === smallRowTop) {
      row.push(friend);
      if (row.length === smallRowLength) {
        rowNum++;
        direction = "down";
      }
    }
    else if (rowNum === smallRowBot) {
      row.push(friend);
      if (row.length === smallRowLength+1) {
        smallRowTop--;
        smallRowBot++;
        smallRowLength++;
        rowNum--;
        direction="up";
      }
    }
    else {
      row.push(friend);
      if (direction === "up") {
        rowNum--;
      }
      else {
        rowNum++;
      }
    }
  }

  let topOfHex;
  let centerRow;
  let bottomOfHex;
  let maxSmallRowLength = (maxRowNum+1)/2;
  //let maxLongRowLength = (maxSmallRowLength+(maxRowNum-1)/2);

  if (rows.length) {

    topOfHex = rows.slice(0,middleRow).map((friendRow,i) => {
      return (<FriendRow key={i} friends={friendRow}/>);
    });

    // let padTo = maxSmallRowLength;

    // for (let i in topOfHex) {
    //   const friendRow = topOfHex[i];
    //   topOfHex[i] = (<FriendRow key={i} padTo={padTo} friends={friendRow}/>)
    //   padTo++;
    // }

    centerRow = <FriendRow key={"curr"} friends={rows.slice(middleRow,middleRow+1)[0]} emotion={emotion} center={true} showSel={showSel}/>

    bottomOfHex = rows.slice(middleRow+1).map((friendRow,i) => {
      return (<FriendRow key={i} friends={friendRow}/>);
    });

    // for (let i in bottomOfHex) {
    //   const friendRow = bottomOfHex[i];
    //   bottomOfHex[i] = (<FriendRow key={i} padTo={padTo} friends={friendRow}/>)
    //   padTo--;
    // }

  }
  else {
    centerRow = <CurrentEmotion emotion={emotion} showSel={showSel}/>
  }

  return (
    <View style={styles.friendRows}>
      {topOfHex}
      {centerRow}
      {bottomOfHex}
    </View>
  );
}