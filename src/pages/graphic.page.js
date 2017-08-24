import {Graphic} from "../elements/graphic/index";
import {Select} from "../elements/select/index";
import {Button} from "../elements/button/index";

export class GraphicPage {

  graphic = new Graphic('graphic');
  selectFrom = new Select('from');
  selectTo = new Select('to');

  constructor(models) {
    const modelNames = Object.keys(models);

    this.models = models;
    this.activeModelName = modelNames[0];

    modelNames
      .forEach(modelName => {
        const button = new Button(modelName);

        button.onClick(() => {
          if (this.activeModelName === modelName) {
            return;
          }
          this.activeModelName = modelName;
          this.createGraphic();
        });
      });

    this.createGraphic();
  }

  createGraphic() {
    const model = this.models[this.activeModelName];

    this.selectFrom.clearHandles();
    this.selectTo.clearHandles();

    model.getAllData()
      .then(data => {
        this.setSelects(data.map(({year}) => year));
        this.renderGraphic(data);
      });
  }

  renderGraphic(data) {
    this.graphic.clear();

    this.graphic.renderAxisX();
    this.graphic.renderAxisY();

    data = data.reduce((prev, item) => {
      prev = prev.concat(item.values);
      return prev;
    }, []);

    this.graphic.renderGraphic(data, Math.min(...data), Math.max(...data));
  }

  reRenderGraphic() {
    const model = this.models[this.activeModelName];

    model.getFilteredData({
      from: +this.selectFrom.getValue(),
      to: +this.selectTo.getValue(),
    })
      .then(data => {
        console.log(data);
        this.renderGraphic(data);
      });
  }

  setSelects(data) {
    this.selectFrom.setOptions(data, 0);
    this.selectTo.setOptions(data, data.length - 1);

    this.selectFrom.onChange(e => {
      this.reRenderGraphic();
      console.log(e)
    });
    this.selectTo.onChange(e => {
      this.reRenderGraphic();
      console.log(e)
    });
  }
}
