import "./meal_list.js";

export class Content extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  removeElement(child) {
    if (this.contains(child)) {
      this.removeChild(child);
    }
  }

  clearMealList() {
    const mealList = this.querySelector("meal-list");
    if (this.contains(mealList)) {
      mealList.clearList();
    }
  }

  render() {
    this.innerHTML = `
      <div class="level">
        <div class="level-left">
          <h1 class="subtitle is-3">
            <span class="has-text-grey-light">Chum is</span> <strong>Fum!</strong>
          </h1>
        </div>
      </div>
    `;
  }
}

customElements.define("app-content", Content);
