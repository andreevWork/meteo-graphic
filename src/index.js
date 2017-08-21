import {DB} from "./db/index";
import {TemperatureModel} from "./models/temperature/temperature.model";
import {GraphicController} from "./controllers/graphic/index";

const db = new DB();
const temperatureModel = new TemperatureModel(db);

db.connect()
  .then(() => {
    temperatureModel.getAllData()
      .then(data => {

        new GraphicController(data);
      });
  })
  .catch(err => console.log(err));
