import firebase from "firebase";

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDHz2-CNeVYxORjhZvxrZt70KqqWNYADU0",
        authDomain: "chatapp-8134d.firebaseapp.com",
        databaseURL: "https://chatapp-8134d.firebaseio.com",
        projectId: "chatapp-8134d",
        storageBucket: "chatapp-8134d.appspot.com",
        messagingSenderId: "826248798942",
        appId: "1:826248798942:web:01f1e72d1f9d471a59d84f",
        measurementId: "G-VTCD2P71D1",
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };

      this.db.push(message);
    });
  };

  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
