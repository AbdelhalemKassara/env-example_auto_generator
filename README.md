# env-example Auto Generator
Keeps your `.env-example` file automatically synced with your `.env` file, removing sensitive data and ensuring a clean, up-to-date example for your project.

## Features
* Asks the user if it should keep a `.env-example` file in sync with the currently opened `.env` file at the first save.
* Unobtrusive, adding no additional placeholder data to the `.env-example`. 
* Updates the `.env-example` file every time the user saves the `.env` file and supports all `*.env` files.  
* Removes any unnecessary extra lines from multi-line values, keeping the example clean and precise.

* Toggle buttons on the editor toolbar to control whether or not to keep the `.env-example` file in sync.
* Displays error messages for invalid `.env` to let the user know why the `.env-example` file wasn't updated.
* Works with a `single`, `double`, `single multi-line`, and `double multi-line` quotes.

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
* `env-example-auto-generator.Error-Notifications` Toggles whether or not to display error notifications for invalidly formatted .env files.

## Incoming Features
None right now but let me know on https://github.com/AbdelhalemKassara/env-example_auto_generator/issues if there are any features I should add.

## Known Issues
