import WcHeader from "./components/wc-header.js";
import WcMain from "./components/wc-main.js";

customElements.define("wc-header", WcHeader, { extends: "header" });
customElements.define("wc-main", WcMain, { extends: "main" });