const vscode = require('vscode');

class SavedContentProvider {
    constructor() {
        this._onDidChange = new vscode.EventEmitter();
        this.onDidChange = this._onDidChange.event;
        this.contentByPath = new Map();
    }

    setContent(filePath, content) {
        this.contentByPath.set(filePath, content);
        // Good practice: fire the event to alert the editor if content updates
        this._onDidChange.fire(vscode.Uri.parse(`unsaved-diff-saved:${filePath}`));
    }

    provideTextDocumentContent(uri) {
        return this.contentByPath.get(uri.path) || '';
    }
}

function activate(context) {
    const provider = new SavedContentProvider();
    let isOpeningDiff = false;
    
    context.subscriptions.push(
        vscode.workspace.registerTextDocumentContentProvider('unsaved-diff-saved', provider)
    );

    // Accept the URI argument that VS Codium passes from context menus
    const disposable = vscode.commands.registerCommand('show-unsaved-changes.showUnsavedChanges', async (incomingUri) => {
        if (isOpeningDiff) return;

        // 1. Determine which document to target
        let doc;
        if (incomingUri) {
            // Invoked via right-click tab menu
            doc = vscode.workspace.textDocuments.find(d => d.uri.toString() === incomingUri.toString());
        } else {
            // Invoked via Command Palette or keyboard shortcut
            const editor = vscode.window.activeTextEditor;
            doc = editor ? editor.document : null;
        }

        if (!doc) {
            return vscode.window.showErrorMessage('No active or valid document found');
        }

        if (doc.isUntitled) {
            return vscode.window.showErrorMessage('File has not been saved yet');
        }

        if (!doc.isDirty) {
            return vscode.window.showInformationMessage('No unsaved changes to show.');
        }

        if (doc.uri.scheme !== 'file') {
            return vscode.window.showErrorMessage('Unsupported file type');
        }

        try {
            isOpeningDiff = true;
            const diskBytes = await vscode.workspace.fs.readFile(doc.uri);
            const savedText = Buffer.from(diskBytes).toString('utf8');

            provider.setContent(doc.uri.path, savedText);

            const savedUri = vscode.Uri.parse(
                `unsaved-diff-saved:${doc.uri.path}?t=${Date.now()}`
            );

            // Defer diff open to avoid accidental shortcut-induced newlines
            await new Promise(resolve => setTimeout(resolve, 100));

            await vscode.commands.executeCommand(
                'vscode.diff',
                savedUri,
                doc.uri,
                `Unsaved Changes: ${vscode.workspace.asRelativePath(doc.uri)}`,
                {
                    preview: false,
                    preserveFocus: false
                }
            );
        } catch (e) {
            vscode.window.showErrorMessage(`Error showing diff: ${e.message}`);
        } finally {
            isOpeningDiff = false;
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};