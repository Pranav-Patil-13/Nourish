# Nourish — Health & Calorie Tracker

A premium mobile health and calorie tracker application built with **React**, **Vite**, and pure **Vanilla CSS**, viewable inside a desktop mobile device frame.

---

## 🌟 Key Features

1. **Onboarding & Welcome Experience**:
   - High-contrast typography and hero photography.
   - Interactive glass slider button with smooth slide-to-unlock gesture to enter the dashboard.

2. **Daily Nutrition & Activity Dashboard**:
   - Pull-down-to-refresh gesture with elastic damping and shimmer skeletons.
   - Infinite horizontal date slider centered with interactive calendar selector.
   - Swipeable Hero Nutrition Carousel (Calories, Hydration, Active Burn).
   - 3-Macro Grid (Protein, Carbs, Fats) with visual progress bars.
   - Today's Activity feed with meal items, calories, and time stamps.
   - Real-time notification drawer with unread count badge.

3. **Multi-Mode AI Food & Barcode Scanner**:
   - **Scan Food**: Circular meal plate frame with animated laser sweep line and AI macro detection.
   - **Barcode**: Compact horizontal scanner window framing 1D UPC product barcodes.
   - **Food Label**: Vertical Nutrition Facts table OCR scanning.
   - 3.5-second processing state with static 'X' cancel control.
   - Non-destructive modal dismissal: shows still scanned image with resolved Macro Preview Card and "Full Info" reopening button.

---

## 📋 Design & Architecture Rules

- **Strict Typography**: Font weight strictly $\le 600$ (400 regular, 500 medium, 600 semibold).
- **Subtle Radii**: Max 14px for cards (`--radius-xl: 14px`), 50% for circular controls.
- **Color Tokens**: Ghostwhite (`#F8F8FF`) canvas, clean white cards, dark zinc text (`#18181B`), and tailored lime-green accents (`#74B816`).
- **Zero CSS Frameworks**: Built 100% with Vanilla CSS design tokens.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
