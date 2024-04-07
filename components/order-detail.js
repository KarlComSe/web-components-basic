class OrderDetail extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });

        shadowRoot.innerHTML = `
            <div class="order-detail">
                <h3>Order detail</h3>
                <p>This is an order detail item. Data is provided through slots.</p>
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