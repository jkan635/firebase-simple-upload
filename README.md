## Firebase simple upload
This project is a simple webpage where the user can look at and insert file and text records in Firebase (Firestore and Storage).

## Going further

Several things can be added to this, such as the ability to delete files or records, authentication, pagination.

## Project info

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First create a Firebase project, you can do this through the firebase tools, you can install them using the following command, additional info found here (https://firebase.google.com/docs/cli#deployment)
```bash
npm install -g firebase-tools
```
Login into firebase 
```bash
firebase login
```
Deploy the firebase project using the configuration files
```bash
firebase deploy
```

Log into firebase and create a Firebase web app inside the new project

Create a `.env.local` file in the project root with the following fields, fill it out with the information from the new Firebase web app. Ensure it is in the gitignore so you don't commit your project information

```md
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

