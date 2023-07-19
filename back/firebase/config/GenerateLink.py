import os
import firebase_admin
from firebase_admin import credentials, storage

# Obtenez le chemin absolu du fichier JSON
current_directory = os.path.dirname(os.path.abspath(__file__))
json_path = os.path.join(current_directory, "airneis-bfec3-firebase-adminsdk-muxxs-b5021cd036.json")

# Initialisez l'application Firebase avec les informations d'identification
cred = credentials.Certificate(json_path)
firebase_admin.initialize_app(cred, {'storageBucket': 'airneis-bfec3.appspot.com'})

# Obtenez une référence au bucket de stockage Firebase
bucket = storage.bucket()

def list_files_with_directory(path):
    blobs = bucket.list_blobs(prefix=path)

    # Parcourez les blobs par lots
    batch_size = 100
    batch = []
    for blob in blobs:
        # Vérifiez si le blob est un fichier (et non un dossier)
        if not blob.name.endswith("/"):
            # Ajoutez le blob actuel à la liste du lot en cours
            batch.append(blob)
        
        # Traitez le lot actuel s'il atteint la taille maximale ou s'il n'y a plus de blobs à traiter
        if len(batch) >= batch_size or blob == blobs[-1]:
            process_batch(batch)
            batch = []

def process_batch(batch):
    # Traitez les blobs dans le lot actuel
    for blob in batch:
        # Obtenez l'URL public pour le fichier
        url = blob.generate_public_url()
        print(f"URL: {url}")
        print(f"Répertoire d'origine : {os.path.dirname(blob.name)}")
        print("-" * 50)

# Chemin du dossier spécifique que vous souhaitez parcourir
specific_directory = 'images/Armoires/Produit 1'
list_files_with_directory(specific_directory)
