# ReserGo Frontend

ReserGo est le site destiné aux clients, leur permettant de rechercher des disponibilités, de se connecter pour effectuer des réservations et de consulter la liste de leurs réservations. Ce frontend est développé en **React** et communique avec un backend en .NET via une API.
## Fonctionnalités principales

- **Gestion des réservations** : Les utilisateurs peuvent réserver des chambres d'hôtel, des tables de restaurant ou des espaces événementiels.
- **Recherche de disponibilités** : Recherche avancée par date, nombre de personnes, type, etc.
- **Consultation des réservations** : Les utilisateurs peuvent voir la liste de leurs réservations.
- **Notifications en temps réel** : Intégration avec SignalR pour des mises à jour instantanées.
- **Authentification et sécurité** : Connexion, inscription et accès basé sur les rôles.

## Technologies utilisées
- **React** (JavaScript)
- **React Router** (navigation)
- **Tailwind CSS** (mise en forme)
- **Axios** (requêtes API)
- **SignalR** (notifications en temps réel)
- **npm** (gestion des paquets)
<!-- **Jest** / **React Testing Library** (tests unitaires) -->

## Structure du projet

- `src/components` : Composants UI réutilisables (Pied de page, En-tête, etc.)
- `src/pages` : Pages principales de l'application (Accueil, Réservation, Admin, etc.)
- `src/services` : Services API et utilitaires
- `src/context` : Contexte React (authentification, notifications)
- `src/assets` : Images et fichiers statiques

## Démarrage rapide

1. **Prérequis** :
    - Node.js (v18+ recommandé)
    - npm

2. **Installer les dépendances** :
   ```bash
   npm install

3. **Configurer l’environnement**:
    - Contacter les contributeurs pour obtenir les variables d'environnement nécessaires.

4. **Lancer l’application**:
   ```bash
   npm start

## Notes techniques

-  **React Router** pour la navigation.
- Les appels API sont centralisés dans le dossier `src/services`.
- Le style est géré avec **Tailwind CSS**.
- Les fonctionnalités en temps réel utilisent **SignalR**.
- Design réactif et accessible.

## Contribution

- Forkez le dépôt, créez une branche, puis soumettez une Pull Request.
- Suivez la structure du projet et les conventions de code.

## Auteurs

- Projet développé par l’équipe ReserGo.
- Contributeurs:
    - [Sedar](https://github.com/sedar007)
    - [Lala Britta](https://github.com/laurrnci22)
