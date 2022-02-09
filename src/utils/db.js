// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {child, get, getDatabase, push, ref} from "firebase/database";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default {
    async save(workout) {
        return await push(ref(db, 'workouts'), workout);
    },

    async getAll() {
        const dbRef = ref(getDatabase());

        try {
            const snapshot = await get(child(dbRef, `/workouts`));
            return snapshot.val();
        } catch (err) {
            console.error(err);
            return [];
        }
    },

    async getOne(id) {
        const dbRef = ref(getDatabase());
        try {
            const snapshot = await get(child(dbRef, `/workouts+${id}`));
            return snapshot.val();
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}
