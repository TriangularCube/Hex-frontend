import { openDB as openIDB } from "idb";

const dbName = 'hex-database';
const version = 1;

export const storeName = 'hex-cards';
export const lastUpdatedKeyName = 'last-updated';

export const openDB = async () => {
    return await openIDB( dbName, version, {
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