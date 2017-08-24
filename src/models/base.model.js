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
    return this.db.getData(this.storeName)
      .then(data => data && data.length > 0 ?
        data
        :
        this.loadData()
          .then(data => this.db.addArray(this.storeName, data))
          .then(() => this.db.getData(this.storeName))
      );
  }

  getFilteredData(filters) {
    return this.db.getData(this.storeName, filters);
  }

  loadData() {
    return fetch(this.dataUrl)
      .then(res => res.json())
      .then(data => {
        // console.time('parseData');

        const yearsDict = {};

        for (let item of data) {
          const year = parseInt(item.t, 10);
          yearsDict[year] = yearsDict[year] || [];
          yearsDict[year].push(item.v);
        }

        const result = Object.keys(yearsDict)
          .map(year => ({
            year: year,
            values: yearsDict[year]
          }));

        // console.timeEnd('parseData');

        return result;
      });
  }
}
