# env-example Auto Generator
Keeps your `.env-example` file automatically synced with your `.env` file, removing sensitive data and ensuring a clean, up-to-date example for your project.

<div style="text-align: center;  margin: 0 auto;">
  <img src="https://raw.githubusercontent.com/AbdelhalemKassara/env-example_auto_generator/refs/heads/main/demo%20videos/main%20demo/main%20demo(sharex%20output).gif?raw=true" width="75%" />
</div>

## Features

* Asks the user if it should keep a `.env-example` file in sync with the currently opened `.env` file at the first save.
<div style="text-align: center;  margin: 0 auto;">
  <img src="https://github.com/AbdelhalemKassara/env-example_auto_generator/blob/main/demo%20videos/prompt/yes%20-%202/yes.gif?raw=true" width="32.5%" />
  <img src="https://github.com/AbdelhalemKassara/env-example_auto_generator/blob/main/demo%20videos/prompt/no/no.gif?raw=true" width="32.5%" />
  <img src="https://github.com/AbdelhalemKassara/env-example_auto_generator/blob/main/demo%20videos/prompt/x/x.gif?raw=true" width="32.5%" />
</div>


* Updates the `.env-example` file every time the user saves the `.env` file and supports all `*.env.*` files.
<div style="text-align: center;  margin: 0 auto;">
  <img src="https://github.com/AbdelhalemKassara/env-example_auto_generator/blob/main/demo%20videos/other%20file%20types/other%20file%20types.gif?raw=true" width="50%" />
</div>


* Toggle buttons on the editor toolbar to control whether or not to keep the `.env-example` file in sync.
<div style="text-align: center;  margin: 0 auto;">
  <img src="https://github.com/AbdelhalemKassara/env-example_auto_generator/blob/main/demo%20videos/toggle%20buttons/disable%20button/disable%20button.gif?raw=true" width="49.5%" />
  <img src="https://github.com/AbdelhalemKassara/env-example_auto_generator/blob/main/demo%20videos/toggle%20buttons/enable%20button/enable%20button.gif?raw=true" width="49.5%" />
</div>

* Displays error messages for invalid `.env` to let the user know why the `.env-example` file wasn't updated.
<div style="text-align: center;  margin: 0 auto;">
  <img src="https://github.com/AbdelhalemKassara/env-example_auto_generator/blob/main/demo%20videos/invalid%20format/invalid%20key/invalid%20key.gif?raw=true" width="49.5%" />
  <img src="https://github.com/AbdelhalemKassara/env-example_auto_generator/blob/main/demo%20videos/invalid%20format/invalid%20value/invalid%20value.gif?raw=true" width="49.5%" />
</div>

* Unobtrusive, adding no additional placeholder data to the `.env-example`. 

* Works with a `single`, `double`, `single multi-line`, and `double multi-line` quotes.
* Removes any unnecessary extra lines from multi-line values, keeping the example clean.

## Extension Settings
* `env-example-auto-generator.Error-Notifications` Toggles whether or not to display error notifications for invalidly formatted .env files.

## Incoming Features
None right now but let me know on https://github.com/AbdelhalemKassara/env-example_auto_generator/issues if there are any features I should add.

## Known Issues
Let me know on  https://github.com/AbdelhalemKassara/env-example_auto_generator/issues if there are any issues that you find with this extension.