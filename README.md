# 🏛️ Tender Platform - Front End

Plateforme de gestion des marchés publics (Appels d'offres) basée sur une architecture Microservices.
Ce repository contient le Front-End réalisé en **Angular 17+**.

---

## 📅 Roadmap du Projet (Challenge 4 Jours)

- [x] **Jour 1 : Socle Technique & Authentification** (✅ Terminé)
- [ ] **Jour 2 : Module OWNER** (Création et gestion des appels d'offres)
- [ ] **Jour 3 : Module SUPPLIER** (Soumission des dossiers & Upload de fichiers)
- [ ] **Jour 4 : Intelligence Artificielle & Admin** (Intégration RAG & Dashboard)

---

## 📑 Rapport d'Avancement : Jour 1 (29 Janvier 2026)

**Statut :** ✅ Socle Technique & Authentification Opérationnels

### 1. Ce qui a été réalisé
Transformation d'une coquille vide en application sécurisée avec simulation serveur.
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

### 3. "Best-Of" des Bugs Résolus
1.  **Crash TailwindCSS (v4) :** Rétrogradation vers la v3.4 stable pour compatibilité Angular.
2.  **Course Asynchrone :** Utilisation de `switchMap` pour garantir le stockage du token avant la redirection.
3.  **Imports Standalone :** Ajout systématique de `CommonModule` et `ReactiveFormsModule`.

### 4. Guide du Développeur (Mocking)
Le backend n'étant pas prêt, le service `auth.ts` utilise `of().pipe(delay(500))` pour simuler l'API.
**Comptes de test :**
- **Admin :** `admin@test.com` / `1234`
- **Owner :** `owner@test.com` / `1234` (À venir)
- **Supplier :** `supplier@test.com` / `1234` (À venir)

---

## 🚀 Comment lancer le projet

1.  **Installation :**
    ```bash
    npm install
    ```
2.  **Démarrage :**
    ```bash
    ng serve -o
    ```