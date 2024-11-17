// Importer les bibliothèques nécessaires
const express = require('express');
const admin = require('firebase-admin');

// Initialiser l'application Express
const app = express();
app.use(express.json());

// Importer le fichier service-account de Firebase
const serviceAccount = require('./service-account.json');

// Initialiser Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Endpoint pour envoyer une notification
app.post('/send-notification', async (req, res) => {
  const { token, title, body } = req.body;

  // Vérifier les données entrantes
  if (!token || !title || !body) {
    return res.status(400).send({ error: 'Token, title, and body are required!' });
  }

  // Construire le message de notification
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token, // Le token de l'utilisateur cible
  };

  try {
    // Envoyer la notification via Firebase
    const response = await admin.messaging().send(message);
    res.status(200).send({ message: 'Notification sent successfully!', response });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send({ error: 'Failed to send notification', details: error.message });
  }
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
