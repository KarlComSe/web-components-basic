class OrderDetail extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });

        shadowRoot.innerHTML = `
            <style>
                .order-detail {
                    border: 5px solid maroon;
                    padding: 10px;
                    color: var(--custom-dom-penetrating-color);
                }
                .black {
                    color: black;
                }
                .magneta {
                    color: var(--custom-dom-penetrating-color);
                }
            </style>
            <div class="order-detail">
                <h3>Order detail</h3>
                <p>This is an order detail item. Data is provided through slots.</p>
                <p class="black">Styling, i.e. the <span class="magneta">fancy color</span>
                , is done through DOM penetrating CSS variables, which is defined in style.css file 
                (--custom-dom-penetrating-color: magenta;), and then applied within this component 
                through color:var(--custom-dom-penetrating-color).</p>
                <ul>
                    <li><slot name="name"></slot></li>
                    <li><slot name="address"></slot></li>
                    <li><slot name="zip"></slot></li>
                    <li><slot name="city"></slot></li>
                    <li><slot name="country"></slot></li>
                    <li><slot name="status"></slot></li>
                    <li><slot name="status_id"></slot></li>
                </ul>
            </div>
        `;
    }
}

export {OrderDetail};
