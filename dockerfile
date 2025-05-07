# Utiliser une image de base Node.js officielle
FROM node:16-buster

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json dans l'image
COPY package*.json ./

# Installer les dépendances nécessaires (y compris Electron)
RUN npm install

# Copier le reste des fichiers de l'application dans l'image Docker
COPY . .

# Exposer le port pour accéder à l'application (ce port peut être modifié selon ton besoin)
EXPOSE 3000

# Commande pour démarrer l'application Electron
CMD ["npm", "start"]
