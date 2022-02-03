// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FB_API_KEY,
    authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FB_DB_URL,
    projectId: process.env.VUE_APP_FB_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FB_PROJECT_ID,
    messagingSenderId: process.env.VUE_APP_FB_MSG_SENDER_ID,
    appId: process.env.VUE_APP_FB_APP_ID,
    measurementId: process.env.VUE_APP_FB_MEASUREMENT_ID
};

// Initialize Firebase
export default initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
