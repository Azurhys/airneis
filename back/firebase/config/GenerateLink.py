import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

# Initialisation de l'application Firebase
cred = credentials.Certificate('airneis-bfec3-firebase-adminsdk-muxxs-fa3af111f2.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'airneis-bfec3.appspot.com'
})

# Récupération des liens des images dans le stockage Firebase
bucket = storage.bucket()
blobs = bucket.list_blobs()

for blob in blobs:
    print(f"URL de l'image : {blob.public_url}")

