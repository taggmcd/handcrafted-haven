declare namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient>;
    }
  }
  
  declare const global: NodeJS.Global & typeof globalThis;
  