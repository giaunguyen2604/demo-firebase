This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setup firebase

- Firstly, Install firebase tools `npm install -g firebase-tools`.
- After that, run `firebase logout` and `firebase login` correct account.

- Next, go to project source → run `firebase init firestore`.

### Helper commands

// Deploy rules for all databases configured in your firebase.json

```bash
firebase deploy --only firestore:rules
```

// Deploy rules for the specified database configured in your firebase.json

```bash
firebase deploy --only firestore:<databaseId>
```

// change project

```bash
firebase use <project-id>
```

// update local index file

```bash
firebase firestores:indexes > firestores.indexes.json
```

## Pages

1. **Todo list**

- url `/`
- implement simple features:
  - create todo
  - list todo
  - delete todo
- restrict firestore action by `firestore.rules`

2. **Student list**

- url `/students`
- we have advance filter feature, use `firestore index`. Currently, I support filter by Class and filter by Math score (>=8 or <8).

=> This project just simple apply the features `rules` and `indexes` of firebase.

// TODO
Complete filter features for both Math, Literature and English.
