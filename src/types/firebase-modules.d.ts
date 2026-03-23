declare module 'firebase/app' {
  export type FirebaseOptions = Record<string, string | undefined>;
  export interface FirebaseApp {}
  export function initializeApp(options: FirebaseOptions): FirebaseApp;
  export function getApp(): FirebaseApp;
  export function getApps(): FirebaseApp[];
}

declare module 'firebase/auth' {
  import type { FirebaseApp } from 'firebase/app';
  export interface Auth {}
  export function getAuth(app?: FirebaseApp): Auth;
}

declare module 'firebase/firestore' {
  import type { FirebaseApp } from 'firebase/app';
  export interface Firestore {}
  export function getFirestore(app?: FirebaseApp): Firestore;
}

declare module 'firebase/storage' {
  import type { FirebaseApp } from 'firebase/app';
  export interface FirebaseStorage {}
  export function getStorage(app?: FirebaseApp): FirebaseStorage;
}

declare module 'firebase-admin/app' {
  export interface App {}
  export interface ServiceAccount {
    projectId?: string;
    clientEmail?: string;
    privateKey?: string;
  }
  export function cert(serviceAccount: ServiceAccount): unknown;
  export function initializeApp(options?: Record<string, unknown>): App;
  export function getApp(): App;
  export function getApps(): App[];
}

declare module 'firebase-admin/auth' {
  import type { App } from 'firebase-admin/app';
  export interface Auth {}
  export function getAuth(app?: App): Auth;
}

declare module 'firebase-admin/firestore' {
  import type { App } from 'firebase-admin/app';
  export interface Firestore {}
  export function getFirestore(app?: App): Firestore;
}

declare module 'firebase-admin/storage' {
  import type { App } from 'firebase-admin/app';
  export interface Storage {}
  export function getStorage(app?: App): Storage;
}
