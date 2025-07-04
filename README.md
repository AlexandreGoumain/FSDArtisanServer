# FSDArtisanServer

## Présentation

Ce projet est un serveur Node.js/Express pour la gestion d'un atelier d'artisanat/design de meubles. Il permet de gérer les utilisateurs, les meubles, les ressources, les fournisseurs et les catégories via une restAPI, avec une authentification sécurisée et une persistance des données via MongoDB.

---

## Architecture du projet

- **src/**
  - **controllers/** : Logique métier pour chaque ressource (utilisateurs, meubles, ressources, etc.)
  - **models/** : Schémas Mongoose pour MongoDB
  - **routes/** : Définition des routes Express pour chaque ressource
  - **middlewares/** : Middlewares Express (authentification, etc.)
  - **validations/** : Schémas de validation Zod pour sécuriser les entrées utilisateur
  - **utils/** : Fonctions utilitaires (formatage des réponses, etc.)
  - **config/** : Configuration de la connexion à la base de données

---

## Installation

1. **Cloner le dépôt**

   ```bash
   git clone <url-du-repo>
   cd FSDArtisanServer
   ```

2. **Installer les dépendances**

```bash
   npm install
```

3. **Configurer les variables d'environnement**
- Créez un fichier .env à la racine du projet (voir .env.example si disponible).
- Ajoutez la variable suivante :

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=your_backend_port

- **Attention**:Le fichier .env n'est pas versionné pour des raisons de sécurité.
Vous pouvez :
Créer votre propre base MongoDB (par exemple sur MongoDB Atlas) et renseigner la string de connexion.
Ou contacter le propriétaire du repo pour obtenir une string de connexion de développement.

4. **Lancer le serveur de développement**
```bash
   npm run dev
```

Le serveur démarre par défaut sur le port 8000.

## Fonctionnalités principales
- Authentification (inscription, connexion, déconnexion)
- Gestion des utilisateurs
- Gestion des meubles et de leurs catégories
- Gestion des ressources et de leurs catégories
- Gestion des fournisseurs
- Validation des données côté serveur

## Remarques
- Ce backend est prévu pour être utilisé avec un frontend (React, etc.).
- Pour toute question ou pour obtenir une string de connexion MongoDB de développement, contactez le propriétaire du dépôt.




## Besoin du client

_Présentation générale_

Le client est un designer, il ne se considère pas comme un artiste, mais plutôt comme un artisan. Il dessine les plans de ses meubles, commande les différents matériaux puis les donne à un atelier spécialisé qui les réalise.

Il ne possède pas de magasin pour exposer ses réalisations.

Voici l'organisation du client :

1. Travail de recherche.
2. Calcul des différentes quantités de matière première nécessaires.
3. Commande des quantités de matière première.
4. Envoi des plans de conception avec les matières premières à l'atelier spécialisé.
5. Livraison au client ou magasin ou stockage des meubles dans son entreprise.

Il aimerait avoir une application qui liste les meubles qu'il réalise avec la possibilité de voir exactement quels sont les matériaux qu'il a utilisé pour chaque réalisation. Il donne un nom pour chaque meuble qu'il conçoit. Parfois il fait le même meuble plusieurs fois.

## Contraintes techniques

- Vous devez faire un trello pour organiser/planifier les étapes de conception.

- Votre code sera versionné à l'aide de Git sur Github ou Gitlab, le dépôt devra être donné au formateur dès le départ du projet.

- Utilisez Node.js, Express et un moteur de rendu (pug). Vous pouvez également utiliser React pour la partie "front".

- Vous devez également créer une persistance pour les données avec MySQL ou MongoDB avec Mongoose pour Node.js et l'intégrer à l'API ou à l'application.

- Il faudra également mettre en place une page de login pour consulter/lancer la création des statistiques.

- Vous devez faire la partie interface utilisateur à partir du chapitre qui suit ci-dessous.

### Organisation & contraintes de développement

Le client aimerait avoir dans son application les matériaux utilisés suivants, il indique également le nom de chaque entreprise le fournissant :

Il y a 7 matières premières et que 3 entreprises :

> Bois : frêne, chêne et noyer. Entreprise : BBois

> Fer : acier inox et aluminum. Entreprise : MetaLo

> Plastique. Entreprise : pPlastique.

Il aimerait également avoir les catégories de meuble suivantes dans lequel il pourrait enregistrer l'ensemble de ses réalisations :

> Armoire

> Etagère

Il aimerait avoir les fonctionnalités suivantes dans son application :

> Un système de mot clés sera mis en place pour associer meuble et matière(s) première(s). Ces mots clés sont cliquables et la page présentera le détail de cette matière.

> Vous êtes libre sur le choix des technologies à utiliser pour le développement de cette application. Cependant, vous devez considérer le point suivant :
> L'utilisation d'une librairie JavaScript comme Chart.js pour la réalisation des graphiques.

> Vous devez analyser les besoins du client décrit dans ce document et fournir un schéma de la base de données sous forme d'un pdf.

> Le client aimerait que son application s'inspire des modèles suivants : Bootstrap 5 Admin Dashboard Theme.
