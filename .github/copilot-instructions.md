# Scribbletools AI Coding Agent Instructions

## Project Overview
Scribbletools is a hybrid Go + TypeScript/JavaScript web application for interactive graph visualization and manipulation using a custom "wheel component" UI paradigm. It serves a compiled frontend SPA from an embedded Go HTTP server.

**Architecture:**
- **Backend**: Go HTTP server (port 8080) embedding TypeScript/JavaScript assets
- **Frontend**: Web Components (custom elements) written in TypeScript, transpiled to JavaScript
- **Styling**: Tailwind CSS with custom color palettes (Tango, Tailwind)
- **Visualization**: Custom `wcgraph` library for world/device coordinate transformations and rendering

## Build & Development Workflow

### TypeScript Build
- **Command**: `npm run build` or `tsc`
- **Config**: [tsconfig.json](tsconfig.json) with `rootDir: "./web"` - compiles TypeScript in `web/` to JavaScript
- **Output**: JavaScript files alongside `.ts` files (e.g., `app.ts` → `app.js`)
- **Special Configs**: `tsconfig.chevrotain.json`, `tsconfig.components.json` for specialized builds
- **Watch**: TypeScript builds run as part of dev workflow via `npm run dev`

### Go Build
- **Build tasks**: "Build Linux AMD64" and "Build Linux Release" (cross-compilation targets)
- **Output**: `bin/linux/scribbletools-amd64-linux` (production binary)
- **Key file**: [cmd/main.go](cmd/main.go) (entry point) → calls `web.StartServer()`

### Frontend Asset Processing
- **Tailwind CLI task**: Watches `web/input.css` → compiles to `web/assets/css/scribbletools.css`
- **Complete dev workflow**: Run `tsc: build` + `Run Tailwind CLI` tasks in parallel for live development

### Server Integration
The Go server ([web/service.go](web/service.go)) embeds all frontend assets:
- Serves `index.html` directly and handles redirects
- Custom route handlers for `/assets/js/`, `/assets/css/`, `/libraries/`, `/components/`
- Uses `embed.FS` for static assets—**no external file dependencies**

## Web Components Architecture

### Custom Elements Pattern
Frontend uses Web Components (ES modules + TypeScript):
- **Base class**: [web/components/base.ts](web/components/base.ts)
- **Key components**:
  - `<scribble-app>`: Main app component ([app.ts](web/components/app.ts))
  - `<wheel-input>`: User input controls ([wheelinput.ts](web/components/wheelinput.ts))
  - `<wheel-graph>`: Graph visualization ([wheelgraph.ts](web/components/wheelgraph.ts))
  - `<wheel-component>`: Generic wheel UI element ([wheelcomponent.ts](web/components/wheelcomponent.ts))
  - `<wc-graph>`: Low-level rendering surface ([wcgraph.ts](web/components/wcgraph.ts))

### HTML Templates
- Templates stored as `.html` files in `web/components/`
- Loaded via `InnerHtml.Import()` in component constructors ([innerhtml.ts](web/components/innerhtml.ts))
- Pattern: Component class definition + separate HTML template file

## Critical Libraries & Patterns

### `wcgraph` Library
The [web/libraries/wcgraph/](web/libraries/wcgraph/) library provides low-level 2D graphics:
- **Coordinate systems**: World coords (diagram space) ↔ Device coords (screen space)
- **Core classes**: `Point`, `Vector`, `Rect`, `Extent`, `Brush`, `Pen`, `Font`
- **Rendering**: `CanvasRenderer` (canvas 2D API), `CanvasDevice` (device abstraction)
- **Interactions**: `IHittable`, `IMouseInteraction` interfaces for clickable elements
- **Popup system**: `IPopupHost`, `PopupInfo` for context menus

### Color Palettes
- [web/libraries/palette/](web/libraries/palette/) provides `TailwindPalette` and `TangoPalette`
- Used for consistent color schemes across visualizations
- Implements `ColorInfo` interface for color utility functions

### Chevrotain Parser
- Dependency: `chevrotain` npm package for grammar parsing
- Embedded at [web/assets/chevrotain/](web/assets/chevrotain/)
- Route `/assets/chevrotain/chevrotain` redirects to `/assets/js/chevrotain.mjs`

## Code Generation & Dual Compilation
- TypeScript files compile to JavaScript side-by-side (not to separate output dir)
- Both `.ts` and `.js` files exist in repository
- **Never delete `.js` files**—they are transpiled outputs, not to be edited directly
- Always edit the `.ts` source files

## Styling & Tailwind Integration
- **Input**: [web/input.css](web/input.css) - Tailwind directives
- **Output**: [web/assets/css/scribbletools.css](web/assets/css/scribbletools.css)
- **Watch task**: "Run Tailwind CLI" rebuilds CSS on input changes
- **HTML integration**: Index.html links compiled stylesheet; components use Tailwind utility classes

## Module Resolution
- **Base path**: `./` with custom `paths` mapping `@/*` → `./web/*`
- **Module format**: ES modules (`type: "module"` in package.json)
- **Import style**: Prefer relative imports or `@/` alias for absolute paths
- **Asset imports**: Use `/assets/` prefix for runtime asset access

## Key Developer Insights
1. **Embedded assets**: The Go server embeds all `.js`, `.css`, `.html`, and library files—changes require server rebuild
2. **Web Components**: Always implement `connectedCallback()` for initialization; define custom elements with `customElements.define()`
3. **Coordinate transforms**: Understand `IWcCoordinateSystem` and viewport/window concepts when modifying rendering code
4. **Testing**: `npm run test` runs `vite build` (not unit tests)—verify builds don't fail before commits
5. **Type safety**: Strict TypeScript mode (`strict: true`)—maintain type definitions for all public APIs

## File Organization Reference
- `web/components/` - Web Component classes & HTML templates
- `web/libraries/wcgraph/` - 2D graphics, rendering, coordinate systems
- `web/libraries/palette/` - Color management
- `web/assets/` - Compiled CSS, JavaScript bundles, external libraries
- `cmd/main.go` - Server entry point
- `web/service.go` - HTTP server configuration & asset serving
