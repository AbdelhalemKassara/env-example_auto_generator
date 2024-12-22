import * as vscode from 'vscode';
import { URI } from 'vscode-uri';
import { removeValFromEnv } from './envFileProcessingFun';

export function activate(context: vscode.ExtensionContext) {	
	let canModifyEnvPerm: Map<string, boolean> = new Map();

	//runs whenever the user saves a file (also runs when the file is autosaved)
	const disposable = vscode.workspace.onDidSaveTextDocument(updateEnvExample);

	const disposable1 = vscode.commands.registerTextEditorCommand("env-example-auto-generator.generateEnvExample", (textEdit: vscode.TextEditor) => {
		canModifyEnvPerm.set(textEdit.document.fileName, true); //in case the user changes their mind
		updateEnvExample(textEdit.document);
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable1);

	async function updateEnvExample(textDoc: vscode.TextDocument) {
		//checks the fileType and makes sure its .env (checks the type after the first instance of a dot)
		let fileType: string | undefined = (textDoc.fileName.split("/")?.at(-1))?.split(".")?.at(1);

		if(fileType === undefined || fileType !== "env") {
			return;
		}

		//check if the user already accepted or rejected that they want this .env file to have a .env-example file auto generated
		let decision: any = canModifyEnvPerm.get(textDoc.fileName);
		if(decision === undefined) {
			//ask the user
			let answer: "yes" | "no" | undefined = await vscode.window.showInformationMessage("Should a .env-example file be created or updated?", "yes", "no");

			if(answer === undefined){
				return;
			}
			else if (answer === "no") {
				canModifyEnvPerm.set(textDoc.fileName, false);
				return;
			} else if(answer === "yes") {//there shouldn't be another option return but just in case we'll just check if the last possible option is "yes"
				canModifyEnvPerm.set(textDoc.fileName, true);
			} 
		} else if(decision === false) {
			return;
		} 
		
		//this code updates or creates the .env-example file
		let fileContents: string = textDoc.getText();


		try {
			await vscode.workspace.fs.writeFile(URI.parse("file://" + textDoc.fileName + "-example"), 
				new TextEncoder().encode(removeValFromEnv(fileContents)));//this writes regardless if there is a file there or not
		} catch(error: any) {
			let errorNotifToggle: boolean | null | undefined = vscode.workspace.getConfiguration("env-example-auto-generator")?.get("Error-Notifications");

			//we want this to evaluate to true if it's true, undefined, or null
			if(errorNotifToggle !== false) { 
				vscode.window.showErrorMessage(error.toString());
			}
		}
	}
}


// This method is called when your extension is deactivated
export function deactivate() {}