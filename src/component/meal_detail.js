import { Meal } from "../model/meal.js";

export class MealDetail extends HTMLElement {
  /**
   * @param {Meal} value
   */
  set meal(value) {
    this._meal = value;
    this.render();
  }

  set goBackEvent(event) {
    this._goBackEvent = event;
    this.render();
  }

  render() {
    if (this._meal) {
      this.innerHTML = `
        <style>
          .has-bg-img {
            background: url(${this._meal.thumbnail}) center center;
            background-size: cover;
            background-color: rgba(0, 0, 0, 0.25);
            background-blend-mode: multiply;
          }
        </style>
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a>${this._meal.category}</a></li>
            <li class="is-active">
              <a aria-current="page">${this._meal.name}</a>
            </li>
          </ul>
        </nav>
        <section class="hero is-medium has-bg-img">
          <div class="hero-body">
            <div class="container">
              <h1 class="title has-text-light">
                ${this._meal.name}
              </h1>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="columns is-multiline">
            <div class="column">
              <p class="title">Ingredients</p>
              <div class="columns" style="display:flex;">
                <div class="column is-half-mobile">
                  <div class="container">
                    <ol type="1">
                      ${this._meal.ingredients
                        .map((ingredient) => `<li>${ingredient}</li>`)
                        .join("\n")}
                    </ol>
                  </div>
                </div>
                <div class="column is-half-mobile">
                  <div class="container">
                    <ul>
                      ${this._meal.measures
                        .map((measure) => `<li>${measure}</li>`)
                        .join("\n")}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="columns is-multiline">
                <div class="column">        
                  <p class="title">Instructions</p>
                  <p>${this._meal.instructions}</p>
                </div>
                <div class="column">
                  <figure class="image is-16by9">
                    <iframe class="has-ratio" width="640" height="360"
                    src="https://www.youtube.com/embed/${
                      this._meal.youtubeId
                    }?showinfo=0" frameborder="0" allowfullscreen>
                    </iframe>
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <!--<div class="tile is-ancestor">
            <div class="tile is-parent is-4">
              <div class="tile is-child box">                
              </div>
            </div>
            <div class="tile is-vertical is-parent is-8">
              <div class="tile is-child box">
              </div>
              <div class="tile is-child box">                
              </div>
            </div>
          </div>-->
        </section>
      `;

      const breadcrumb = this.querySelector(".breadcrumb li > a");
      breadcrumb.addEventListener("click", this._goBackEvent);
    }
  }
}

customElements.define("meal-detail", MealDetail);
