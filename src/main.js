import { createApp, VueElement } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import MessagePlagin from './utils/message.plagin.js';
import App from './App.vue';
import store from './store';
import Login from './components/Login.vue';
import Categories from './components/Categories.vue';
import DetailRecord from './components/DetailRecord.vue';
import history from './components/History.vue';
import Home from './components/Home.vue';
import Planning from './components/Planning.vue';
import Profile from './components/Profile.vue';
import Record from './components/Record.vue';
import Register from './components/Register.vue';
import 'materialize-css/dist/js/materialize.min.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const routes = [
  { path: '/login', component: Login, meta: { layout: 'empty' } },
  { path: '/categories', component: Categories, meta: { layout: 'main' } },
  { path: '/detail-record', component: DetailRecord, meta: { layout: 'main' } },
  { path: '/history', component: history, meta: { layout: 'main' } },
  { path: '/', component: Home, meta: { layout: 'main' } },
  { path: '/planning', component: Planning, meta: { layout: 'main' } },
  { path: '/profile', component: Profile, meta: { layout: 'main' } },
  { path: '/record', component: Record, meta: { layout: 'main' } },
  { path: '/register', component: Register, meta: { layout: 'empty' } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

firebase.initializeApp({
  apiKey: 'AIzaSyDVrUGv15k9zYRE85gL7OG_uuFttYv9orw',
  authDomain: 'crm-99d51.firebaseapp.com',
  projectId: 'crm-99d51',
  storageBucket: 'crm-99d51.appspot.com',
  messagingSenderId: '491370171836',
  appId: '1:491370171836:web:71c28b6e7484cd3269afb9',
  measurementId: 'G-2JMKQE4BGV',
  databaseURL:
    'https://crm-99d51-default-rtdb.europe-west1.firebasedatabase.app/',
});
let newApp;
firebase.auth().onAuthStateChanged(() => {
  if (!newApp) {
    newApp = createApp(App)
      .use(router)
      .use(MessagePlagin)
      .use(store)
      .mount('#app');
  }
});
