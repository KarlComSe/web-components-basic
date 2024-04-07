class WcMain extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
            <h2>
                <slot name="title">Default text which should be replaced</slot>
            </h2>
            <p>This is the main-element which is specified with is = "wc-main".</p>
            <p>This utilize the shadow DOM, as it is required for slots to work.</p>
            <p>This utilizes slots, to replace the title.</p>
            <slot></slot>
        `;
  }
}

export default WcMain;