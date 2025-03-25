importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Initialize Firebase inside the Service Worker
firebase.initializeApp({
    apiKey: "AIzaSyAC9ahUVhfibhFRnYg3wblneu2tZ-5h6M0",
    authDomain: "themothershp-mvp.firebaseapp.com",
    projectId: "themothershp-mvp",
    storageBucket: "themothershp-mvp.firebasestorage.app",
    messagingSenderId: "1035774205174",
    appId: "1:1035774205174:web:f004f42355cb86a72ee0d7"
  });

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message", payload);
  const notificationTitle = payload.notification?.title || "Background Message Title";
  const notificationOptions = {
    body: payload.notification?.body || "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
