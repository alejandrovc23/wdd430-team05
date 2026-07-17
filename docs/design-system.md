# Handcrafted Haven Design System

## Brand Direction

Handcrafted Haven's visual identity is warm, authentic, creative, trustworthy, artisan-focused, sustainable, and community-oriented. Natural colors, generous space, tactile imagery, and restrained decorative details should keep handmade products and artisan stories at the center of the experience.

## Color Palette

| Color name | Hex value | Intended use |
| --- | --- | --- |
| Forest | `#254441` | Primary brand color, navigation, strong headings, and primary actions |
| Forest Dark | `#17312F` | High-emphasis text, dark surfaces, hover states, and footer backgrounds |
| Terracotta | `#A34A2A` | Warm accent, calls to action, links, and selected states |
| Cream | `#FFF8EE` | Main page background and warm section surfaces |
| White | `#FFFFFF` | Cards, controls, and content surfaces that need separation |
| Charcoal | `#2D2A26` | Body copy and high-contrast interface text |
| Sage | `#8BAA91` | Supporting accents, borders, tags, and decorative surfaces |

Color must never be the only way that meaning, state, or validation feedback is communicated. Text and interactive color combinations must be checked against WCAG contrast requirements before new combinations are introduced.

## Typography

Headings use `Georgia, Cambria, "Times New Roman", serif` to create a crafted, editorial tone. Body text and interface controls use `Arial, Helvetica, sans-serif` for clarity at a wide range of sizes.

Body text should begin near `1rem` (16px) with a comfortable line height of approximately `1.6`. Heading levels should use a consistent responsive scale and preserve a logical document hierarchy. Typography should remain readable when zoomed and should not depend on fixed-height containers.

## Layout

Layouts are mobile-first and use a centered content container with a recommended maximum width of `1200px`. Page sections should use consistent inline padding and clear vertical separation. Content should follow a meaningful reading order even when CSS Grid or Flexbox changes its visual arrangement.

Card grids use one column on small screens, two columns on tablet-sized screens, and three columns on desktop screens when space permits. No layout should create horizontal scrolling at common viewport widths.

## Spacing

Use a small, repeatable spacing scale rather than one-off values. The initial scale is based on:

- `0.25rem` for compact adjustments
- `0.5rem` for tightly related content
- `1rem` for standard component spacing
- `1.5rem` for grouped content
- `2rem` for section padding on smaller screens
- `3rem` and `4rem` for major section separation on larger screens

Spacing should communicate relationships: elements within a component remain closer together than separate sections.

## Buttons

Primary buttons use a solid Forest or Terracotta background with a verified high-contrast label. Secondary buttons use a transparent or light surface with a visible Forest border and Forest text. Both variants should provide:

- A clear action label
- A generous pointer and touch target
- Consistent padding and border radius
- Distinct hover, focus, active, and disabled states
- A visible keyboard focus indicator that is not removed by hover styling

Buttons should be reserved for actions. Navigation to another page should use a link styled appropriately for its purpose.

## Cards

Cards use White or Cream surfaces, modest rounded corners, a subtle shadow or border, and consistent internal spacing. Category and product cards should keep the image, name, supporting details, and action in a predictable order. Product cards should visibly present the product name, category, artisan name, price, rating, and an accessible link or action.

Cards should not depend on hover to reveal essential information. Images need appropriate alternative text, and repeated card actions must have labels that make sense outside their visual context.

## Navigation

The primary navigation appears inside a semantic header and presents the Handcrafted Haven wordmark plus clear text links. It should remain understandable and operable at mobile, tablet, and desktop widths. Current-page styling should use more than color alone, keyboard focus must remain visible, and the navigation order must match the reading and tab order.

A skip-to-content link should be the first keyboard-focusable element so keyboard users can bypass repeated navigation.

## Imagery

Imagery should feel warm, honest, and focused on handmade products, natural materials, and the people who create them. Use consistent aspect ratios to prevent layout shifts. Images should not contain embedded text, and meaningful images require concise alternative text. Decorative images should use empty alternative text so they do not add noise for assistive-technology users.

The Week 02 demonstration uses local SVG assets so the experience does not depend on external image hosting.

## Responsive Behavior

The interface begins with a single-column small-screen layout. Navigation, hero content, card grids, spacing, and type sizes progressively adapt as space becomes available. Tablet layouts generally use two-column grids, while desktop layouts may use three columns within the `1200px` content maximum. Components must tolerate text wrapping, browser zoom, and content growth without clipping or horizontal overflow.

Responsive behavior should be verified with both viewport resizing and keyboard interaction; device width alone does not determine accessibility.

## Accessibility

Handcrafted Haven has a WCAG 2.1 Level AA accessibility goal. The initial design and all later features should follow these practices:

- Support complete keyboard accessibility with a predictable focus order.
- Provide strong, visible focus indicators for every interactive element.
- Verify color contrast for text, controls, links, and important visual boundaries.
- Use semantic HTML landmarks and native elements before custom interaction patterns.
- Provide meaningful alternative text for informative images and empty alternative text for decorative images.
- Respect reduced-motion preferences and avoid motion that is required to understand content.
- Maintain a logical heading hierarchy without skipping levels for visual effect.
- Use descriptive links and button labels rather than inaccessible icon-only controls.
- Preserve content and functionality at browser zoom and across responsive layouts.
- Associate every form control with a visible, programmatic label and provide understandable instructions or errors.

## Planned Reusable Components

- `Header`: wordmark, skip-link support, and responsive primary navigation
- `Hero`: introductory message and clear primary and secondary calls to action
- `CategoryCard`: category image, name, description, and destination link
- `ProductCard`: product image, name, category, artisan, price, rating, and accessible action
- `ArtisanSection`: promotional content that centers artisan stories and craft
- `Footer`: secondary navigation, project information, and closing brand content

These starter components should accept data through properties where practical, use semantic markup, and remain reusable beyond the homepage.

## Week 02 Design Decisions

Week 02 establishes the initial Handcrafted Haven visual identity through the warm natural palette, serif-and-sans-serif type pairing, mobile-first layout, reusable card patterns, accessible navigation, and clear interaction states. These decisions provide a shared foundation for design and development and may evolve after team review, usability findings, and later project requirements.
