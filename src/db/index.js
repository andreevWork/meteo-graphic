export class DB {

  db;
  dbName = 'meteo';
  dbVersion = 1;

  stores = [];

  addStore(storeName, keyPath) {
    this.stores.push([storeName, { keyPath }]);
  }

  connect() {
    return new Promise(resolve => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = ({currentTarget}) => {
        this.stores
          .forEach(store => currentTarget.result.createObjectStore(...store));
      }
    });
  }

  getObjectStore(storeName, mode = 'readonly') {
    const transaction = this.db.transaction(storeName, mode);

    const promise = new Promise(resolve => {
      transaction.oncomplete = resolve;
    });

    return {
      objectStore: transaction.objectStore(storeName),
      promise
    };
  }

  addArray(storeName, data) {
    const {objectStore, promise} = this.getObjectStore(storeName, "readwrite");

    for (let item of data) {
      objectStore.add(item);
    }

    return promise;
  }

  getKeysByFilters(filters) {
    const {from, to} = filters;

    return IDBKeyRange.bound(from, to);
  }

  getData(storeName, filters) {
    return new Promise(resolve => {
      const data = [];
      const {objectStore} = this.getObjectStore(storeName);
      let cursor = filters ?
        objectStore.openCursor(this.getKeysByFilters(filters))
        :
        objectStore.openCursor();

      cursor.onsuccess = event => {
        const {result} = event.target;

        if (result) {
          data.push(result.value);
          result.continue();
        } else {
          resolve(data);
        }
      };
    });
  }
}
