export class Select {

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
    this.select.addEventListener('change', () => {
      cb(this.getValue());
    });
  }
}
