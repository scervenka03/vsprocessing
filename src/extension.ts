import * as vscode from 'vscode';
import * as path from 'path';
import { readFile } from 'fs/promises';

async function getWebviewHtml(context: vscode.ExtensionContext): Promise<string> {
	const htmlPath = path.join(context.extensionPath, 'media', 'vsprocessing.html');
	return readFile(htmlPath, 'utf8');
}

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('vsprocessing.runVSProcessing', async () => {
		const processingWebviewTemplate = await getWebviewHtml(context);
		vscode.window.activeTextEditor?.document.save();
		if (vscode.window.activeTextEditor?.document.languageId !== 'javascript') {
			vscode.window.showErrorMessage('Please open a JavaScript file to use this command.');
			return;
		}
		const webviewPanel = vscode.window.createWebviewPanel(
			'vsprocessingWebview',
			'VSProcessing Webview',
			vscode.ViewColumn.Beside,
			{
				enableScripts: true,
				localResourceRoots: [
					vscode.Uri.file(path.join(context.extensionPath, 'media')),
					vscode.Uri.file(path.join(context.extensionPath, 'packages', 'codebed')),
				],
			}
		);

		const userScript = `<script>${vscode.window.activeTextEditor.document.getText()}</script>`;
		const codebedPath = vscode.Uri.file(path.join(context.extensionPath, 'packages', 'codebed', 'dist', 'index.js'));
		const codebedUri = webviewPanel.webview.asWebviewUri(codebedPath);
		const codebedScript = `<script type="module" src="${codebedUri}"></script>`;
		const html = processingWebviewTemplate.replace('<!-- USER_SCRIPT -->', `${userScript}\n	${codebedScript}`);
		webviewPanel.webview.html = html;
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
