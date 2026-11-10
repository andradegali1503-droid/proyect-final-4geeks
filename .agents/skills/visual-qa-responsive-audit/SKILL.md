---
name: visual-qa-responsive-audit
description: Conducts multi-device visual QA across mobile, tablet, and desktop viewports, verifying alignment, contrast, and layout stability.
---

# Visual QA & Responsive Audit

## Checkpoints
1. **Viewport Verification**:
   - Mobile: 320px – 480px (ergonomics, touch targets >= 44px, hamburger/bottom nav, no horizontal scroll).
   - Tablet: 768px – 1024px (grid re-flow, card balancing).
   - Desktop: 1200px – 1440px+ (max-width containment, generous margins, optical alignment).
2. **Typography & Readability**:
   - Contrast ratio >= 4.5:1 for body copy; >= 3:1 for large headings (WCAG AA).
   - Line length capped at 65–75 characters for comfortable reading.
3. **Interactive Polish**:
   - Form controls properly aligned across breakpoints.
   - Clean keyboard focus outlines (`:focus-visible`).
   - Graceful loading states, skeletons, and error messages.
