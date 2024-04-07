class OrderList extends HTMLElement {
  constructor() {
    super();
  }

  async addOrderItems() {
    let order;
    order = await fetch("/order_data.json");
    order = await order.json();

    console.log(order.data);

    let items = order.data.map(element => {
      return `<order-item order-data='${JSON.stringify(element)}'></order-item>`;
    })

    return items.join('');
  }

  async connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.innerHTML = `
      <div class="order-list">
       <p>This is the order list</p>
      </div>
    `;

    shadowRoot.innerHTML += await this.addOrderItems();
  }


}

export default OrderList;