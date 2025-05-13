# GIF Deleter 🎉

**GIF Deleter** is a tool that automatically deletes **all your favorited GIFs** from Discord, it's useful if you're looking to start fresh or want to remove your saved collection in bulk, rather than manually un-favoriting them one by one.

---

## Requirements ⚙️

- [Node.js](https://nodejs.org/en/) **v21.6.1 or higher**
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (or another package manager like Yarn or pnpm)

---

## Installation 📥

1. Clone the repository to your local machine
2. Navigate into the cloned directory
3. Run `npm install` to install all required dependencies

---

## Usage 🚀

1. Run `npm start` to launch the script
2. Enter your Discord token
3. Done

> ⚠️ **Warning**: This operation is irreversible. Make sure you really want to delete all your GIFs before running the script.

---

## How does it work? 🤔

The script deletes all favorited GIFs by sending a request to Discord's API that replaces your current GIF list (saved through a proto-encoded blob) with an empty one

1. Prepares an empty list of GIFs
2. It encodes this empty list into the format used by Discord (base64 protobuf)
3. A request is sent to Discord’s servers, updating your settings with the empty list
