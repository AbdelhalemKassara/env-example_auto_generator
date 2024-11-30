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
		// out.appendLine(fileContents.split('\n').length.toString());

	});

	context.subscriptions.push(disposable4);

	enum stringTypes {
		none,
		multilineSingle,
		multilineDouble,
		single,
		double
	}

	function removeValFromEnv(fileContents: string): string {
		let contByLine: string[] = fileContents.split('\n');

		let pattern = new RegExp("^[a-zA-Z_][a-zA-Z0-9_]*$");//double check this regex (also rename it)
		let strType: stringTypes = stringTypes.none;

		let cleanContByLine: string[] = [];


		for(let line = 0; line < contByLine.length; line++) {
			for(let char = 0; char < contByLine[line].length; char++) {
				if(contByLine[line][char] === '#') {
					cleanContByLine.push(contByLine[line].slice(char, contByLine[line].length-1)); //double check this is slicing properly
					continue;
				}
				
				if(contByLine[line][char] === '=') {
					if(char === 0) {//probably don't need this with the regex underneath
						throw new Error(`Invalid env file, line number ${line} shouldn't start with an equal sign.`);
					}

					
					if(!pattern.test(contByLine[line].slice(0, char-1))) {
						throw new Error(`Invalid env file, the variable name in line number ${line} is invalid.`);
					} else {
						cleanContByLine.push(contByLine[line].slice(0, char));
					}

					if(contByLine[line].length - char+1 >= 3) {
						if(contByLine[line][char+1] === '"' && contByLine[line][char+2] === '"' && contByLine[line][char+3] ===  '"') {

						} else if(contByLine[line][char+1] === "'" && contByLine[line][char+2] === "'" && contByLine[line][char+3] === "'") {
								//toggle switch statement in main loop to process as multiline
								//use enums
						}
					}
				}


			}
		}
		//look for the first equal sign
		//check if the text before it matches this regex [a-zA-Z_]+[a-zA-Z0-9_]*
		//check if there is a single double or multiline key(can use both double or single quotes for this) (and remove those separatley)
		//repeat for the next line

		//for each character check if it is a hash-tag (#), if it is then move on to the next line
		
		return "";
	}
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
