import { EventEmitter } from "events";
import { Meal } from "../model/meal.js";

export class MealCard extends HTMLElement {
  constructor() {
    super();

    this._initialized = false;
    this._emitter = new EventEmitter();
  }

  connectedCallback() {
    this._initialized = true;
  }

  static get observedAttributes() {
    return ["class"];
  }

  attributeChangeCallback(name, oldValue, newValue) {
    if (!this._initialized) {
      return;
    }

    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  get class() {
    return this.getAttribute("class");
  }

  set class(value) {
    this.setAttribute("class", value);
  }

  /**
   * @param {Meal} value
   */
  set meal(value) {
    this._meal = value;
    this.render();
  }

  get mealId() {
    return this._emitter;
  }

  render() {
    this.innerHTML = `
      <div class="card">
        <div class="card-image">
          <figure class="image is-square">
            <img src="${this._meal.thumbnail}">
          </figure>
        </div>
        <div class="card-content">
          <a class="is-size-6 is-link">${this._meal.name}</a>
        </div>
      </div>
    `;

    const cardButton = this.querySelector(".card .card-content a");
    cardButton.addEventListener("click", (event) => {
      event.preventDefault();

      this._emitter.emit("mealId", this._meal.id);
    });
  }
}

customElements.define("meal-card", MealCard);
