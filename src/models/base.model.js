/**
 * @class
 * @abstract
 */
export class BaseModel {

  /**
   * Url for fetch data
   * @abstract
   */
  get dataUrl() {};

  /**
   * Name object store in IndexDB
   * @abstract
   */
  get storeName() {};

  /**
   * @abstract
   */
  get keyPath() {};

  constructor(db) {
    this.db = db;
    this.db.addStore(this.storeName, this.keyPath);
  }

  getAllData() {
    return this.db.getAll(this.storeName)
      .then(data => {
        if (!data.length) {
          return this.loadData()
            .then(data => {
              this.db.addArray(this.storeName, data);

              return data;
            });
        }

        return data;
      });
  }

  loadData() {
    return fetch(this.dataUrl)
      .then(res => res.json())
      .then(data => {
        const yearsDict = {};

        for (let item of data) {
          const year = parseInt(item.t, 10);
          yearsDict[year] = yearsDict[year] || [];
          yearsDict[year].push(item.v);
        }

        return Object.keys(yearsDict)
          .map(year => ({
            year: +year,
            values: yearsDict[year]
          }));
      });
  }
}
