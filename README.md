# Show Unsaved Changes 

<p align="center">
  <img src="unsaved-changes-logo.jpg" alt="Show Unsaved Changes Logo" width="150" />
</p>

A lightweight, zero-dependency extension for VS Code, VSCodium or Derivitives like Cursor that lets you instantly compare your unsaved buffer against the current file state on disk.

Whether you accidentally typed something, want to audit your changes before hitting save, or need a quick sanity check, this extension generates an immediate side-by-side diff view with a single click.

## Features

* **Instant Diff View:** Safely view unsaved additions, deletions, or modifications side-by-side with your last saved file state.
* **Right-Click Integration:** Access directly from your editor tab context menu for a seamless workflow.
* **Zero Dependencies:** Built entirely using the native VS Code Extension API.
* **Cross-Platform Compatibility:** Fully tested and supported on both **VS Code** and **VSCodium**.

### Usage:
You have 2 options:
 - <kbd>ctrl/cmd</kbd> + <kbd>shift</kbd> + <kbd>p<kbd> `show unsaved changes`
 - Right click on a code tab and click `show unsaved changes`

I tried to add it to the confirm close popup modal, but we aren't allowd to edit that with standard extensions.

## Installation

### Method 1: Pre-built VSIX (Recommended)
Every change committed to this repository automatically triggers a security-isolated build via GitHub Actions to generate a verified production `.vsix` file. 

1. Download the latest `.vsix` package from the [GitHub Releases](https://github.com/leonpaps/show-unsaved-changes-vscode-extension/releases/latest) page.
2. Open VS Code, VSCodium or Cursor
3. Open the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`).
4. Click the `...` (More Actions) menu in the top-right corner of the Extensions pane. 
 
   - NOTE: If that is not there, <kbd>ctrl/cmd</kbd> + <kbd>shift</kbd> + <kbd>p<kbd> 
   - Type `vsix` and select `Extension: Install from VSIX`

5. Select **Install from VSIX...** and select the downloaded file.


### Method 2: Build it yourself

1. Pull the repo
2. Read the code
3. Build the vsix file locally with this command: `vcse package`

---

## Security & Supply Chain Safety

Blindly installing extensions from marketplaces introduces significant security risks. Many popular extensions carry massive dependency trees (`node_modules`) that open the door to malicious code injection, data exfiltration, and downstream supply chain compromises.

This extension is built with a **strict zero-dependency philosophy** to ensure total transparency. Every line of execution logic is fully audit-ready right here in the source.

### Vetting & Locking Updates
To maintain an uncompromised development environment, it is highly recommended to turn off automatic extension updates for tools you have manually vetted. This prevents a compromised upstream marketplace account from pushing a malicious update to your local editor.

There is technically one dependancy, the vcse package tool, but it is built by the vscode team so if you don't trust them well then we have reached an impass.