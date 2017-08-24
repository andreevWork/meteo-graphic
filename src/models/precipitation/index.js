import {BaseModel} from "../base.model";

export class PrecipitationModel extends BaseModel {
  get dataUrl() {
    return '/precipitation.json';
  }

  get storeName() {
    return 'PrecipitationStore';
  }

  get keyPath() {
    return 'year';
  }
}
