import { openDB } from "idb";

export const dbName = 'hex-database';
export const storeName = 'hex-cards';
export const version = 1;
export const lastUpdatedKeyName = 'last-updated';

export const open = async () => {
    return await openDB( dbName, version, {
        upgrade: (db, lastVersion) => {
            switch( lastVersion ){
                case 0:
                    const store = db.createObjectStore( storeName );

                    store.createIndex( 'name', 'name' );
                    break;
                case 1:
                    // NOTE This isn't needed at the moment
                    break;
            }
        },
        // blocked:
        // blocking:
    });
};