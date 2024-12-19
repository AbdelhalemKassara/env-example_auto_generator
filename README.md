# env-example Auto Generator
Keeps your `.env-example` file automatically synced with your `.env` file, removing sensitive data and ensuring a clean, up-to-date example for your project.

## Features
* Automatically generates and keeps your `.env-example` file in sync with your project’s `.env` file. 
* Removes sensitive data from the `.env` file, ensuring no confidential information is exposed. 
* Unobtrusive, adding no additional placeholder data to the `.env-example`. 
* Updates the `.env-example` file every time the user saves the `.env` file and supports all `*.env` files.  
* Removes any unnecessary extra lines from multiline values, keeping the example clean and precise.

<br/><br/>
<div style="text-align: center;  margin: 0 auto;">
  <img src="https://github.com/AbdelhalemKassara/env-example_auto_generator/blob/main/demo%20videos/values%20and%20comments/values%20and%20comments.gif?raw=true" width="700" />
</div>

> Works with a wide range of value types.
<br/><br/>

<div style="text-align: center;  margin: 0 auto;">
  <img src="https://github.com/AbdelhalemKassara/env-example_auto_generator/blob/main/demo%20videos/demo%20clicking%20x%20and%20no/demo%20clicking%20x%20and%20no.gif?raw=true" width="700" />
</div>

> Simple prompt that operats on the current `.env` file. Users can choose to create or update the `.env-example` file, decline and suppress future prompts, or decline while being reminded on the next save.

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

