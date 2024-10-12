// src/global.d.ts
import { MongoClient } from 'mongodb';

/* eslint-disable no-var */
declare global {
  var _mongoClientPromise: Promise<MongoClient>; // Adiciona a propriedade ao objeto global
}
/* eslint-enable no-var */

export {};
