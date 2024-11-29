// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { URI } from 'vscode-uri';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let out = vscode.window.createOutputChannel("hello world");//can call vscode api in the activate command and will run when vscode starts
	
	let modifyEnvPerm: Map<string, boolean> = new Map();
	

	//runs whenever the user saves a file (also runs when the file is autosaved)
	const disposable4 = vscode.workspace.onDidSaveTextDocument(async (e) => {
		// out.appendLine(e.fileName)s;//gets the file path and name
		// out.appendLine(e.getText());//gets the content of the file

		//checks the fileType and makes sure its .env
		let fileType: any = e.fileName.split("/").at(-1);
		fileType = fileType.split(".").at(-1);
		if(fileType === undefined || fileType !== "env") {
			return;
		}

		//check if the user already accepted or rejected that they want this .env file to have a .env-example file auto generated
		let decision: any = modifyEnvPerm.get(e.fileName);
		if(decision === undefined) {
			//ask the user
			let answer: any = await vscode.window.showInformationMessage("Should a .env-example file be created or updated?", "yes", "no");

			if(answer === undefined){
				return;
			}
			else if (answer === "no") {
				modifyEnvPerm.set(e.fileName, false);
				return;
			} else if(answer === "yes") {//there shouldn't be another option return but just in case we'll just check if the last possible option is "yes"
				modifyEnvPerm.set(e.fileName, true);
			} 
		} else if(decision === false) {
			return;
		} 
		
		//this code updates or creates the .env-example file
		let fileContents: string = e.getText();
		out.appendLine("updated .env-example.");

	});

	context.subscriptions.push(disposable4);
}

// This method is called when your extension is deactivated
export function deactivate() {}


///////////////////////////////
// MOVE ALL OF THIS TO THE .env-example project repository
// 
///////////////////////////////
	//things to figure out:
	//[x]create and edit a file 
		//[ kinda ]check if a file already exists
		//
	//[x]read the contents of a file that isn't open (the .env-example if there is one that already exists) (probably a function in the workspaces api)
	//[x]create a button prompts (just yes no questions)
	//[ ]a way to prompt the user to create a .env-example whenver they open a .env

	//things to store temporarily:
		//which .env and .env-example files I can create a .env-example and/or edit the .env-example
		// ... can't ... 
