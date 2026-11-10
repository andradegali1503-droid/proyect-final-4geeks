---
name: design-system-creation
description: Maintains a cohesive design system with CSS tokens for colors, typography, elevation, components, and reservation states.
---

# Design System Creation

## Foundation
1. **Design Tokens**: Centralized CSS custom properties (`:root`) for color, spacing, typography scales, border radii, shadows, and transitions.
2. **Component Primitives**:
   - Buttons: Primary (Champagne Gold filled), Secondary (Gold/Ivory outline with hover fill), Ghost/Text.
   - Form Inputs: Dark slate backgrounds, subtle metallic focus borders, floating or crisp label placement.
   - Cards: Subtle inner glow, rounded elegance (`border-radius: 12px` or `16px`), micro-elevation on hover.
   - Badges & Pills: Refined status tags for reservation confirmations, available time slots, dietary preferences.
3. **Consistency**:
   - Enforce uniform margins, paddings, and button heights throughout all routes (Home, Reserve, Menu, Reviews, MyReservations, Admin).
