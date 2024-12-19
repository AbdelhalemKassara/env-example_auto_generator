import * as vscode from 'vscode';
import { URI } from 'vscode-uri';
import { removeValFromEnv } from './envFileProcessingFun';

export function activate(context: vscode.ExtensionContext) {	
	let canModifyEnvPerm: Map<string, boolean> = new Map();
	

	//runs whenever the user saves a file (also runs when the file is autosaved)
	const disposable = vscode.workspace.onDidSaveTextDocument(async (e) => {
		//checks the fileType and makes sure its .env
		let fileType: any = e.fileName.split("/").at(-1);
		fileType = fileType.split(".").at(-1);
		if(fileType === undefined || fileType !== "env") {
			return;
		}

		//check if the user already accepted or rejected that they want this .env file to have a .env-example file auto generated
		let decision: any = canModifyEnvPerm.get(e.fileName);
		if(decision === undefined) {
			//ask the user
			let answer: any = await vscode.window.showInformationMessage("Should a .env-example file be created or updated?", "yes", "no");

			if(answer === undefined){
				return;
			}
			else if (answer === "no") {
				canModifyEnvPerm.set(e.fileName, false);
				return;
			} else if(answer === "yes") {//there shouldn't be another option return but just in case we'll just check if the last possible option is "yes"
				canModifyEnvPerm.set(e.fileName, true);
			} 
		} else if(decision === false) {
			return;
		} 
		
		//this code updates or creates the .env-example file
		let fileContents: string = e.getText();


		try {
			await vscode.workspace.fs.writeFile(URI.parse("file://" + e.fileName + "-example"), 
				new TextEncoder().encode(removeValFromEnv(fileContents)));//this writes regardless if there is a file there or not
		} catch(e: any) {
			//e.toString();
		}
	});

	context.subscriptions.push(disposable);
}


// This method is called when your extension is deactivated
export function deactivate() {}