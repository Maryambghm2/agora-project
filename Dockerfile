# Utiliser une image Node.js légère
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Installer les dépendances de PostgreSQL et autres utilitaires nécessaires
RUN apk add --no-cache postgresql-client

# Copier le package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Construire l'application (si Next.js)
RUN npm run build

# Exposer le port de l'application
EXPOSE 3000

# Définir l'URL de la base de données à partir de l'environnement
ENV DATABASE_URL=$DATABASE_URL

# Copie le fichier de backup dans le conteneur
COPY backups/backup_data.sql /tmp/backup_data.sql

# Commande pour restaurer la base de données après le démarrage
CMD psql -U maryam -d postgres -f /tmp/backup_data.sql && npm start
