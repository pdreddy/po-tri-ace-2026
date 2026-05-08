import admin from 'firebase-admin';
import { env } from '../config/env';

const shouldInit =
  env.firebase.projectId && env.firebase.clientEmail && env.firebase.privateKey;

if (!admin.apps.length && shouldInit) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.firebase.projectId,
      clientEmail: env.firebase.clientEmail,
      privateKey: env.firebase.privateKey,
    }),
  });
}

export const firebaseAdmin = admin;
