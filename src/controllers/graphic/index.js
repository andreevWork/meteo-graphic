import {Graphic} from "../../elements/graphic/index";
import {Select} from "../../elements/select/index";

export class GraphicController {

  graphic = new Graphic('graphic');
  selectFrom = new Select('from');
  selectTo = new Select('to');

  constructor(data) {

    this.graphic.renderAxisX();
    this.graphic.renderAxisY();
    // this.graphic.setSelects([1,2,3,4,5]);

    data = data.reduce((prev, item) => {
      prev = prev.concat(item.values);
      return prev;
    }, []);

    this.graphic.renderGraphic(data, Math.min(...data), Math.max(...data));
  }



  setSelects(data) {
    this.selectFrom.setOptions(data, 0);
    this.selectTo.setOptions(data, data.length - 1);

    this.selectTo.onChange(e => {
      console.log(e)
    })
  }
}
