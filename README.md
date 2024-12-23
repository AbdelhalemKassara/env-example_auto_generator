# env-example Auto Generator
Keeps your `.env-example` file automatically synced with your `.env` file, removing sensitive data and ensuring a clean, up-to-date example for your project.

<div style="text-align: center;  margin: 0 auto;">
  <img src="https://raw.githubusercontent.com/AbdelhalemKassara/env-example_auto_generator/refs/heads/main/demo%20videos/main%20demo/main%20demo(sharex%20output).gif?raw=true" width="75%" />
</div>

## Features

* Asks the user if it should keep a `.env-example` file in sync with the currently opened `.env` file at the first save.
<div style="text-align: center;  margin: 0 auto;">
  <img src="https://github.com/AbdelhalemKassara/env-example_auto_generator/blob/main/demo%20videos/prompt/yes%20-%202/yes.gif?raw=true" width="33%" />
  <img src="https://github.com/AbdelhalemKassara/env-example_auto_generator/blob/main/demo%20videos/prompt/no/no.gif?raw=true" width="33%" />
  <img src="https://github.com/AbdelhalemKassara/env-example_auto_generator/blob/main/demo%20videos/prompt/x/x.gif?raw=true" width="33%" />
</div>

* Unobtrusive, adding no additional placeholder data to the `.env-example`. 
* Updates the `.env-example` file every time the user saves the `.env` file and supports all `*.env` files.
* Works with a `single`, `double`, `single multi-line`, and `double multi-line` quotes.
* Removes any unnecessary extra lines from multi-line values, keeping the example clean and precise.

* Toggle buttons on the editor toolbar to control whether or not to keep the `.env-example` file in sync.
* Displays error messages for invalid `.env` to let the user know why the `.env-example` file wasn't updated.

## Extension Settings
* `env-example-auto-generator.Error-Notifications` Toggles whether or not to display error notifications for invalidly formatted .env files.

## Incoming Features
None right now but let me know on https://github.com/AbdelhalemKassara/env-example_auto_generator/issues if there are any features I should add.

## Known Issues
