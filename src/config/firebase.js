// npm install firebase

/* npm install -g firebase-tools
Firebase 호스팅으로 사이트를 호스팅하려면 Firebase CLI(명령줄 도구)가 필요합니다.
다음 npm 명령어를 실행하여 CLI를 설치하거나 최신 CLI 버전으로 업데이트하세요.
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsFA5Rc1u5gTtmv2ArgVM1a0AMbW1oh3E",
  authDomain: "memora-chain.firebaseapp.com",
  projectId: "memora-chain",
  storageBucket: "memora-chain.appspot.com",
  messagingSenderId: "199140780697",
  appId: "1:199140780697:web:2ba1b23acdf3669b3aa608",
  measurementId: "G-BWV8CWSHJT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
