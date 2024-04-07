# WECOMPONENTS

The aim of this project is to enhance my understanding of web components, by implementing a single page application (SPA), using web components.

## Description
Simple page with a header, footer and a main content area. The main area will contain nested components with complex attributes, specifically JSON. 

The page will display a list of orders with details and order lines.

## Requirements

- Use standard HTML elements with is="wc-*" syntax.
- Create custom web componentst elements with and without complex attributes.
- Apply best practice and use common patterns:
  - Shadow DOM, constructor, connectedCallback, disconnectedCallback, attributeChangedCallback, observedAttributes, custom events, etc.

## Files 

main.js
index.html
style.css
components/
    - wc-header.js : non custom element, is="wc-header"
    - wc-footer.js : non custom element, is="wc-footer"
    - main.js : non custom element, is="wc-main"
    - order-list.js : custom element, order-list
    - order-detail.js : custom element, order-detail
    - order-item.js : custom element, order-item
    - wc-ul.js : non custom element, is="wc-ul" / order-line-list.js : custom element, order-line-list
    - wc-li.js : non custom element, is="wc-li" / order-line.js : custom element, order-line
order_data.json : Example data fetched and created from https://lager.emilfolino.se/v2. This example will use static data.

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

### When to use custom elements and when to use standard elements with is="wc-*" syntax?

### How to handle complex attributes?

### How to handle nested components?

### Naming conventions?

## Next step

- Implement a router to handle different views.
- Implement event listeners and custom events.
- Implement the API.

## Resources on web components

- [MDN Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)