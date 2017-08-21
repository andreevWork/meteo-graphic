export class DB {

  db;
  dbName = 'meteo';
  dbVersion = 1;

  stores = [];

  addStore(storeName, keyPath) {
    this.stores.push({storeName, keyPath});
  }

  connect() {
    return new Promise((res, rej) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = rej;

      request.onsuccess = () => {
        this.db = request.result;
        res();
      };

      request.onupgradeneeded = ({currentTarget}) => {
        for (let {storeName, keyPath} of this.stores) {
          currentTarget.result.createObjectStore(
            storeName,
            { keyPath }
          );
        }
      }
    });
  }

  getObjectStore(storeName, mode = 'readonly') {
    const transaction = this.db.transaction(storeName, mode);

    transaction.oncomplete = () => {
      console.log(`transaction ${storeName}, mode ${mode}: complete`);
    };

    transaction.onerror = event => {
      console.log(`transaction ${storeName}, mode ${mode}: error`, event);
    };

    return transaction.objectStore(storeName);
  }

  add(storeName, data) {
    const objectStore = this.getObjectStore(storeName, "readwrite");

    objectStore.add(data);
  }

  addArray(storeName, data) {
    const objectStore = this.getObjectStore(storeName, "readwrite");

    for (let item of data) {
      objectStore.add(item);
    }
  }

  getAll(storeName) {
    return new Promise((res, rej) => {
      const objectStore = this.getObjectStore(storeName);
      const data = [];
      let cursor = objectStore.openCursor();

      cursor.onsuccess = event => {
        const {result} = event.target;

        if (result) {
          data.push(result.value);
          result.continue();
        } else {
          res(data);
        }
      };
    });
  }
}
