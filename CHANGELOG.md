# Change Log

All notable changes to the "env-example-auto-generator" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.1.0] - 2024-12-26
### Changed
- The example filename from `*.env.*-example` to `*.env-example.*`.

## [1.0.0] - 2024-12-23
### Added
- Add `*.env.*` with `.env.
- Ability to use custom file types for other env file types (ex. .env.production will output .env.production-example)
- Button at the top of the text editor to trigger the update/create .env-example popup prompt, on the next save.
- Button at the top of the text editor to stop synchronizing the `.env` file with the `.env-example` file.
- Error notifications for invalidly formatted `.env` files that the user know why the `.env-example` file wasn't updated.
- A settings option to disable the error notifications.

## [0.0.2] - 2024-12-19

### Changed
- Changed the wording in the `README.md` as some points were verbose.

### Removed
- Removed an outputChannel called `hello world` that was used for error logging and will be replaced by a notification in a future update.

## [0.0.1] - 2024-12-18

- Initial release preview