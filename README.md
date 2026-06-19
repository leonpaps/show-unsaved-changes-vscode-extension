# Show Unsaved Changes

A VS Code/VSCodium extension to display a diff between unsaved in-editor content and the on-disk file.

## Features

- Quickly compare unsaved edits with the saved file.
- Opens a side-by-side diff in a new tab.
- Invoked via **Ctrl+Shift+P** → _Show Unsaved Changes_.

## Requirements

- VS Code or VSCodium.
- Node.js.
- _vsce_ CLI (for packaging).

## Installation

```bash
# Clone the repository
git clone https://github.com/your-name/show-unsaved-changes.git
cd show-unsaved-changes

# Install dependencies (if any)
npm install

# Package the extension into a .vsix
vsce package

# Install the generated .vsix
code --install-extension show-unsaved-changes-0.0.1.vsix
```

## Usage

1. Open a file and make edits without saving.
2. Press **Ctrl+Shift+P**, type **Show Unsaved Changes**, and press Enter.
3. A diff view opens next to the current tab showing your unsaved changes.

## Extension Commands

- **Show Unsaved Changes**: Display the diff of unsaved edits.

## Known Limitations

- Untitled or never-saved files will show an error.
- Only supports file URIs (`scheme === 'file'`).

## Release Notes

### 0.0.1

- Initial release with core diff functionality.

## Download

**CI Build Artifacts**  
Pre-built VSIX packages are automatically generated on each push via GitHub Actions. Download the latest artifact from the **Artifacts** section of the **Build VSIX** workflow:  
https://github.com/leonpaps/show-unsaved-changes-vscode-extension/actions/workflows/build_vsix.yml  

**Official Releases**  
Stable versions are published on GitHub Releases and include the VSIX asset:  
https://github.com/leonpaps/show-unsaved-changes-vscode-extension/releases

## License

MIT