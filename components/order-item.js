class OrderItem extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['order-data'];
    }

    get orderData() {
        return this.getAttribute('order-data');
    }

    set orderData(value) {
        this.setAttribute('order-data', value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Attribute changed: ', name, oldValue, newValue);
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });

        const orderData = JSON.parse(this.getAttribute('order-data'));
        
        shadowRoot.innerHTML = `
            <div class="order-item">
                <h3>Order item</h3>
                <p>This is an order item. Order data is passed from the order-list component as a complex attribute (JSON). It adds an order detail item, where data is provided through slots. It will also add a ul of type wc-ul and directly the associated li of type wc-il, where data is provided as plain text.</p>
                <order-detail>
                    <span name="name">${orderData.name}</span>
                    <span name="address">${orderData.address}</span>
                    <span name="zip">${orderData.zip}</span>
                    <span name="city">${orderData.city}</span>
                    <span name="country">${orderData.country}</span>
                    <span name="status">${orderData.status}</span>
                    <span name="status_id">${orderData.status_id}</span>
                </order-detail>
                <ul is="wc-ul">
                    ${orderData.order_items.map(item => 
                        `<li is="wc-li">${item.product_id}</li><li is="wc-li">${item.amount}</li><li is="wc-li">${item.name}</li>`
                    ).join('')}
                </ul>
            </div>
        `;

        console.log(this.getAttribute('order-data'));
    }

}

export default OrderItem;