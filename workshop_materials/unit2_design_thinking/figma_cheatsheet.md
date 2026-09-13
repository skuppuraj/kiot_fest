# Unit 2: Figma Prototyping Cheatsheet for Students

## 1. Essential Figma Keyboard Shortcuts

| Action | macOS Shortcut | Windows Shortcut | Purpose in KIOT Fest Design |
| :--- | :--- | :--- | :--- |
| **Frame Tool** | `F` or `A` | `F` or `A` | Create iPhone / Desktop screen canvas |
| **Auto Layout** | `Shift + A` | `Shift + A` | **The #1 tool**: Creates responsive flexbox-like containers for event lists and button groups |
| **Create Component** | `Cmd + Option + K` | `Ctrl + Alt + K` | Convert an Event Card into a reusable master component |
| **Create Component Variant** | Properties Panel $\to$ `+ Variant` | Properties Panel $\to$ `+ Variant` | Create "Default", "Hover", and "Sold Out" card states |
| **Duplicate Object** | `Cmd + D` or `Option + Drag` | `Ctrl + D` or `Alt + Drag` | Duplicate event cards across the grid |
| **Group / Ungroup** | `Cmd + G` / `Cmd + Shift + G` | `Ctrl + G` / `Ctrl + Shift + G` | Group elements together |
| **Inspect / Copy Code** | Dev Mode (`Shift + D`) | Dev Mode (`Shift + D`) | Inspect CSS properties, margins, and colors |

---

## 2. Step-by-Step Exercise: Building the KIOT Fest Event Card in Figma

1. **Draw a Frame**: Press `F` $\to$ Set size to $360\text{px} \times 440\text{px}$, corner radius $16\text{px}$, fill `#1e293b` (Slate 800).
2. **Add Event Banner Image**: Place a rectangle at top ($360\text{px} \times 180\text{px}$), fill with dark gradient/image.
3. **Add Badges**:
   - Create text `"CSE"`, wrap in Auto Layout (`Shift + A`), padding $4\text{px}$ / $12\text{px}$, background `#3730a3` (Indigo), radius $9999\text{px}$.
4. **Add Event Typography**:
   - Title: Inter Bold $20\text{px}$, fill `#ffffff`.
   - Date & Venue: Inter Regular $14\text{px}$, fill `#94a3b8`.
   - Prize Pool: Inter SemiBold $16\text{px}$, fill `#fbbf24` (Amber Gold).
5. **Add Action Button**:
   - Text `"Register Now - ₹200"`, background `#6366f1` (Indigo 500), radius $12\text{px}$, full width.
6. **Turn into Master Component (`Shift + Option + K`)**:
   - Create variants for:
     - State 1: Active ("Register Now")
     - State 2: Registered ("✓ Registered")
     - State 3: Sold Out ("Housefull - 0 Seats")
7. **Prototype Interaction**:
   - Connect "Register Now" button $\to$ "Registration Form Modal" frame with `On Click` $\to$ `Open Overlay` (Centered, Background Dim $50\%$).
