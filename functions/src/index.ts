import { onRequest } from 'firebase-functions/v2/https';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { logger } from 'firebase-functions';

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();

exports.addmessage = onRequest(async (req, res) => {
	const original = req.query.text;
	const writeResult = await getFirestore()
		.collection('messages')
		.add({ original: original });

	res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

exports.makeuppercase = onDocumentCreated('/messages/{documentId}', event => {
	const original = event.data?.data().original;

	logger.log('Uppercasing', event.params.documentId, original);

	const uppercase = original.toUpperCase();

	return event.data?.ref.set({ uppercase }, { merge: true });
});
