class OrderList extends HTMLElement {
    constructor() {
        super();
    }

    async addOrderItems() {
        let order;

        order = await fetch("./order_data.json");
        order = await order.json();

        console.log(order.data);

        let items = order.data.map(element => {
            return `<order-item order-data='${JSON.stringify(element)}'></order-item>`;
        });

        return items.join('');
    }

    async connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });

        const orderItems = await this.addOrderItems();

        shadowRoot.innerHTML = `

      <style>
      .order-list {
        border: 5px solid green;
        padding: 10px;}
        
      </style>
      <div class="order-list">
       <p>This is the order list</p>
       <p>This component fetch some JSON data and pass it to the order-item component,
        which are also added here.</p>
        ${orderItems}
      </div>
    `;
    }
}

export default OrderList;
