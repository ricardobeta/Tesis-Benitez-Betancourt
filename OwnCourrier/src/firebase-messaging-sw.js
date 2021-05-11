// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyDuTbWtTM4t4VOAo2Z-L1AwtP51h1nXM08",
    authDomain: "owncourrier.firebaseapp.com",
    databaseURL: "https://owncourrier-default-rtdb.firebaseio.com",
    projectId: "owncourrier",
    storageBucket: "owncourrier.appspot.com",
    messagingSenderId: "88826250019",
    appId: "1:88826250019:web:641a20b53d3810399a8296",
    measurementId: "G-50V1GDT92F"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();