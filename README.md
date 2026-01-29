# 🏛️ Tender Platform - Front End

Plateforme de gestion des marchés publics (Appels d'offres) basée sur une architecture Microservices.
Ce repository contient le Front-End réalisé en **Angular 17+**.

---

## 📅 Roadmap & Avancement

Le développement est structuré en plusieurs parties fonctionnelles :

- [x] **Partie 1 : Socle Technique & Authentification** (✅ Terminé)
- [x] **Partie 2 : Module OWNER** (Création et gestion des appels d'offres) (✅ Terminé)
- [ ] **Partie 3 : Module SUPPLIER** (Soumission des dossiers & Upload de fichiers)
- [ ] **Partie 4 : Intelligence Artificielle & Admin** (Intégration RAG & Dashboard)

---

## 📑 Rapport d'Avancement : Partie 1 (Socle)

**Statut :** ✅ Socle Technique & Authentification Opérationnels

### 1. Réalisations
Transformation de l'initialisation Angular en application sécurisée.
- **Authentification Simulée (Mocking) :** Imitation du comportement serveur (latence, token JWT fictif).
- **Sécurité :** Mise en place des Guards (`CanActivateFn`) et Interceptors.
- **UI :** Intégration de TailwindCSS et design du Login/Navbar.

### 2. Architecture & Conventions
Approche **Standalone Components**.
Arborescence simplifiée :
- `src/app/core/services/auth.ts` : Service d'Auth (Mocké)
- `src/app/core/guards/auth-guard.ts` : Protection des routes
- `src/app/features/auth/login/login.ts` : Composant Login
- `src/app/app.ts` : Composant Racine

### 3. Bugs Résolus (Legacy)
1.  **Compatibilité TailwindCSS :** Utilisation de la v3.4 stable.
2.  **Course Asynchrone :** Utilisation de `switchMap` pour garantir le stockage du token.
3.  **Imports Standalone :** Ajout systématique de `CommonModule` et `ReactiveFormsModule`.

---

## 📑 Rapport d'Avancement : Partie 2 (Module Owner)

**Statut :** 🟢 Stable & Fonctionnel (Owner Module Ready)

Cette phase a transformé la plateforme en une application métier, introduisant la gestion complète des offres par les propriétaires (Administrations).

### 1. Architecture UI (Design System)
Abandon du code CSS dupliqué au profit de composants réutilisables "Dumb Components" (`src/app/shared/ui`) :
- **`<app-ui-button>`** : Gestion automatique des états de chargement (spinner) et désactivation.
- **`<app-ui-card>`** : Conteneur standardisé pour l'affichage des données.
- **`<app-ui-spinner>`** : Animation de chargement centralisée.

### 2. Couche Data & "Shadow Coding"
L'architecture est prête pour le Backend réel grâce à une stratégie de **Shadow Coding** dans `tender.ts`.
- **Code Réel (Commenté) :** Les appels `HttpClient` vers l'API sont déjà écrits.
- **Mock Actif :** Le service simule une base de données locale persistante durant la session. Les offres créées s'ajoutent dynamiquement à la liste, offrant une expérience utilisateur réaliste.

### 3. Fonctionnalités Owner (`src/app/features/owner`)
- **Dashboard Intelligent :** Utilisation du `AsyncPipe` pour la gestion des flux de données et l'affichage conditionnel (Loading / Error / Success).
- **Création d'Offre :** Formulaire complexe avec `ReactiveForms`, validation stricte et feedback visuel immédiat.
- **Routage Dynamique :** Redirection intelligente au Login (ADMIN -> `/dashboard`, OWNER -> `/owner/dashboard`).

---

## 🧪 Guide de Test & Démo (Recette Utilisateur)

Voici la procédure pour valider le fonctionnement de l'application en mode "Mocking".

### Scénario 1 : Validation UX & Gestion d'Erreur
1.  Aller sur la page de Login.
2.  Entrer un email invalide (ex: `toto@gmail.com`) et n'importe quel mot de passe.
3.  Cliquer sur **Se connecter**.
    * *✅ Résultat attendu :* Le bouton charge (~500ms), puis un message d'erreur rouge apparaît immédiatement.

### Scénario 2 : Flux "Owner" (Création & Consultation)
1.  Se connecter avec : **`owner@immo.com`** / **`1234`**.
    * *✅ Résultat attendu :* Redirection vers `/owner/dashboard`. 3 offres par défaut sont visibles.
2.  Cliquer sur **"+ Créer une offre"**.
3.  Remplir le formulaire :
    * *Titre :* "Construction Entrepôt"
    * *Budget :* 500000
    * *Date :* Sélectionner une date future.
4.  Cliquer sur **"Publier l'offre"**.
    * *✅ Résultat attendu :* Spinner de chargement, redirection vers le Dashboard. **La nouvelle offre est visible en haut de la liste.**

### Scénario 3 : Flux "Admin" (Cloisonnement)
1.  Cliquer sur **"Déconnexion"**.
2.  Se connecter avec : **`admin@test.com`** / **`1234`**.
    * *✅ Résultat attendu :* Redirection vers le Dashboard Admin (vue simplifiée). Les offres de l'Owner ne sont PAS visibles ici, confirmant la séparation des rôles.

---

## ⚙️ Guide du Développeur

### Comptes de test (Mocking)
Le backend n'étant pas requis pour lancer le front, voici les accès simulés :

| Rôle | Email | Mot de passe |
| :--- | :--- | :--- |
| **Admin** | `admin@test.com` | `1234` |
| **Owner** | `owner@immo.com` | `1234` |
| **Supplier** | `supplier@test.com` | `1234` |

### Installation & Démarrage

1.  **Installation des dépendances :**
    ```bash
    npm install
    ```
2.  **Lancer le serveur de développement :**
    ```bash
    ng serve -o
    ```