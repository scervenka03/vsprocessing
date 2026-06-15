# VSProcessing

A small VS Code extension that runs the active JavaScript file inside a Webview "codebed" for visual/processing-style sketches.

## Features

- Open the active JavaScript file in a webview preview alongside the editor.
- Loads the local `packages/codebed` bundle to provide drawing/shape helpers.
- Simple, zero-configuration preview for Processing-style sketches written in JavaScript.

## Commands

- `vsprocessing.runVSProcessing` — Open the VSProcessing Webview for the active JavaScript editor. The command requires a JavaScript file to be active; otherwise it shows an error.

## Installation

You can install this extension from the VS Code Marketplace when published, or run it locally from source:

1. Clone the repository.
2. Install dependencies:

```bash
yarn install
```

3. Build the workspace (compile TypeScript and bundle `packages/codebed`):

```bash
yarn compile
```

4. Open this folder in VS Code and press `F5` to start the extension in the Extension Development Host.

## Usage

1. Open a JavaScript file containing your sketch or script.
2. Run the command `VSProcessing: Run VSProcessing` (command id `vsprocessing.runVSProcessing`) from the Command Palette, or bind a keyboard shortcut to the command.
3. A webview titled "VSProcessing Webview" will open beside the editor and run the active file's code together with the `codebed` helpers.

Notes:
- The extension injects the active editor content into the webview as a `<script>` tag. The active editor must be a JavaScript file (language id `javascript`).
- The webview loads `media/vsprocessing.html` from the extension and the `packages/codebed/dist/index.js` bundle.

## Development

- Source entry: [src/extension.ts](src/extension.ts#L1-L200)
- Webview template: [media/vsprocessing.html](media/vsprocessing.html#L1)
- Codebed package: [packages/codebed](packages/codebed)

Recommended tasks while developing:

```bash
yarn install
yarn compile
# then press F5 in VS Code to run the extension host
```

If you change files in `packages/codebed`, ensure its build output is available at `packages/codebed/dist/index.js` so the webview can load it.

## Contributing

Contributions are welcome. Please open issues or pull requests with clear descriptions and reproduction steps.

## License

This repository is public; add a LICENSE file to indicate the chosen license.
