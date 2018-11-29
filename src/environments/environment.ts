// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { firebase_key, firebase_message_sender_id } from "../assets/api_keys"

export const environment = {
  production: false,
  firebase: {
    apiKey: firebase_key,
    authDomain: "gamest-website.firebaseapp.com",
    databaseURL: "https://gamest-website.firebaseio.com",
    projectId: "gamest-website",
    storageBucket: "gamest-website.appspot.com",
    messagingSenderId: firebase_message_sender_id
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
