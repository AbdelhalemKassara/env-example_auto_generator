// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { URI } from 'vscode-uri';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let out = vscode.window.createOutputChannel("hello world");//can call vscode api in the activate command and will run when vscode starts

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('env-example-auto-generator.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Tomato!');
	});

	const disposable1 = vscode.commands.registerCommand('env-example-auto-generator.curtime', () => {
		vscode.window.showInformationMessage((new Date()).toLocaleString());
		out.appendLine("test");
	});

	const disposable2 = vscode.commands.registerCommand('env-example-auto-generator.envFileOpen', () => {
		vscode.window.showInformationMessage("Test notification when openning an env file");
	});

	// const disposable3 = vscode.workspace.onWillSaveTextDocument((e) => {
	// 	out.appendLine("asdfasdf " + e.document.fileName);
	// });

	//runs whenever the user saves a file (also runs when the file is autosaved)
	const disposable4 = vscode.workspace.onDidSaveTextDocument((e) => {
		// out.appendLine(e.fileName)s;//gets the file path and name
		
		// out.appendLine(e.getText());//gets the content of the file
		
		let path: vscode.Uri = URI.parse("file://" + e.fileName + "-example");
		vscode.workspace.fs.readFile(path)
			.then((contents: Uint8Array) => {
				let str: string = new TextDecoder().decode(contents);
				out.appendLine(str);
			},
			() => {
				out.appendLine('file not found');
			});// add a .catch to create the file if it hasn't been created already

			(async () => {
				let hasFile: boolean = false;

				try {
					let contents: Uint8Array = await vscode.workspace.fs.readFile(path);
					let str: string = new TextDecoder().decode(contents);
					hasFile = true;
				} catch(e) {
					hasFile = false;
				}

				out.appendLine(hasFile.toString());
			})();

			(async () => {
				let hasFile: boolean = false;

				try {
					await vscode.workspace.fs.writeFile(path, new TextEncoder().encode(" test "));//this writes regardless if there is a file there or not
				} catch(e: any) {
					hasFile = false;
					out.append(e.toString());
				}

				out.appendLine(hasFile.toString());
			})();


			(async () => {
				vscode.window.showInformationMessage("do you want to do this", "yes", "no").then(answer => {
					if(answer !== undefined) {
						out.appendLine(answer);
					} else {
						out.appendLine("this returned undefined for some reason");
					}
				});
			})();
	});
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
	
	//things to store temporarily:
		//which .env and .env-example files I can create a .env-example and/or edit the .env-example
		// ... can't ... 

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
	// context.subscriptions.push(disposable3);
	context.subscriptions.push(disposable4);
}

// This method is called when your extension is deactivated
export function deactivate() {}