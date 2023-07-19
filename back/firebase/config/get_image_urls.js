const fs = require('fs');
const admin = require('firebase-admin');

const serviceAccount = require('/Users/romaincascio/Documents/H3 Hitema/Projet_H3/airneis/back/firebase/config/airneis-bfec3-firebase-adminsdk-muxxs-b5021cd036.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'airneis-bfec3.appspot.com' // Remplacez par l'URL de votre bucket Firebase Storage
});

const bucket = admin.storage().bucket();

async function getImageUrls() {
  try {
    const [files] = await bucket.getFiles({ prefix: 'images/Tables/' }); // Remplacez le préfixe par le dossier dans lequel se trouvent vos images
    const urls = {};

    for (const file of files) {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // Expiration de l'URL dans 15 minutes
      });

      const path = file.name.split('/').slice(1).join('/'); // Récupérer le chemin à partir du nom du fichier (en enlevant le préfixe)
      urls[path] = url;
    }

    return urls;
  } catch (error) {
    console.error('Erreur lors de la récupération des URLs :', error);
    throw error;
  }
}

getImageUrls().then((urls) => {
  const text = Object.entries(urls).map(([path, url]) => `${path} : ${url}`).join('\n');
  
  fs.writeFile('Url Tables.txt', text, (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture dans le fichier :', err);
    } else {
      console.log('Le fichier urls.txt a été créé avec succès.');
    }
  });
});
