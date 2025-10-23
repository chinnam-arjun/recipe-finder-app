import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey : import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain : import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId : import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket : import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    appId : import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId : import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    messagingSenderId : import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
}

const app = initializeApp(firebaseConfig)
// Basic runtime check to help debug missing env vars in development
if (!firebaseConfig.apiKey) {
    // eslint-disable-next-line no-console
    console.error('Missing Firebase API key. Check your .env and Vite config (import.meta.env.VITE_FIREBASE_API_KEY).');
}

export const auth = getAuth(app)
