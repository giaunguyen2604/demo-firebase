This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

## Setup firebase

Firstly, Install firebase tools `npm install -g firebase-tools`.
`firebase logout` and `firebase login` correct account.

Next, go to project source → run `firebase init firestore`.

// Deploy rules for all databases configured in your firebase.json
`firebase deploy --only firestore:rules`

// Deploy rules for the specified database configured in your firebase.json
`firebase deploy --only firestore:<databaseId>`
