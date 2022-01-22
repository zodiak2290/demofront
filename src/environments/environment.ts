// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBil8mss8fev_ntDGqEIuMMd4L9OmZAG1A",
    authDomain: "cvweb-17bce.firebaseapp.com",
    projectId: "cvweb-17bce",
    storageBucket: "cvweb-17bce.appspot.com",
    messagingSenderId: "500684115567",
    appId: "1:500684115567:web:3bad5f613ba56e155d079a",
    measurementId: "G-3EQPKRCKB0"  
  },


  realtimefirebase:{
    apiKey: "AIzaSyBil8mss8fev_ntDGqEIuMMd4L9OmZAG1A",
    authDomain: "cvweb-17bce.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://cvweb-17bce-default-rtdb.firebaseio.com",
    storageBucket: "bucket.appspot.com"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
