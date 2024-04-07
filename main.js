import WcHeader from "./components/wc-header.js";
import WcMain from "./components/wc-main.js";
import OrderList from "./components/order-list.js";
import OrderItem from "./components/order-item.js";

customElements.define("wc-header", WcHeader, { extends: "header" });
customElements.define("wc-main", WcMain, { extends: "main" });
customElements.define("order-list", OrderList);
customElements.define("order-item", OrderItem);