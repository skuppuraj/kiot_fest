# 🦴 Unit 0 - Pre-School 01: Why HTML?
> **KIOT FEST 2026 Fullstack Web Development Workshop**  
> *Target Audience: Engineering Students beginning their Web Development journey.*

---

## 🎯 The Core Question
> **"Why can't we just send plain text over the internet? Why do we need HTML?"**

Imagine you want to announce **KIOT Fest 2026** to 5,000 college students. If you write:
```text
KIOT FEST 2026
Department of Computer Science
Web Hackathon 2026 Register for Rs 200 Prize Rs 15000
Circuit Debugging Master Register for Rs 100 Prize Rs 8000
Fill in your Roll Number and Email to Register
```

To a human reading this, you might guess what the title is and what the button should be.
**To a web browser (Chrome, Safari, Firefox), this is just an undifferentiated blob of characters.**
- The browser doesn't know what is a heading and what is body text.
- Screen readers for visually impaired students can't announce sections or links.
- Googlebot and search engines cannot index event names or registration dates.
- There is no way to click to submit data or trigger actions.

---

## 🏗️ What HTML Actually Is
**HTML (HyperText Markup Language)** is **NOT** a programming language.
- It has no variables, no loops, no `if/else` logic, and no math calculations.
- It is a **Markup Language**: a standardized syntax of opening and closing **tags** (`<tag>` and `</tag>`) that annotate content with **semantic meaning** and **document hierarchy**.

### Anatomy of an HTML Element
```html
<button type="submit" class="primary-btn">Register for Fest</button>
│      │             │                   │                  │
└─Tag──┴──Attribute──┴──Attribute Value──┴─────Content──────┴──Closing Tag
```

---

## 🏷️ Why Semantics Matter: The `<div id="btn">` Trap
Many beginners write everything using `<div>` and `<span>`:

```html
<!-- ❌ BAD PRACTICE: Non-semantic "Div Soup" -->
<div class="header">
  <div class="big-text">KIOT FEST 2026</div>
  <div class="nav-item" onclick="goHome()">Home</div>
</div>
<div class="fake-button" onclick="submitForm()">Register</div>
```

```html
<!-- ✅ GOOD PRACTICE: Semantic HTML5 -->
<header>
  <h1>KIOT FEST 2026</h1>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
<main>
  <button type="button">Register</button>
</main>
```

### Why Semantic Tags Win:
1. **Keyboard Accessibility**: Real `<button>` elements are natively focusable via the `Tab` key and activate with `Enter` and `Space`. A `<div onclick="...">` is completely inaccessible to keyboard-only users!
2. **SEO (Search Engine Optimization)**: Google indexes `<h1>`, `<h2>`, and `<article>` tags to determine page relevance.
3. **Screen Readers**: Assistive technologies announce `<nav>` as "navigation landmark" and `<button>` as "clickable button", enabling visually impaired students to navigate.

---

## 📋 Key Semantic Elements in the KIOT Fest Skeleton

| Tag | Purpose in KIOT Fest |
| :--- | :--- |
| `<header>` | Symposium banner, college logo, and top navigation bar. |
| `<nav>` | Department links (CSE, ECE, AI&DS, MECH). |
| `<main>` | The primary content area containing fest events. |
| `<section>` | Grouping related content (e.g., "Technical Events" vs "Non-Technical Events"). |
| `<article>` | Self-contained event card (e.g., "Web Hackathon" with its own title, date, and fee). |
| `<table>` | Workshop schedules, round timings, and prize breakdown. |
| `<form>` | Registration form capturing student name, college, email, and roll number. |
| `<input>` | Specific data inputs (`type="text"`, `type="email"`, `type="number"`). |
| `<button>` | Triggering actions (Cart addition, pass printing). |
| `<footer>` | Contact info, KIOT CSE department address, and copyright. |

---

## 🔴 The Fundamental Limitation of HTML
Check out the code in branch `preschool-01-why-html` and run `npm run dev`:
1. **It looks like 1991**: Black serif text (Times New Roman), purple/blue hyperlinks, unstyled gray buttons.
2. **Zero Layout Control**: Elements simply stack on top of each other from top to bottom (the default document flow).
3. **Not Responsive**: Looks broken and unformatted on mobile phones and tablets.

> 💡 **The Next Evolution**: How do we give this raw skeleton beautiful typography, dark mode palettes, flexbox cards, and responsive layouts?  
> 👉 **Switch to branch:** `git checkout preschool-02-why-css`
