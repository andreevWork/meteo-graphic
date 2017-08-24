export class Button {

  constructor(id) {
    this.button = document.getElementById(id);
  }

  onClick(cb) {
    this.button.addEventListener('click', cb);
  }
}
