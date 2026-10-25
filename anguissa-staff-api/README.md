# Anguissa Staff API

API Spring Boot 3.2 / Java 17 avec Spring Web, Spring Security, Spring Data JPA et Oracle.

## Configuration

La connexion Oracle est configurable par variables d'environnement :

| Variable | Valeur par défaut / usage |
| --- | --- |
| `DB_URL` | `jdbc:oracle:thin:@//localhost:1521/FREEPDB1` |
| `DB_USERNAME` | Obligatoire |
| `DB_PASSWORD` | Obligatoire |

Hibernate utilise `ddl-auto=validate` : le schéma doit exister et n'est pas modifié automatiquement.

Les routes autres que `GET /api/health` sont protégées par HTTP Basic. Spring Security génère un mot de passe temporaire au démarrage si aucun utilisateur n'est configuré. La dépendance JJWT est présente dans le `pom.xml`; le flux d'authentification JWT et les règles de rôles restent à définir avec les besoins métier.

## Construire et démarrer

Depuis ce répertoire, avec JDK 17 et Maven installés :

```powershell
$env:DB_USERNAME = "votre_utilisateur"
$env:DB_PASSWORD = "votre_mot_de_passe"
mvn spring-boot:run
```

L'API de contrôle est disponible sur `http://localhost:8080/api/health`.

## Tests

```powershell
mvn test
```
