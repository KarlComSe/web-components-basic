# WECOMPONENTS

The aim of this project is to enhance my understanding of web components, by implemeting a web page using web components.

## Description

Simple page with a header, footer and a main content area. The main area will contain nested components with complex attributes, specifically JSON.

The page will display a list of orders with details and order lines.

## What I aim to do

- Use standard HTML elements with is="wc-*" syntax.
- Create custom web componentst elements with complex attributes.
- Apply best practice and use common patterns:
  - Shadow DOM, constructor, connectedCallback, disconnectedCallback (not used), attributeChangedCallback, observedAttributes.
- Use slots to pass content to the custom elements.
- Use template to create the shadow DOM. (Not implemented)

## Files

- main.js
- index.html
- style.css
- components/
  - wc-header.js : non custom element, is="wc-header"
  - wc-footer.js : non custom element, is="wc-footer"
  - main.js : non custom element, is="wc-main"
  - order-list.js : custom element, order-list
  - order-detail.js : custom element, order-detail
  - order-item.js : custom element, order-item
  - wc-ul.js : non custom element, is="wc-ul" / order-line-list.js : custom element, order-line-list
  - wc-li.js : non custom element, is="wc-li" / order-line.js : custom element, order-line

order_data.json : Example data fetched and created from <https://lager.emilfolino.se/v2>. This example will use static data.

## HTML outline

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Components</title>
</head>
<body>
    <header is="wc-header"></header>
    <main is="wc-main">
        <order-list>
            <order-item>
                <order-line-list> <!-- or <ul is="wc-ul"> -->
                    <order-line> <!-- or <li is="wc-li"> -->
                    </order-line>
                    <order-line>
                    </order-line>
                </order-line-list>
            </order-item>
            <order-item>
                <order-line-list>
                    <order-line>
                    </order-line>
                </order-line-list>
            </order-item>
        </order-list>
    </main>
    <footer is="wc-footer"></footer>
    <script src="main.js"></script>
</body>
</html>
```

## JSON data structure

See order_data.json.

## Reflections

### Pitfall: creating custom elements for everything

It is easy to imagine a complex structure, and that each element needs to be its own web component. The above structure is such an example. It would be far easier to just make an order item, which by itself defines what to show. Make the component do most of the work. There could be one or two "sub" web components, defining e.g. basic customer info and order line item, if there could be reuse.

### Pitfall: overwriting nested elements

Consider the following example:

```html
    <main is="wc-main">
        <span slot="title">Order List</span>
        <order-list>
            <p>test</p>
        </order-list>
    </main>
```

If the main element has a shadow DOM, where the .innerHTML property is used to set the content, the order-list element might be overwritten. This is because the .innerHTML property might replace the content of the element. To avoid this, it is possible to add <slot> in the shadow DOM. Below code sustain the order-list element in the shadow DOM.

```javascript
class WcMain extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow root to the element.
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
            <h2>
                <slot name="title">Default text which should be replaced</slot>
            </h2>
            <p>This is the main-element which is specified with is = "wc-main".</p>
            <p>This utilize the shadow DOM, as it is required for slots to work.</p>
            <p>This utilizes slots, to replace the title.</p>
            <slot></slot>
        `;
  }
}
```

### How to handle complex attributes?

There seems to be several ways to pass data.

Read: https://stackoverflow.com/a/50416836

This is how I did it: 

```javascript
// Example of a complex attribute
const complexAttribute = {
  key1: 'value1',
  key2: 'value2'
};

// Serialize the complex attribute
this.setAttribute('complex-attribute', JSON.stringify(complexAttribute));

// Deserialize the complex attribute. This is done in the connectedCallback method of the custom element to which the attribute is assigned.
const complexAttribute = JSON.parse(this.getAttribute('complex-attribute'));
```

### Naming conventions?

The basic naming convention is that there needs to be a dash as no standard HTML elements have such. However, quesiton that remains:

- Plural or singular? Should plural be avoided?
- Naming of standard elements? Should they be named wc-div, wc-span, wc-p, etc.?

### Why not just use standard HTML?

Good question. It make sense to use standard HTML elements whenever possible. As stated in the pitfall section, it is easy to overdo it with custom elements. Another reason to just standard elements or to extend standard elements is that all behaviors of standard elements are not implemented in custom elements (see the WHATWG resource). 

## Possible next step

- Simplify the structure.
- Implement a router to handle different views.
- Implement event listeners and custom events.
- Implement the API.

## Resources on web components

- [MDN Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- On styling: https://javascript.info/shadow-dom-style
- Web Hypertext Application Technology Working Group (WHATWG), Living Standard on Custom Elements: https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements
- To be reviewed: <https://learning.oreilly.com/course/learn-practical-web/9781838649173/>

## Web Components generic code

### Register an element

The custom elements must be registered before they can be used in the HTML. The customElements.define() is the same as Window.customElements.define(), and the Window object can be seen as the representation of the browser window.

```javascript
import { MyElement } from './my-element.js';
customElements.define('my-element', MyElement);

// or

customElements.define('my-element', MyElement, { extends: 'div' });

```

### Create a custom element

Placing logic within the connectedCallback() method ensures that the code is executed when the element is connected to the DOM. Thus, it is a good place to add the shadow DOM and any other logic that should be executed when the element is connected. "The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor." (MDN 1)

```javascript

class MyElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Attach a shadow root to the element.
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        /* CSS rules for the element */
      </style>
      <!-- Shadow DOM for the element -->
      <p>This is a custom element!</p>
    `;
  }
}

```

MDN 1 : <https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks>

### Attributes: AttributeChangedCallback, observedAttributes, setAttribute & getAttribute

The **observedAttributes()** method is used to define which attributes the custom element should observe. When an observed attribute is changed, the **attributeChangedCallback()** method is called.

```javascript

class MyElement extends HTMLElement {
  static get observedAttributes() {
    return ['my-attribute'];
  } // same as static observedAttributes = ['my-attribute'];

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Attribute changed: ', name, oldValue, newValue);
  }
}

```

Implementation in the HTML-element itself:

```html
<my-element my-attribute="value"></my-element>
```

The setAttribute and getAttribute methods can be used to set and get attributes. However, many developers prefer to use properties instead of attributes. The set method can be used to implement logic when the attribute is set, and a common practice is to use toLowerCase() / toUpperCase() when setting the attribute.

```javascript

class MyElement extends HTMLElement {
  constructor() {
    super();
    this.myAttribute = 'value';
  }

  static get observedAttributes() {
    return ['my-attribute'];
  } // same as static observedAttributes = ['my-attribute'];

  get myAttribute() {
    return this.getAttribute('my-attribute');
  }

  set myAttribute(value) {
      this.setAttribute('my-attribute', value);
  }


}

```

### Putting the code all together

```javascript

class MyElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        /* CSS rules for the element */
      </style>
      <!-- Shadow DOM for the element -->
      <p>This is a custom element!</p>
    `;
  }

  static get observedAttributes() {
    return ['my-attribute'];
  } // same as static observedAttributes = ['my-attribute'];

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Attribute changed: ', name, oldValue, newValue);
  }

  get myAttribute() {
    return this.getAttribute('my-attribute');
  }

  set myAttribute(value) {
      this.setAttribute('my-attribute', value);
  }

}

// Register the element
customElements.define('my-element', MyElement);

```
