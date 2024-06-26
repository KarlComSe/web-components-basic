
class WcHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
            .header {
                border: 5px solid red;
                padding: 10px;
            }
            </style>
            <div class="header">
                <h1>Orders</h1>
                <p>Example page for web components, this is the header-element which is
                 specified with is = "wc-header".</p>
                <p>This doesn't utilize the shadow DOM.</p>
            </div>
        `;
    }
}

export default WcHeader;
