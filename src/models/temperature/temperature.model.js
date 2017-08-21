import {BaseModel} from "../base.model";

export class TemperatureModel extends BaseModel {
  get dataUrl() {
    return '/temperature.json';
  }

  get storeName() {
    return 'TemperatureStore';
  }

  get keyPath() {
    return 'year';
  }
}
