import * as firebase from "firebase";
import "firebase/database";

var config = {
  apiKey: "AIzaSyABKyDe1d4fwhKTvpqZknIxYuSR31QsNys",
  authDomain: "audio-broadcast.firebaseapp.com",
  databaseURL: "https://audio-broadcast-default-rtdb.firebaseio.com",
  projectId: "audio-broadcast",
  storageBucket: "audio-broadcast.appspot.com",
  messagingSenderId: "1097355209392",
  appId: "1:1097355209392:web:edb75639effe884ddb2975"
};

firebase.initializeApp(config);

export default firebase.database();
