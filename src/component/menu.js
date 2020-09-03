import { EventEmitter } from "events";

export class Menu extends HTMLElement {
  constructor() {
    super();

    this._emitter = new EventEmitter();
  }

  connectedCallback() {
    this.render();
  }

  get mealCategory() {
    return this._emitter;
  }

  render() {
    this.innerHTML = `
      <div class="dropdown is-hoverable is-hidden-tablet">
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>Category</span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
              <a class="dropdown-item">Starter</a>
              <a class="dropdown-item">Beef</a>
              <a class="dropdown-item">Chicken</a>
              <a class="dropdown-item">Dessert</a>
              <a class="dropdown-item">Lamb</a>
              <a class="dropdown-item">Pasta</a>
              <a class="dropdown-item">Pork</a>
              <a class="dropdown-item">Seafood</a>
              <a class="dropdown-item">Side</a>
              <a class="dropdown-item">Vegan</a>
              <a class="dropdown-item">Vegetarian</a>
              <a class="dropdown-item">Breakfast</a>
              <a class="dropdown-item">Goat</a>
              <a class="dropdown-item">Miscellaneous</a>
          </div>
        </div>
      </div>
      <nav class="menu is-hidden-mobile">
        <p class="menu-label">Category</p>
        <ul class="menu-list">
          <li>
            <a class="is-link">Starter</a>
          </li>
          <li>
            <a class="is-link">Beef</a>
          </li>
          <li>
            <a class="is-link">Chicken</a>
          </li>
          <li>
            <a class="is-link">Dessert</a>
          </li>
          <li>
            <a class="is-link">Lamb</a>
          </li>
          <li>
            <a class="is-link">Pasta</a>
          </li>
          <li>
            <a class="is-link">Pork</a>
          </li>
          <li>
            <a class="is-link">Seafood</a>
          </li>
          <li>
            <a class="is-link">Side</a>
          </li>
          <li>
            <a class="is-link">Vegan</a>
          </li>
          <li>
            <a class="is-link">Vegetarian</a>
          </li>
          <li>
            <a class="is-link">Breakfast</a>
          </li>
          <li>
            <a class="is-link">Goat</a>
          </li>
          <li>
            <a class="is-link">Miscellaneous</a>
          </li>
        </ul>
      </nav>
    `;

    const dropdownItems = this.querySelectorAll(
      ".dropdown-content .dropdown-item"
    );

    dropdownItems.forEach((dropdownItem) => {
      dropdownItem.addEventListener("click", (event) => {
        event.preventDefault();

        const selectedItems = this.querySelectorAll(
          ".dropdown-content .dropdown-item.is-active"
        );
        if (selectedItems.length > 0) {
          selectedItems[0].classList.remove("is-active");
        }

        event.target.classList.add("is-active");
        this._emitter.emit("meal", event.target.textContent);
      });
    });

    const menuList = this.querySelector(".menu .menu-list");
    const buttons = menuList.querySelectorAll(".menu-list a.is-link");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();

        const selectedButtons = this.querySelectorAll(
          ".menu-list a.is-link.is-active"
        );

        if (selectedButtons.length > 0) {
          selectedButtons[0].classList.remove("is-active");
        }

        event.target.classList.add("is-active");
        this._emitter.emit("meal", event.target.textContent);
      });
    });
  }
}

customElements.define("app-menu", Menu);
