export class ErrorMessage extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <h1 class="title">Something went wrong! Please try again later.</h1>
    `;
  }
}

customElements.define("error-message", ErrorMessage);
