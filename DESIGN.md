# RF Research Hub Design System

This document outlines the design theme, color palette, and specifications for the **RF Research Hub** project.

## Color Philosophy

The design system is engineered for the high-stakes environment of RF and telecommunications research. The brand personality is rooted in **precision, clarity, and technical authority**, prioritizing information density and logical grouping over decorative elements.

## Core Brand Colors

The following core colors represent the primary identity of the RF Research Hub:

| Color | Hex | Sample | Description |
| :--- | :--- | :--- | :--- |
| **Primary** | `#003366` | <span style="background-color:#003366;width:24px;height:16px;display:inline-block;border:1px solid #737780;"></span> | Deep Navy Blue used for institutional branding, primary navigation, and headers. Represents stability and authority. |
| **Secondary** | `#008080` | <span style="background-color:#008080;width:24px;height:16px;display:inline-block;border:1px solid #737780;"></span> | Technical Teal used for interactive elements, data highlights, and indicating active RF signals. |
| **Tertiary** | `#64748B` | <span style="background-color:#64748B;width:24px;height:16px;display:inline-block;border:1px solid #737780;"></span> | Slate Grey used for metadata, secondary labels, and supporting iconography. |
| **Neutral / Background** | `#F8FAFC` | <span style="background-color:#F8FAFC;width:24px;height:16px;display:inline-block;border:1px solid #737780;"></span> | Cool, soft white background designed to reduce eye strain during technical analysis. |
| **Success** | `#10B981` | <span style="background-color:#10B981;width:24px;height:16px;display:inline-block;border:1px solid #737780;"></span> | Standard semantic green, slightly desaturated to match the professional tone. |
| **Error** | `#EF4444` | <span style="background-color:#EF4444;width:24px;height:16px;display:inline-block;border:1px solid #737780;"></span> | Standard semantic red, slightly desaturated for warning/error states. |

---

## Complete Named Colors (Material 3 Tokens)

### 1. Primary Colors
| Token | Hex | Sample |
| :--- | :--- | :--- |
| `primary` | `#001e40` | <span style="background-color:#001e40;width:40px;height:16px;display:inline-block;"></span> |
| `on_primary` | `#ffffff` | <span style="background-color:#ffffff;width:40px;height:16px;display:inline-block;border:1px solid #c3c6d1;"></span> |
| `primary_container` | `#003366` | <span style="background-color:#003366;width:40px;height:16px;display:inline-block;"></span> |
| `on_primary_container` | `#799dd6` | <span style="background-color:#799dd6;width:40px;height:16px;display:inline-block;"></span> |
| `primary_fixed` | `#d5e3ff` | <span style="background-color:#d5e3ff;width:40px;height:16px;display:inline-block;"></span> |
| `primary_fixed_dim` | `#a7c8ff` | <span style="background-color:#a7c8ff;width:40px;height:16px;display:inline-block;"></span> |
| `on_primary_fixed` | `#001b3c` | <span style="background-color:#001b3c;width:40px;height:16px;display:inline-block;"></span> |
| `on_primary_fixed_variant` | `#1f477b` | <span style="background-color:#1f477b;width:40px;height:16px;display:inline-block;"></span> |
| `inverse_primary` | `#a7c8ff` | <span style="background-color:#a7c8ff;width:40px;height:16px;display:inline-block;"></span> |

### 2. Secondary Colors
| Token | Hex | Sample |
| :--- | :--- | :--- |
| `secondary` | `#006a6a` | <span style="background-color:#006a6a;width:40px;height:16px;display:inline-block;"></span> |
| `on_secondary` | `#ffffff` | <span style="background-color:#ffffff;width:40px;height:16px;display:inline-block;border:1px solid #c3c6d1;"></span> |
| `secondary_container` | `#90efef` | <span style="background-color:#90efef;width:40px;height:16px;display:inline-block;"></span> |
| `on_secondary_container` | `#006e6e` | <span style="background-color:#006e6e;width:40px;height:16px;display:inline-block;"></span> |
| `secondary_fixed` | `#93f2f2` | <span style="background-color:#93f2f2;width:40px;height:16px;display:inline-block;"></span> |
| `secondary_fixed_dim` | `#76d6d5` | <span style="background-color:#76d6d5;width:40px;height:16px;display:inline-block;"></span> |
| `on_secondary_fixed` | `#002020` | <span style="background-color:#002020;width:40px;height:16px;display:inline-block;"></span> |
| `on_secondary_fixed_variant` | `#004f4f` | <span style="background-color:#004f4f;width:40px;height:16px;display:inline-block;"></span> |

### 3. Tertiary Colors
| Token | Hex | Sample |
| :--- | :--- | :--- |
| `tertiary` | `#0e1f32` | <span style="background-color:#0e1f32;width:40px;height:16px;display:inline-block;"></span> |
| `on_tertiary` | `#ffffff` | <span style="background-color:#ffffff;width:40px;height:16px;display:inline-block;border:1px solid #c3c6d1;"></span> |
| `tertiary_container` | `#243448` | <span style="background-color:#243448;width:40px;height:16px;display:inline-block;"></span> |
| `on_tertiary_container` | `#8c9cb5` | <span style="background-color:#8c9cb5;width:40px;height:16px;display:inline-block;"></span> |
| `tertiary_fixed` | `#d3e4fe` | <span style="background-color:#d3e4fe;width:40px;height:16px;display:inline-block;"></span> |
| `tertiary_fixed_dim` | `#b7c8e1` | <span style="background-color:#b7c8e1;width:40px;height:16px;display:inline-block;"></span> |
| `on_tertiary_fixed` | `#0b1c30` | <span style="background-color:#0b1c30;width:40px;height:16px;display:inline-block;"></span> |
| `on_tertiary_fixed_variant` | `#38485d` | <span style="background-color:#38485d;width:40px;height:16px;display:inline-block;"></span> |

### 4. Surfaces & Backgrounds
| Token | Hex | Sample |
| :--- | :--- | :--- |
| `background` | `#f7f9fb` | <span style="background-color:#f7f9fb;width:40px;height:16px;display:inline-block;border:1px solid #c3c6d1;"></span> |
| `on_background` | `#191c1e` | <span style="background-color:#191c1e;width:40px;height:16px;display:inline-block;"></span> |
| `surface` | `#f7f9fb` | <span style="background-color:#f7f9fb;width:40px;height:16px;display:inline-block;border:1px solid #c3c6d1;"></span> |
| `on_surface` | `#191c1e` | <span style="background-color:#191c1e;width:40px;height:16px;display:inline-block;"></span> |
| `surface_bright` | `#f7f9fb` | <span style="background-color:#f7f9fb;width:40px;height:16px;display:inline-block;border:1px solid #c3c6d1;"></span> |
| `surface_dim` | `#d8dadc` | <span style="background-color:#d8dadc;width:40px;height:16px;display:inline-block;"></span> |
| `surface_variant` | `#e0e3e5` | <span style="background-color:#e0e3e5;width:40px;height:16px;display:inline-block;"></span> |
| `on_surface_variant` | `#43474f` | <span style="background-color:#43474f;width:40px;height:16px;display:inline-block;"></span> |
| `surface_container_lowest` | `#ffffff` | <span style="background-color:#ffffff;width:40px;height:16px;display:inline-block;border:1px solid #c3c6d1;"></span> |
| `surface_container_low` | `#f2f4f6` | <span style="background-color:#f2f4f6;width:40px;height:16px;display:inline-block;border:1px solid #c3c6d1;"></span> |
| `surface_container` | `#eceef0` | <span style="background-color:#eceef0;width:40px;height:16px;display:inline-block;border:1px solid #c3c6d1;"></span> |
| `surface_container_high` | `#e6e8ea` | <span style="background-color:#e6e8ea;width:40px;height:16px;display:inline-block;border:1px solid #c3c6d1;"></span> |
| `surface_container_highest` | `#e0e3e5` | <span style="background-color:#e0e3e5;width:40px;height:16px;display:inline-block;border:1px solid #c3c6d1;"></span> |
| `surface_tint` | `#3a5f94` | <span style="background-color:#3a5f94;width:40px;height:16px;display:inline-block;"></span> |
| `inverse_surface` | `#2d3133` | <span style="background-color:#2d3133;width:40px;height:16px;display:inline-block;"></span> |
| `inverse_on_surface` | `#eff1f3` | <span style="background-color:#eff1f3;width:40px;height:16px;display:inline-block;border:1px solid #c3c6d1;"></span> |

### 5. Outlines
| Token | Hex | Sample |
| :--- | :--- | :--- |
| `outline` | `#737780` | <span style="background-color:#737780;width:40px;height:16px;display:inline-block;"></span> |
| `outline_variant` | `#c3c6d1` | <span style="background-color:#c3c6d1;width:40px;height:16px;display:inline-block;"></span> |

### 6. Semantic Error Colors
| Token | Hex | Sample |
| :--- | :--- | :--- |
| `error` | `#ba1a1a` | <span style="background-color:#ba1a1a;width:40px;height:16px;display:inline-block;"></span> |
| `on_error` | `#ffffff` | <span style="background-color:#ffffff;width:40px;height:16px;display:inline-block;border:1px solid #c3c6d1;"></span> |
| `error_container` | `#ffdad6` | <span style="background-color:#ffdad6;width:40px;height:16px;display:inline-block;"></span> |
| `on_error_container` | `#93000a` | <span style="background-color:#93000a;width:40px;height:16px;display:inline-block;"></span> |

---

## Typography Specs

The typography strategy focuses on **Manrope** for headers and body content, and **JetBrains Mono** for tags, technical labels, coordinates, and data values.

### Font Families
- **Sans-serif (Headlines & Body):** `Manrope`
- **Monospace (Tags, Labels, Codes & Tech Data):** `JetBrains Mono`

### Type Hierarchy & Scales

| Token / Style | Font Family | Size | Weight | Line Height | Letter Spacing | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `headline-xl` | Manrope | 48px | Bold (700) | 56px | `-0.02em` | Main page titles, large callouts |
| `headline-lg` | Manrope | 32px | Semi-Bold (600) | 40px | `-0.01em` | Section headers |
| `headline-lg-mobile` | Manrope | 24px | Semi-Bold (600) | 32px | - | Mobile responsive layout headers |
| `headline-md` | Manrope | 24px | Semi-Bold (600) | 32px | - | Subsection headers, card titles |
| `body-lg` | Manrope | 18px | Regular (400) | 28px | - | Lead paragraphs |
| `body-md` | Manrope | 16px | Regular (400) | 24px | - | Primary reading/body content |
| `body-sm` | Manrope | 14px | Regular (400) | 20px | - | Secondary descriptions, captions |
| `label-caps` | JetBrains Mono | 12px | Semi-Bold (600) | 16px | `0.05em` | Monospaced capitalized labels & tags (uppercase) |
| `code-md` | JetBrains Mono | 14px | Regular (400) | 20px | - | Code snippets, technical readouts |


