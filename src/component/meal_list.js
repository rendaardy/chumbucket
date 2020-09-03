import { Meal } from "../model/meal.js";
import "./meal_card.js";

export class MealList extends HTMLElement {
  constructor() {
    super();

    this.__initialized = false;
  }

  connectedCallback() {
    this.__initialized = true;
  }

  /**
   * @param {Meal[]} value
   */
  set meals(value) {
    this._meals = value;
    this.render();
  }

  static get observedAttributes() {
    return ["class"];
  }

  attributeChangeCallback(name, oldValue, newValue) {
    if (!this.__initialized) {
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

  clearList() {
    const mealCards = this.querySelectorAll("meal-card");
    if (mealCards.length > 0) {
      mealCards.forEach((card) => {
        this.removeChild(card);
      });
    }
  }

  set mealId(fn) {
    this._fn = fn;
    this.render();
  }

  render() {
    if (this._meals) {
      this._meals.forEach((meal) => {
        const mealCardElement = document.createElement("meal-card");
        mealCardElement.setAttribute(
          "class",
          "column is-12-tablet is-6-desktop is-3-widescreen"
        );
        mealCardElement.meal = meal;
        this.appendChild(mealCardElement);

        mealCardElement.mealId.on("mealId", this._fn);
      });
    }
  }
}

customElements.define("meal-list", MealList);
