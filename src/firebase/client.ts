import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

import type { FirebaseClientEnv } from '../types/env.js';

const requiredClientEnvKeys: Array<keyof FirebaseClientEnv> = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
];

function readClientEnv(): FirebaseClientEnv {
  const rawEnv: FirebaseClientEnv = {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY ?? '',
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN ?? '',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ?? '',
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET ?? '',
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID ?? '',
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID ?? '',
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
  };

  const missingKeys = requiredClientEnvKeys.filter((key) => !rawEnv[key]);

  if (missingKeys.length > 0) {
    throw new Error(`Missing Firebase client environment variables: ${missingKeys.join(', ')}`);
  }

  return rawEnv;
}

let cachedApp: FirebaseApp | undefined;
let cachedAuth: Auth | undefined;
let cachedFirestore: Firestore | undefined;
let cachedStorage: FirebaseStorage | undefined;

export function getFirebaseClientApp(): FirebaseApp {
  if (cachedApp) {
    return cachedApp;
  }

  const config = readClientEnv();
  cachedApp = getApps().length > 0 ? getApp() : initializeApp(config);

  return cachedApp;
}

export function getFirebaseAuth(): Auth {
  if (cachedAuth) {
    return cachedAuth;
  }

  cachedAuth = getAuth(getFirebaseClientApp());
  return cachedAuth;
}

export function getFirebaseFirestore(): Firestore {
  if (cachedFirestore) {
    return cachedFirestore;
  }

  cachedFirestore = getFirestore(getFirebaseClientApp());
  return cachedFirestore;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (cachedStorage) {
    return cachedStorage;
  }

  cachedStorage = getStorage(getFirebaseClientApp());
  return cachedStorage;
}
