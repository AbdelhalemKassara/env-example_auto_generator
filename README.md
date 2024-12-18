# env-example Auto Generator
Keeps your `.env-example` file automatically synced with your `.env` file, removing sensitive data and ensuring a clean, up-to-date example for your project.

## Features
* Automatically generates and keeps your `.env-example` file in sync with your project’s `.env` file. 
* It removes sensitive data from the `.env` file, ensuring no confidential information is exposed. 
* The extension stays unobtrusive, adding no additional placeholder data to the `.env-example`. 
* It updates the `.env-example` file every time the user saves the `.env` file and supports all `*.env` files.  
* It removes any unnecessary extra lines from multiline values, keeping the example clean and precise.
<br/><br/>

<div style="text-align: center;  margin: 0 auto;">
  <img src="demo videos/demo clicking x and no/demo clicking x and no.gif" width="600" />
</div>

> Simple prompt that operats on the current `.env` file. Users can choose to create or update the `.env-example` file, decline and suppress future prompts, or decline while being reminded on the next save.

<div style="text-align: center;  margin: 0 auto;">
  <img src="demo videos/values and comments/values and comments.gif" width="600" />
</div>

> Works with a wide range of value types.

## Extension Settings

None at this moment.

## Incoming Features
* Ability to add custom file types for other env file types (ex. .env.production)
* Ability to add custom file ending for the env-example (ex. -example, .example)
* Button at the top of the text editor to trigger the update/create .env-example popup prompt.

## Known Issues
* Currently, the only way to generate a `.env-example` file for a specific `.env` file after selecting 'No' in the popup is to restart VS Code.


## Release Notes

### 0.0.1

preview.

