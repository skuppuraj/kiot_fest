# ⚡ Unit 0 - Pre-School 03: Why Vanilla JavaScript?
> **KIOT FEST 2026 Fullstack Web Development Workshop**  
> *Target Audience: Engineering Students understanding DOM events, in-memory state, and the pain of imperative DOM updates.*

---

## 🎯 The Core Question
> **"We have HTML for structure and CSS for presentation. Why do we need Vanilla JavaScript, and what happens when an app gets complex?"**

In `preschool-02-why-css`, our portal looked beautiful, but it hit the **"Static Wall"**: clicking buttons did nothing, and the cart counter remained frozen.

**JavaScript (Native / Vanilla JS)** is the programming language of the web. It operates directly inside the browser to provide:
1. **Event Listeners**: Listening for user clicks, keypresses, and form submissions (`addEventListener`).
2. **In-Memory State**: Holding variables in memory (`selectedEventIds = new Set()`, `totalAmount = 300`).
3. **DOM Tree Mutation**: Reading and updating HTML elements in real-time (`document.getElementById('cart-count').textContent = 2`).

---

## 🌳 How Native JS Works: The DOM Tree
When the browser loads `raw_html_demo.html`, it builds an in-memory object hierarchy called the **Document Object Model (DOM)**:

```text
               window
                 │
              document
                 │
               <html>
              /      \
          <head>    <body>
                     /   \
               <header>  <main>
                  │         │
             #cart-count   article -> button
```

Using Native JS (`script.js`), we read the event metadata from HTML5 `data-*` attributes (`data-fee`, `data-id`) and attach click event listeners:
```javascript
// Reading data attributes from HTML (<article data-id="1" data-fee="200">)
const fee = parseInt(article.dataset.fee, 10);
const eventId = parseInt(article.dataset.id, 10);

btn.addEventListener('click', () => {
  selectedEventIds.add(eventId);
  totalAmount += fee;

  // Manually update the DOM nodes:
  document.getElementById('cart-count').textContent = selectedEventIds.size;
  document.getElementById('cart-total').textContent = '₹' + totalAmount;
  btn.textContent = 'Selected ✓';
  btn.classList.add('selected');
});
```

---

## 💥 The Difficulty Faced in Vanilla JS: The "DOM Hell & State Desync" Crisis

For 3 event cards, writing manual DOM queries works. But what happens in a real college fest app with 20 events, a cart modal, a mobile navigation drawer, and discount banners?

### 1. Imperative Spaghetti Code
When a student clicks "Register", you must manually write code to find and update **6 different DOM elements**:
1. Update `#cart-count` in header.
2. Update `#cart-count-mobile` in mobile drawer.
3. Update `#cart-total` in floating summary bar.
4. Update button text to "Selected ✓".
5. Add `selected` CSS class to button.
6. Append a new `<li>` to `#cart-drawer-list`.

### 2. State Desynchronization
What happens when a student removes an event? You must manually find and reverse **all 6 DOM mutations**.
If you forget even **ONE line** (e.g. you remove the item from memory but forget `document.getElementById('cart-count-mobile').textContent = ...`):
```text
In-Memory State:  cart = 1 item
Header Badge:     1 item
Mobile Drawer:    2 items (OUT OF SYNC!)
Button Color:     Still green (OUT OF SYNC!)
```
The visual UI is now lying to the user because in Vanilla JS, **the DOM does not automatically update when your data changes!**

### 3. Monolithic HTML Duplication
To add a 4th event in Vanilla JS, you must copy-paste 30 lines of HTML in `raw_html_demo.html` and write new query selectors. There are no reusable components!

> 💡 **The Next Evolution**: How do modern software engineers solve manual DOM spaghetti and state desync?  
> 👉 **Switch to branch:** `git checkout preschool-04-why-reactjs`
