import { cert, getApp, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getStorage, type Storage } from 'firebase-admin/storage';

import type { FirebaseAdminEnv } from '../types/env.js';

const requiredAdminEnvKeys: Array<keyof FirebaseAdminEnv> = [
  'FIREBASE_ADMIN_PROJECT_ID',
  'FIREBASE_ADMIN_CLIENT_EMAIL',
  'FIREBASE_ADMIN_PRIVATE_KEY',
];

function readAdminEnv(): FirebaseAdminEnv {
  const rawEnv: FirebaseAdminEnv = {
    FIREBASE_ADMIN_PROJECT_ID: process.env.FIREBASE_ADMIN_PROJECT_ID ?? '',
    FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL ?? '',
    FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? '',
    FIREBASE_ADMIN_STORAGE_BUCKET: process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
  };

  const missingKeys = requiredAdminEnvKeys.filter((key) => !rawEnv[key]);

  if (missingKeys.length > 0) {
    throw new Error(`Missing Firebase admin environment variables: ${missingKeys.join(', ')}`);
  }

  return rawEnv;
}

let cachedAdminApp: App | undefined;
let cachedAdminAuth: Auth | undefined;
let cachedAdminFirestore: Firestore | undefined;
let cachedAdminStorage: Storage | undefined;

export function getFirebaseAdminApp(): App {
  if (cachedAdminApp) {
    return cachedAdminApp;
  }

  const config = readAdminEnv();

  cachedAdminApp = getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: cert({
          projectId: config.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: config.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: config.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        storageBucket: config.FIREBASE_ADMIN_STORAGE_BUCKET,
      });

  return cachedAdminApp;
}

export function getFirebaseAdminAuth(): Auth {
  if (cachedAdminAuth) {
    return cachedAdminAuth;
  }

  cachedAdminAuth = getAuth(getFirebaseAdminApp());
  return cachedAdminAuth;
}

export function getFirebaseAdminFirestore(): Firestore {
  if (cachedAdminFirestore) {
    return cachedAdminFirestore;
  }

  cachedAdminFirestore = getFirestore(getFirebaseAdminApp());
  return cachedAdminFirestore;
}

export function getFirebaseAdminStorage(): Storage {
  if (cachedAdminStorage) {
    return cachedAdminStorage;
  }

  cachedAdminStorage = getStorage(getFirebaseAdminApp());
  return cachedAdminStorage;
}
