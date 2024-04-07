import WcHeader from "./components/wc-header.js";
import WcMain from "./components/wc-main.js";
import OrderList from "./components/order-list.js";

customElements.define("wc-header", WcHeader, { extends: "header" });
customElements.define("wc-main", WcMain, { extends: "main" });
customElements.define("order-list", OrderList);