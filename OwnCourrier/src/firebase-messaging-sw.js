// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/[the number of version matching with firebase in package.json]/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/[for example: 7.16.1]/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyDuTbWtTM4t4VOAo2Z-L1AwtP51h1nXM08",
    authDomain: "owncourrier.firebaseapp.com",
    databaseURL: "https://owncourrier-default-rtdb.firebaseio.com",
    projectId: "owncourrier",
    storageBucket: "owncourrier.appspot.com",
    messagingSenderId: "88826250019",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();