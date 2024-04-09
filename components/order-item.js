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
        <style>
            .order-item {
                border: 5px solid blue;
                padding: 10px;
            }
            .order-lines {
                border: 5px dotted blue;
                padding: 10px;
            }
            :host {
                background-color: beige; 
                padding: 10px;
                display: block;
            }
            :host::before {
                padding: 20px;
                content: " (Aesthetically pleasing and subtle styling applied with host:before 
                    within the order item custom element.)";
                color: black;
                display: block;
                background-color: yellow;
                text-align: center;
            }
        </style>    
            <div class="order-item">
    <h3>Order item</h3>
    <p>This is an order item. Order data is passed from the order-list component as a
        complex attribute (JSON). It adds an order detail item, where data is provided through
        slots. It will also add a ul of type wc-ul and directly the associated li of type wc-il,
        where data is provided as plain text.</p>
    <p>Additional styling is applied through the :host selector, which is a pseudo selector for
        the custom element itself. There are some points which are easy to get wrong here, e.g., the
        custom element itself is without dimensions, meaning that a background-color will not be
        visible unless there is some dimension attribute (such as padding) or display:block. 
        However, text styling is applied without specifying any dimensions. </p>
    <p>Styling is also applied through :host::before.</p>
    <order-detail>
        <span slot="name">${orderData.name}</span>
        <span slot="address">${orderData.address}</span>
        <span slot="zip">${orderData.zip}</span>
        <span slot="city">${orderData.city}</span>
        <span slot="country">${orderData.country}</span>
        <span slot="status">${orderData.status}</span>
        <span slot="status_id">${orderData.status_id}</span>
    </order-detail>
    <div class="order-lines">
    <p>This data is fully defined within the order-item component. Some components are specified 
    as is="wc-ul" and is="wc-li", but these components are not implemented. Thus, the styling is
        done in order-item web component.</p>
    <ul is="wc-ul">
                    ${orderData.order_items.map(item =>
        `<li>Order line:</li><ul><li is="wc-li">${item.product_id}</li><li is="wc-li">
        ${item.amount}</li>
    <li is="wc-li">${item.name}</li></ul>`
    ).join('')}
                </ul>
                </div>
            </div>
        `;

        console.log(this.getAttribute('order-data'));
    }
}

export default OrderItem;
