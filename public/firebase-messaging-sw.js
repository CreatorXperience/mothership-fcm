self.addEventListener("push", async () => {
    const { getMessaging, onBackgroundMessage } = await require("firebase/messaging/sw");
  
    const messaging = getMessaging();
    
    onBackgroundMessage(messaging, (payload) => {
      console.log("[firebase-messaging-sw.js] Received background message", payload);
  
      const notificationTitle = payload.notification?.title || "Background Message Title";
      const notificationOptions = {
        body: payload.notification?.body || "Background Message body.",
        icon: "/firebase-logo.png",
      };
  
      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  });