# Calculateur de Rentabilité Amazon

Une application web moderne pour calculer la rentabilité des produits Amazon avec export Excel automatique.

## Fonctionnalités

- ✅ Interface moderne et responsive
- ✅ Calculs de rentabilité en temps réel
- ✅ Support des marchés EU et USA
- ✅ Fourchette de prix avec variations
- ✅ Téléchargement direct Excel personnalisé
- ✅ Capture d'emails avec intégration Kit/Google Sheets
- ✅ Sauvegarde automatique des données (localStorage)

## Configuration

### 1. Capture d'emails

L'application utilise une fonction Netlify pour capturer les emails et éviter les problèmes CORS.

#### Option A: Kit (ConvertKit)
1. Créez un compte sur [Kit.com](https://kit.com)
2. Créez un formulaire et récupérez l'ID du formulaire
3. Récupérez votre clé API dans les paramètres
4. Ajoutez `KIT_API_KEY` et `KIT_FORM_ID` dans les variables d'environnement Netlify

#### Option B: Google Sheets
1. Créez un Google Sheet pour stocker les emails
2. Créez un Google Apps Script pour recevoir les données
3. Déployez le script comme une web app
4. Modifiez `src/utils/emailCapture.ts` avec l'URL du script

### 2. Configuration des variables d'environnement

Dans les paramètres de votre projet Netlify, ajoutez :
- `KIT_API_KEY` : Votre clé API ConvertKit
- `KIT_FORM_ID` : L'ID de votre formulaire ConvertKit

## Structure du projet

```
src/
├── components/          # Composants React
├── hooks/              # Hooks personnalisés
├── types/              # Types TypeScript
├── utils/              # Utilitaires, calculs et export
│   ├── calculations.ts # Formules de rentabilité
│   ├── excelGenerator.ts # Génération fichiers Excel
│   └── emailCapture.ts # Intégrations email
└── App.tsx             # Composant principal
```

## Formules implémentées

### Calculs de base
- Prix HT = Prix TTC / (1 + TVA/100)
- CA Effectif = Prix HT × (1 - Taux de retour/100)
- Commission Amazon = CA Effectif × Taux Commission/100
- Marge Brute HT = CA Effectif - Coût total - Commission - Frais FBA

### Calculs publicitaires
- Budget pub par vente = Marge Brute HT × (TACOS cible/100)
- Bénéfice après pub = Marge Brute HT - Budget pub par vente
- CPC MAX = Budget pub par vente × (Taux de conversion/100)
- Marge nette (%) = Bénéfice après pub / CA Effectif × 100
- ROI (%) = Bénéfice après pub / Coût total × 100
- TACOS réel (%) = Budget pub par vente / CA Effectif × 100

## Développement

```bash
# Installation
npm install

# Développement
npm run dev

# Build
npm run build
```

## Intégrations disponibles

### Kit (ConvertKit)
- Ajout automatique des contacts avec tags personnalisés
- Champs personnalisés : marché, produit, marges, ROI
- Gestion du consentement newsletter

### Google Sheets
- Stockage direct dans une feuille de calcul
- Colonnes : email, nom, marché, produit, métriques, timestamp
- Facile à exporter vers d'autres outils

### Webhooks
- Compatible avec Zapier, Make.com, n8n
- Données JSON complètes envoyées
- Intégration avec n'importe quel CRM ou outil marketing

## Support

Pour toute question technique, consultez la documentation des intégrations choisies.