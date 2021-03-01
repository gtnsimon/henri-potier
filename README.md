# La bibliothèque d'Henri Potier

[Exercice technique](https://github.com/xebia-france/recruitment-tests/blob/master/ExerciceFront.md) Publicis Sapient.

## Techno.

### Interface

- Framework JavaScript : [NuxtJS](https://nuxtjs.org/)

  - Components : [BootstrapVue](https://bootstrap-vue.org/)

- Framework CSS : [Bootstrap](https://getbootstrap.com/)

  - Theme : [LUX](https://bootswatch.com/lux/)

### Déploiement

- [Google App Engine](https://cloud.google.com/appengine?hl=en)
## Fonctionnalités

Brief :

  - [x] Afficher les livres que l’on souhaite acheter
  - [x] Effectuer une recherche libre
  - [x] Récapitulatif du panier où sera appliquée la meilleure offre commerciale possible

Pour la magie :

  - [x] Afficher un livre (amplificatum)
  - [x] Possibilité de modifier la quantité de livres ajouté au panier
  - [x] Feedback lors de l'ajout d'un livre au panier
  - [x] Retirer un livre du panier (Finite Incantatem)
  - [x] Responsive

## Lancer le projet

- Exécuter `yarn`

### Pour le développement

- Cloner le repo.
- Déclarer les variables d'environnement (renommer `.env-dist` en `.env`)
- Exécuter `yarn run dev`

### Pour un build en local

- Cloner le repo.
- Déclarer les variables d'environnement (renommer `.env-dist` en `.env`)
- Exécuter `yarn run build`
- Exécuter `yarn run start:local` (`yarn run start` est utilisé par GAE avec les variables d'environnement de l'instance)

### Sur GAE

- Cloner le repo.
- Déclarer les variables d'environnement (renommer `.env-dist` en `.env-gcp-build`)
- Modifier `app.yaml` avec les mêmes variables d'environnement dans `env_variables`
- Disposer d'un projet GCP avec App Engine d'activé (avec la facturation)
- *(facultatif)* Déclarer un domaine personnalisé sur GAE et ajouter les DNS pour accéder à l'application (où utiliser le domaine `appspot.com`)
- *(facultatif)* Disposer d'un [Cloud Load Balancer](https://cloud.google.com/load-balancing?hl=en) et d'un [bucket Cloud Storage en backend](https://cloud.google.com/load-balancing/docs/https/ext-load-balancer-backend-buckets?hl=en) pour servir les fichiers statiques
- Modifier le domaine du script `gcp-build` dans `package.json`
- Exécuter `yarn run deploy`
- *(la première fois)* Modifier `dispatch.yaml` pour qu'il corresponde avec votre projet GCP.
- *(la première fois)* Exécuter `yarn run dispatch`

## Où sont les tests, Gaëtan ?

- `yarn run test`

Je me rend compte que je suis une quiche pour ça et qu'il faut vraiment que je prenne le temps de tester la partie vue/vuex. Le test visuel lors du développement sur un projet de cette taille peut suffir dans la limite du raisonnable mais là c'est pas dans mes capacités *(sinon c'est dans 3 mois... 3 mois ?... 3 mois ?... 3 mwaaa)*.
