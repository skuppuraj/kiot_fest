# Unit 2: Wireframing Guide for KIOT Fest (Lo-Fi to Hi-Fi)

## 1. The Wireframing Fidelity Spectrum

```text
[Low-Fidelity]       ───>       [Mid-Fidelity]       ───>       [High-Fidelity]
(Paper / Pen / Boxes)        (Grayscale Grids / Hierarchy)   (Tailwind Tokens / Colors / Assets)
```

---

## 2. Low-Fidelity Layout (Desktop & Mobile)

### Desktop View Wireframe
```text
+-------------------------------------------------------------------------------+
|  [LOGO: KIOT FEST]     [Home]  [Events]  [Schedule]  [My Tickets]  [Cart (2)] |
+-------------------------------------------------------------------------------+
|                                                                               |
|       ✨ KNOWLEDGE INSTITUTE OF TECHNOLOGY PRESENTS ✨                        |
|       🚀 KIOT FEST 2026: INNOVATION & EXCELLENCE                              |
|       📅 March 25-26, 2026  |  🏆 ₹1,50,000 Total Prize Pool                  |
|                                                                               |
|             [ Explore All Events ]        [ View My Passes ]                  |
|                                                                               |
+-------------------------------------------------------------------------------+
|  [Search: "Hackathon..."]   [All Depts] [CSE] [ECE] [AI&DS] [Mech] [Civil]    |
+-------------------------------------------------------------------------------+
|  +---------------------+  +---------------------+  +---------------------+    |
|  | [POSTER BANNER]     |  | [POSTER BANNER]     |  | [POSTER BANNER]     |    |
|  | [CSE] [Hackathon]   |  | [ECE] [Technical]   |  | [AI&DS] [Workshop]  |    |
|  | Web Hackathon 2026  |  | Circuit Wizard      |  | GenAI Masterclass   |    |
|  | 🏆 ₹15,000 Prize    |  | 🏆 ₹5,000 Prize     |  | 📜 Certificate Only |    |
|  | 🟢 5 Seats Left     |  | 🔴 Sold Out         |  | 🟢 25 Seats Left    |    |
|  | [View Details] [Reg]|  | [View Details] [N/A]|  | [View Details] [Reg]|    |
|  +---------------------+  +---------------------+  +---------------------+    |
+-------------------------------------------------------------------------------+
|  Footer: KIOT Campus, Kakapalayam, Salem | Contact Fest Coordinators          |
+-------------------------------------------------------------------------------+
```

### Mobile View Wireframe (Small Screens)
```text
+------------------------------------+
| [=] [KIOT FEST]           [Cart 2] |
+------------------------------------+
| 🚀 KIOT FEST 2026                  |
| March 25-26 | ₹1.5L Prizes         |
| [ Explore Events ]                 |
+------------------------------------+
| [🔍 Search events...             ] |
| <- [All] [CSE] [ECE] [AI&DS] ->   | (Horizontal scrollable pills)
+------------------------------------+
| +--------------------------------+ |
| | [POSTER BANNER]                | |
| | [CSE] [Hackathon]              | |
| | Web Hackathon 2026             | |
| | 🏆 ₹15,000 | 🟢 5 Seats Left   | |
| | [ Details ]   [ Register (₹200)]| |
| +--------------------------------+ |
| | [Next Event Card...]           | |
+------------------------------------+
| [Sticky Bottom Navigation / Cart]  |
+------------------------------------+
```

---

## 3. High-Fidelity Design Tokens for KIOT Fest

We use Tailwind CSS classes that correspond directly to modern design tokens:

- **Primary Brand Color**: Indigo / Violet (`bg-indigo-600`, `text-indigo-400`, `shadow-indigo-500/20`)
- **Accent Glow / Gold**: Amber / Emerald (`text-amber-400` for prizes, `text-emerald-400` for open seats)
- **Dark Surface Palette**: Slate 900 (`bg-slate-900` body, `bg-slate-800/80` cards with `border-slate-700/50`)
- **Border Radius**: `rounded-2xl` for cards, `rounded-full` for badges/pills.
- **Glassmorphism**: `backdrop-blur-md bg-slate-900/70 border border-slate-700/40`.

---

## 4. Complete High-Fidelity Vector Artboards (Branch 18 Mirror)

To see and edit the complete, high-fidelity production screens directly in Figma:
- **[Complete Figma App Blueprint & Import Guide](./figma_complete_app_blueprint.md)**
- **[Vector Artboards Directory (`.svg`)](./artboards/)**: 8 ready-to-import vector artboards (Desktop, Mobile, Detail, Modal, Cart Drawer, Ticket Pass, Admin, Design System).
