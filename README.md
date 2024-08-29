
## Getting Started

This project is deployed live on vercel.

Open [https://techinnover-dasimems.vercel.app](https://techinnover-dasimems.vercel.app) with your browser to see the live result.

To open on the development server

First, Clone the repository on your pc:
```bash
git clone https://github.com/dasimems/techinnover.git

cd ./techinnover

```

Then, Install dependencies:

```bash
yarn install

```

After the dependencies have been installed, run the command below to run the development server:

```bash

yarn dev

```

## Packages Used

- tailwind - [https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation) - For styling
- react-icons - [https://react-icons.github.io/react-icons/](https://react-icons.github.io/react-icons) - Icon pack
- react-toastify - [https://fkhadra.github.io/react-toastify/installation/](https://fkhadra.github.io/react-toastify/installation) - Toast messages
- react-dnd - [https://react-dnd.github.io/react-dnd/about](https://react-dnd.github.io/react-dnd/about) - Drag and drop functionalities
- react-hook-form - [https://react-hook-form.com/get-started](https://react-hook-form.com/get-started) - Form management
- moment - [https://momentjs.com/](https://momentjs.com) - Date formatting

## Folder structure

- All components are in the `components` folder
- All pages are in the `pages` folder
- All reducers are in the `reducer` folder
- All context are in the `context` folder
- All related items like images, fonts are in the `assets` folder with the category of the item used as folder name example is the  `images` folder
- All hooks are in the `hooks` folder
- The `services` folder contains all related functions that communicate to storage
- The `utils` folder contains all static information used in the application
