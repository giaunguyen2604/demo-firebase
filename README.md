This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) version 14.

## Development

```bash
yarn dev
```

→ [http://localhost:3000](http://localhost:3000)

## Setup firebase

- Firstly, Install firebase tools `npm install -g firebase-tools`.
- After that, run `firebase logout` and `firebase login` with correct account.

- Next, go to project source → run `firebase init firestore` (`--debug` is optional).
  (`firestore.rules`, `firestore.indexes.json` will be created)
- If you need functions → run `firebase init functions`, the `functions` folder will be generated in your source code.

### Helper commands

Deploy rules for all databases configured in your firebase.json

```bash
firebase deploy --only firestore:rules
```

Deploy rules for the specified database configured in your firebase.json

```bash
firebase deploy --only firestore:<databaseId>
```

Change project

```bash
firebase use <project-id>
```

Update local index file

```bash
firebase firestores:indexes > firestores.indexes.json
```

### Emulator setup

INSTALL The Local Emulator Suite (Run Functions & Storage,... locally)

Docs: https://firebase.google.com/docs/emulator-suite/install_and_configure

**Prerequisite:**

- Node.js version 16.0 or higher.
- Java JDK version 11 or higher. (`brew install openjdk` → after that, check `java --version`)

**Init**

- `firebase init emulators`
- Use firebase fake `project-id` for testing → command run emulator: `firebase --project=<project-id> emulators:start`
- Config in `firebase.ts` config:

```js
const firebaseConfig = {
	projectId: 'demo',
	// other configs can skip when we use emulator
};

const app =
	getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
connectFirestoreEmulator(db, '127.0.0.1', 8080);
export { db };
```

## App Pages

1. **Todo list**

- url: `/`
- implement simple features:
  - create todo
  - list todo
  - delete todo
- restrict firestore action by `firestore.rules`

2. **Student list**

- url: `/students`
- we have advance filter feature, use `firestore index`. Currently, I support filter by Class and filter by Math score (>=8 or <8).

=> This project just simple test the `rules` and `indexes` of firebase, not mean build an app feature.

// TODO
Complete filter features for both Math, Literature and English.
