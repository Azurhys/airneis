import os
import firebase_admin
from firebase_admin import credentials, storage

# Obtenez le chemin absolu du fichier JSON
current_directory = os.path.dirname(os.path.abspath(__file__))
print(current_directory)
json_path = os.path.join(current_directory, "airneis-bfec3-firebase-adminsdk-muxxs-b5021cd036.json")

cred = credentials.Certificate(json_path)
firebase_admin.initialize_app(cred, {'storageBucket': 'gs://airneis-bfec3.appspot.com'}, force_firebase_install=True)

bucket = storage.bucket()

def list_files_with_directory(path):
    blobs = bucket.list_blobs(prefix=path)
    for blob in blobs:
        relative_path = os.path.relpath(blob.name, path)
        print(f"Lien : gs://{bucket.name}/{blob.name}")
        print(f"Répertoire d'origine : {os.path.dirname(relative_path)}")
        print("-" * 50)

root_directory = 'images'
list_files_with_directory(root_directory)
