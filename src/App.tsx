import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getToken, MessagePayload } from "firebase/messaging";
import { messaging } from "./firebase/firebase.setup";
import { onBackgroundMessage } from "firebase/messaging/sw";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    requestPermission();

    getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY })
      .then(async (currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log(currentToken);
          await window.navigator.clipboard.writeText(currentToken);
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  }, []);

  onBackgroundMessage(messaging, (payload: MessagePayload) => {
    console.log("message recieved", payload);
    const me = self as any;
    me.registration.showNotification(payload.data?.title, {
      body: payload.data?.body,
    });
  });

  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    });
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
