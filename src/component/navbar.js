import { EventEmitter } from "events";

export class Navbar extends HTMLElement {
  constructor() {
    super();

    this._emitter = new EventEmitter();
  }

  connectedCallback() {
    this.render();
  }

  get searchMeal() {
    return this._emitter;
  }

  render() {
    this.innerHTML = `
      <nav class="navbar has-shadow is-primary">
        <div class="navbar-brand">
          <a class="navbar-item is-size-5">
            Chumbucket
          </a>

          <div class="navbar-item is-hidden-tablet">
            <form id="search-input" class="form">
              <div class="field has-addons has-text-grey">
                <div class="control">
                  <input class="input is-small is-rounded" type="search" name="search" placeholder="Find your meal">
                </div>
                <div class="control">
                  <button type="submit" class="button is-link is-small is-rounded">Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <form id="search-input" class="form">
                <div class="field has-addons has-text-grey">
                  <div class="control">
                    <input class="input is-small is-rounded" type="search" name="search" placeholder="Find your meal">
                  </div>
                  <div class="control">
                    <button type="submit" class="button is-link is-small is-rounded">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>
    `;

    const searchInputs = this.querySelectorAll("#search-input");
    searchInputs.forEach((searchInput) => {
      searchInput.addEventListener("submit", (event) => {
        event.preventDefault();
        this._emitter.emit("searchValue", event.target.search.value);
      });
    });
  }
}

customElements.define("app-navbar", Navbar);
