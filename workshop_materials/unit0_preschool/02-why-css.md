# 🎨 Unit 0 - Pre-School 02: Why CSS Comes Into Play
> **KIOT FEST 2026 Fullstack Web Development Workshop**  
> *Target Audience: Engineering Students understanding the presentation layer, layout engines, and Separation of Concerns.*

---

## 🎯 The Core Question
> **"We already have `raw_html_demo.html`. Why can't we stop there? Why does CSS come into play?"**

In `preschool-01-why-html`, we built the complete semantic skeleton of KIOT Fest 2026. While accessible and well-structured, it looks like a black-and-white research paper from 1991. The user-agent default styles (Times New Roman font, default margins, raw vertical stacking) make it impossible to create a compelling brand identity for a national technical symposium.

**CSS (Cascading Style Sheets)** is the presentation layer that comes into play to solve this:
1. **Visual Hierarchy & Typography**: Modern system sans-serif fonts, line heights, font weights, and contrast.
2. **Layout Engines (Flexbox & Grid)**: Converting stacked vertical text into responsive 3-column card grids and horizontal navigation bars.
3. **The Principle of Separation of Concerns**: We **do not change a single HTML tag** from Step 1! We simply attach `style.css`, and CSS transforms the presentation.

---

## 📦 The CSS Box Model
Every single HTML tag (`<header>`, `<article>`, `<button>`) is treated by the browser as a box:

```text
┌───────────────────────────────────────────────┐
│                    MARGIN                     │
│   ┌───────────────────────────────────────┐   │
│   │                BORDER                 │   │
│   │   ┌───────────────────────────────┐   │   │
│   │   │            PADDING            │   │   │
│   │   │   ┌───────────────────────┐   │   │   │
│   │   │   │        CONTENT        │   │   │   │
│   │   │   └───────────────────────┘   │   │   │
│   │   └───────────────────────────────┘   │   │
│   └───────────────────────────────────────┘   │
└───────────────────────────────────────────────┘
```

- **Content**: The text ("Web Hackathon 2026") or inner element.
- **Padding**: Breathing room between the text and the card border.
- **Border**: The frame around the element (`1px solid #334155`).
- **Margin**: Separation between adjacent cards or sections.

---

## 📐 Layout Engines: Flexbox vs CSS Grid

In `style.css`, we use both modern layout engines:

### 1. Flexbox (One-Dimensional Alignment)
Used for the `<nav>` bar and card action rows where items align along a single axis (row or column):
```css
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
```

### 2. CSS Grid (Two-Dimensional Card Grids)
Used for `#events` where cards must wrap into clean rows and columns:
```css
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
```

---

## 🛑 The "Static Wall" Limitation of CSS
Open `index.html` (or run `npm run dev`) on branch `preschool-02-why-css`:
1. The portal now looks professional, modern, and dark-themed.
2. **Now try to interact with it:**
   - Click "Select Event for Registration" $\to$ **Nothing happens**.
   - The cart count stays at `0`.
   - The total price stays at `₹0`.
   - The button does not change to "Selected ✓".
   - Submitting the form reloads the whole browser window and wipes out typed input!

> ⚠️ **The Critical Lesson**: CSS is 100% visual presentation. It has no brain, cannot store in-memory state, cannot calculate numbers, and cannot respond dynamically to user clicks.  
> 💡 **The Next Evolution**: How do we breathe life and logic into this styled page?  
> 👉 **Switch to branch:** `git checkout preschool-03-why-vanilla-js`
