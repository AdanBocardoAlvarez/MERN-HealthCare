import NodeCache from 'node-cache';

export class SessionDataStore {

    // Create a new instance of the cache
    static sessionCache = new NodeCache();

    // Function to store data in the cache
    static  setSessionData(key: string, value: any): void
    {
        try {  this.sessionCache.set(key, value); }
         catch (error) {  new Error(error) }
    }

    // Function to retrieve data from the cache
    static  getSessionData(key: string): any {

        try { return this.sessionCache.get(key); } 
        catch (error) { new Error(error) }
    }

    // Function to remove data from the cache
    static removeSessionData(key: string): any{

        try { return this.sessionCache.del(key); } 
        catch (error) { new Error(error) }
    }
}