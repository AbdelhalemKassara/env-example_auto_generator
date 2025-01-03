import * as vscode from 'vscode';
import { URI } from 'vscode-uri';
import { removeValFromEnv } from './envFileProcessingFun';

export function activate(context: vscode.ExtensionContext) {	
	let canModifyEnvPerm: Map<string, boolean> = new Map();

	//runs whenever the user saves a file (also runs when the file is autosaved)
	const disposable = vscode.workspace.onDidSaveTextDocument(async (textDoc : vscode.TextDocument) => {
		//checks the fileType and makes sure its .env (checks the type after the first instance of a dot)
		let filePath: string[] | undefined = textDoc.fileName.split("/");
		let fileName: string[] | undefined = filePath?.at(-1)?.split(".");
		let fileType: string | undefined = fileName?.at(1);
		
		if(fileType === undefined || fileType !== "env" || fileName === undefined) {
			return;
		}

		//create the file path for the example file by working backwords from above
		fileName[1] = "env-example";
		filePath[filePath.length-1] = fileName.reduce((acc, curVal) => acc + '.' + curVal);
		const envExamplePath: string = filePath.reduce((acc, curVal) => acc + '/' + curVal);

		//check if the user already accepted or rejected that they want this .env file to have a .env-example file auto generated
		let decision: any = canModifyEnvPerm.get(textDoc.fileName);
		if(decision === undefined) {
			//ask the user
			let answer: "yes" | "no" | undefined = await vscode.window.showInformationMessage("Should a .env-example file be created or updated?", "yes", "no");

			if(answer === undefined){
				return;
			} else if (answer === "no") {
				canModifyEnvPerm.set(textDoc.fileName, false);
				return;
			} else if(answer === "yes") {//there shouldn't be another option return but just in case we'll just check if the last possible option is "yes"
				canModifyEnvPerm.set(textDoc.fileName, true);
			} 
		} else if(decision === false) {
			return;
		} 
		
		//this code updates or creates the .env-example file
		try {
			await vscode.workspace.fs.writeFile(URI.parse("file://" + envExamplePath), 
																					new TextEncoder().encode(removeValFromEnv(textDoc.getText())));//this writes regardless if there is a file there or not
		} catch(error: any) {
			let errorNotifToggle: boolean | null | undefined = vscode.workspace.getConfiguration("env-example-auto-generator")?.get("Error-Notifications");

			//we want this to evaluate to true if it's true, undefined, or null
			if(errorNotifToggle !== false) { 
				vscode.window.showErrorMessage(error.toString());
			}
		}
		
	});

	const disposable1 = vscode.commands.registerTextEditorCommand("env-example-auto-generator.generateEnvExample", (textEdit: vscode.TextEditor) => {
		if(canModifyEnvPerm.get(textEdit.document.fileName) === false) {
			canModifyEnvPerm.delete(textEdit.document.fileName); //in case the user changes their mind
		}

		textEdit.document.save();
	});

	const disposable2 = vscode.commands.registerTextEditorCommand("env-example-auto-generator.stopGeneratingEnvExample", (textEdit: vscode.TextEditor) => {
		canModifyEnvPerm.set(textEdit.document.fileName, false);
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
}


// This method is called when your extension is deactivated
export function deactivate() {}