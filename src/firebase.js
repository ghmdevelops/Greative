import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDpkJn3w2gfM5bmSs0BXCqJP0IxBKl1Az0",
  authDomain: "petnurture-793e7.firebaseapp.com",
  databaseURL: "https://petnurture-793e7-default-rtdb.firebaseio.com",
  projectId: "petnurture-793e7",
  storageBucket: "petnurture-793e7.appspot.com",
  messagingSenderId: "258395935589",
  appId: "1:258395935589:web:573880943da2f5ec3b478c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
