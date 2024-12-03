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
		try {
			let path: vscode.Uri = URI.parse("file://" + e.fileName + "-example");
			await vscode.workspace.fs.writeFile(path, new TextEncoder().encode(removeValFromEnv(fileContents)));//this writes regardless if there is a file there or not
		} catch(e: any) {
			out.appendLine(e.toString());
		}
	});

	context.subscriptions.push(disposable4);

	enum stringTypes {
		none,
		multilineSingle,
		multilineDouble,
		single,
		double,
		notQuote,
		endOfSecret // use this when you have reached the end of the secret (it's to check if there is a comment there)
	}

	//note that the format of .env isn't 100% the same on all programming languages but this should probably work for most

	//BUG: remove the whitespace for multiline .env variables
	function removeValFromEnv(fileContents: string): string {
		function skipChar(qty: number) { //doesn't check if it reached the end of the file, the for loop will take care of that
			char += qty;

			line += Math.floor(char / contByLine[line].length);
			char %= contByLine[line].length;
		}

		function multilineCheck(quoteType: ("'" | '"')): void {
			if(contByLine[line].length - char+1 >= 2 && contByLine[line][char-1] !== '\\' && contByLine[line][char] === quoteType && contByLine[line][char+1] === quoteType && contByLine[line][char+2] ===  quoteType) {
				strType = stringTypes.endOfSecret;
				skipChar(2);
				
			} else if(line === contByLine.length-1 && char === contByLine[line].length-3) {//reached the end of the file
				throw new Error(`Invalid env file, there is a missing endquote for a multiline quote.`);
			}
		}
		function quoteCheck(quoteType: ("'" | '"')): void {
			//checks if the previous character is '\' (for escaping the quote) (doesn't matter if we check the previous character on the first iteration as it's guaranteed to be the opening double quote)
			if(contByLine[line][char] === quoteType && contByLine[line][char-1] !== '\\') {
				strType = stringTypes.endOfSecret;

			} else if(line === contByLine.length-1 && char === contByLine[line].length-1) {//reached the end of the file (and above isn't true)
				throw new Error(`Invalid env file, there is a missing endquote.`);
			}
		}

		//start
		let contByLine: string[] = fileContents.split('\n');

		let pattern = new RegExp("^[a-zA-Z_][a-zA-Z0-9_]*$");//double check this regex (also rename it)
		let strType: stringTypes = stringTypes.none;

		let cleanContByLine: string[] = new Array(contByLine.length).fill("");

		let line = 0;
		let char = 0;

		for(; line < contByLine.length; line++) {
			char = 0;
			for(; char < contByLine[line].length; char++) {
				if(contByLine[line][char] === '#' && (strType !== stringTypes.multilineDouble && strType !== stringTypes.multilineSingle && strType !== stringTypes.double && strType !== stringTypes.single)) {
					cleanContByLine[line] += contByLine[line].slice(char, contByLine[line].length);

					break;
				}
				
				//probably should break up each case into it's own function
				switch(strType) {
					case stringTypes.none:
						if(contByLine[line][char] === '=') {		
							//adds the variable name
							if(!pattern.test(contByLine[line].slice(0, char))) {
								throw new Error(`Invalid env file, the variable name in line number ${line + 1} is invalid.`);
							} else {
								cleanContByLine[line] += contByLine[line].slice(0, char+1) + ' ';
							}
							
							//determines the type of value
							if(contByLine[line].length - char+1 >= 3) {
	
								if(contByLine[line][char+1] === '"' && contByLine[line][char+2] === '"' && contByLine[line][char+3] ===  '"') {
									strType = stringTypes.multilineDouble;
									skipChar(3);
								} else if(contByLine[line][char+1] === "'" && contByLine[line][char+2] === "'" && contByLine[line][char+3] === "'") {
									strType = stringTypes.multilineSingle;
									skipChar(3);
								}
							} 
							
							if(contByLine[line].length - char+1 >= 1) {//this check might be the issue
								
								if(contByLine[line][char+1] === '"') {
									strType = stringTypes.double;
									skipChar(1);
								} else if(contByLine[line][char+1] === "'") {
									strType = stringTypes.single;
									skipChar(1);
								}
							} 
							
							if(strType === stringTypes.none){
								strType = stringTypes.notQuote;
							}

						}
						break;

					case stringTypes.multilineDouble:
						multilineCheck('"');
						break;
					
					case stringTypes.multilineSingle:
						multilineCheck("'");
						break;

					case stringTypes.double:
						quoteCheck('"');
						break;

					case stringTypes.single:
						quoteCheck("'");
						break;
					
					case stringTypes.notQuote:
						//the code at the start should catch a comment
						if(contByLine[line][char] === ' ' || char >= contByLine[line].length-1) {
							strType = stringTypes.endOfSecret;
						} 
						//NOTE: having an equal sign in the unquoted value is valid
						break;
					
					case stringTypes.endOfSecret:
						//there should only be white space after the end of the secret (the code at the start of the for loop will catch the comment if it's there)					
						if(contByLine[line][char] !== ' ') {
							throw new Error(`Invalid env file, there should only be white space after the end of the secret on line ${line + 1}.`);
						}
						break;
				}				
			}
			if(strType === stringTypes.endOfSecret || strType === stringTypes.notQuote) {
				strType = stringTypes.none;
			}
		}

		return cleanContByLine.reduce((acc, cur) => acc + '\n' + cur);
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
