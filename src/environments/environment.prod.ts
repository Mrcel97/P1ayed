import { firebase_key, firebase_message_sender_id } from "../assets/api_keys"

export const environment = {
  production: true,
  firebase: {
    apiKey: firebase_key,
    authDomain: "gamest-website.firebaseapp.com",
    databaseURL: "https://gamest-website.firebaseio.com",
    projectId: "gamest-website",
    storageBucket: "gamest-website.appspot.com",
    messagingSenderId: firebase_message_sender_id
  }
};
