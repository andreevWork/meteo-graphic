export class Select {

  handles = [];

  constructor(id) {
    this.select = document.getElementById(id);
  }

  setOptions(data, selected = 0) {
    let option;

    for (let [index, it] of data.entries()) {
      option = document.createElement("option");
      option.text = it;
      option.selected = selected === index ? 'selected' : false;
      this.select.add(option);
    }
  }

  getValue() {
    return this.select.options[this.select.selectedIndex].value;
  }

  onChange(cb) {
    const handle = () => {
      cb(this.getValue());
    };
    this.select.addEventListener('change', handle);
    this.handles.push(handle);
  }

  clearHandles() {
    this.handles
      .forEach(handle => {
        this.select.removeEventListener('change', handle);
      });
    this.handles.length = 0;
  }
}
