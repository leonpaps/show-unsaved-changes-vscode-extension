const vscode = require('vscode');

class SavedContentProvider {
    constructor() {
        this._onDidChange = new vscode.EventEmitter();
        this.onDidChange = this._onDidChange.event;
        this.contentByPath = new Map();
    }

    setContent(filePath, content) {
        this.contentByPath.set(filePath, content);
    }

    provideTextDocumentContent(uri) {
        return this.contentByPath.get(uri.path) || '';
    }
}

function activate(context) {
    const provider = new SavedContentProvider();
    let isOpeningDiff = false;
    context.subscriptions.push(
        vscode.workspace.registerTextDocumentContentProvider('unsaved-diff-saved', provider),
        provider
    );

    const disposable = vscode.commands.registerCommand('showUnsavedChanges', async () => {
        if (isOpeningDiff) {
            return;
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return vscode.window.showErrorMessage('No active editor');
        }

        const doc = editor.document;
        if (doc.isUntitled) {
            return vscode.window.showErrorMessage('File has not been saved yet');
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

            await vscode.commands.executeCommand(
                'vscode.diff',
                savedUri,
                doc.uri,
                `Unsaved Changes: ${vscode.workspace.asRelativePath(doc.uri)}`,
                {
                    preview: false,
                    preserveFocus: true
                }
            );
        } catch (e) {
            return vscode.window.showErrorMessage(`Error showing diff: ${e.message}`);
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
