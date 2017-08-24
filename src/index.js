import {DB} from "./db/index";
import {GraphicPage} from "./pages/graphic.page";
import {TemperatureModel} from "./models/temperature";
import {PrecipitationModel} from "./models/precipitation";

const db = new DB();
const temperatureModel = new TemperatureModel(db);
const precipitationModel = new PrecipitationModel(db);

db.connect()
  .then(() => {
    new GraphicPage({
      temperature: temperatureModel,
      precipitation: precipitationModel
    });
  });
