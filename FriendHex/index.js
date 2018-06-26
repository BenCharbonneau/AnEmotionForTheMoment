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
  //this function builds a hexagon of a user's friends' emotions
  //it will add the user's own emotion in the center of the hexagon
  //it will fill in the rest of the emotions in a spiral pattern

  //the commented out code is for padding the final row to keep incomplete rows from centering and messing up the hexagon

  const rows = [];
  let row = [];

  //calculate the maximum rows that will be in hexagon of friends
  let maxRowNum = Math.ceil(Math.sqrt(1 + 4*(friends.length)/3))
  if (maxRowNum%2 === 0) {
    maxRowNum++;
  }

  //initiate variables
  let smallRowLength = 2;
  let middleRow = Math.ceil(maxRowNum/2) - 1;
  let smallRowTop = middleRow - 1;
  let smallRowBot = middleRow + 1;
  let direction = "up";

  //start building the hexagon from the middle
  //the middle row will have the current user's emotion
  let rowNum = middleRow;

  //loop through the user's friends and build the hexagon arrays
  for (let friend of friends) {

    //each row in the rows array is also an array
    //index 0 in the rows array corresponds with the top row in the hexagon
    if (!rows[rowNum]) {
      rows[rowNum] = [];
    }

    row = rows[rowNum];
    
    //if we reached the top row, fill it in and then start spiralling back down
    if (rowNum === smallRowTop) {
      row.push(friend);
      if (row.length === smallRowLength) {
        rowNum++;
        direction = "down";
      }
    }
    //if we reached the bottom row, fill it in and then start spiralling back up
    //increment the location of the top and bottom row, they will be farther out from the center now
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
    //add the current friend to the row we're on and move to the next row
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

  //if there are friends to display, convert the row arrays to React Native components
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

  //return the completed hexagon
  return (
    <View style={styles.friendRows}>
      {topOfHex}
      {centerRow}
      {bottomOfHex}
    </View>
  );
}