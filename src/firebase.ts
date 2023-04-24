// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
	apiKey: 'AIzaSyBRQQidtAjAqEzxtOe1wN8D3RH29BKNRxY',
	authDomain: 'code2know-db2e7.firebaseapp.com',
	projectId: 'code2know-db2e7',
	storageBucket: 'code2know-db2e7.appspot.com',
	messagingSenderId: '483939526755',
	appId: '1:483939526755:web:ab57a2bfd47dc8aebd3056',
	measurementId: 'G-04RP6P7KLM'
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);