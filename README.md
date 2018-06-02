#An Emotion for the Moment App

This app allows you to share how you're feeling with your friends. You can send and accept friend requests and then set your emotion for the moment to share it with your new friends. It uses API endpoints that are exposed at https://an-emotion-for-the-moment-api.herokuapp.com/ and documented at https://github.com/BenCharbonneau/AnEmotionForTheMomentAPI.

## User stories

* Users can login/register
* Users can set an emotion
* Users can send a friend request
* Users can accept a friend request
* Users can see their friends' emotions
* Users will be able to logout
* Users will be able to cancel a friend request or unfriend someone
* Users will be able to delete their account
* Users will be able to message each other

## Screenshots

![Login](https://raw.githubusercontent.com/BenCharbonneau/AnEmotionForTheMoment/master/screenshots/Login.png)
![Dashboard](https://raw.githubusercontent.com/BenCharbonneau/AnEmotionForTheMoment/master/screenshots/Dashboard.png)
![Update emotion](https://raw.githubusercontent.com/BenCharbonneau/AnEmotionForTheMoment/master/screenshots/Update%20Emotion.png)
![Send a friend request](https://raw.githubusercontent.com/BenCharbonneau/AnEmotionForTheMoment/master/screenshots/Send%20Friend%20Request.png)
![Accept a friend request](https://raw.githubusercontent.com/BenCharbonneau/AnEmotionForTheMoment/master/screenshots/Accept%20Friend%20Request.png)

## Technologies used

* React Native for the frontend
* Firebase for the database
* Socket.io for realtime communication between the server and the frontend
* Node.js with Express for the server

## ToDo list

* Finish deploying the server
* Deploy to the play store (requires SSL maybe?)
* Clean up unused npm packages
* Show users friend requests that they've sent
* Collect user's names during account creation
* Show users' names next to their username in the friend request page
* Add comments to code and clean out old comments
* Let users cancel a friend request/friendship
* Let users delete their account
* Move the friend hex to a CSS grid (if it's possible in React Native)
* Make the emoji select open immediately for a new user that has no emotion
* Update nav menu to use react-navigation ( tutorial here: https://www.raywenderlich.com/178012/react-native-tutorial-building-android-apps-javascript )
* Redirect users to the friend request show list if they try to send a friend request to a user that already sent them a friend request
* In realtime, prevent users from sending a friend request to a friend that already sent them a friend request
* Plug in Twitter, Facebook, Snapchat, etc. APIs so you can message your friends about thier emotions
* Test the iOS app and deploy it
* Create "inner circle" functionality that lets you prioritize which friends you see on your dashboard
* Continue to style the app