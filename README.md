# DemoFront - Personal Portfolio Web Application

DemoFront is a modern and responsive web application built with Angular, designed to showcase a personal portfolio. This application allows users to present their skills, projects, contact information, and social media links in an engaging and user-friendly manner.

## ⚙️ CI/CD y Calidad del Código

Este proyecto cuenta con un flujo CI/CD automatizado mediante **GitHub Actions**.

### ✔️ Controles implementados

- 🔍 **Linting**: Validación de estilo y errores comunes
- 🔁 **jscpd**: Análisis de código duplicado
- ✅ **Unit tests** con reporte de cobertura
- 💬 Comentarios automáticos en PRs con duplicados detectados
- 🏷️ Etiqueta automática `needs-refactor` si hay clones
- ⛔ Bloqueo de merge si hay duplicación o errores
- 📊 **Codecov** para visualizar cobertura por archivo
- 🚀 Deploy automático a Firebase Hosting

### 📎 Enlaces

- 🔗 [Ver reporte de cobertura en Codecov](https://app.codecov.io/gh/zodiak2290/demofront)
- 🧪 [Ver historial de acciones (GitHub Actions)](https://github.com/zodiak2290/demofront/actions)


## Features

*   **Dynamic Content:** Displays personal information, skills, projects, and contact details dynamically.
*   **Multi-language Support:** Supports multiple languages, allowing users to switch between different language versions of the content.
*   **Theming:** Offers multiple theme options for a personalized user experience.
*   **Social Media Integration:** Integrates links to various social media platforms.
*   **Responsive Design:** Adapts seamlessly to different screen sizes and devices.
* **Timeline:** Shows a timeline of events.
* **Settings:** The user can modify the language and the theme.

## Project Structure

The project follows a modular structure, typical of Angular applications. Here's a breakdown:

*   **`src/`**: Contains the source code of the application.
    *   **`app/`**: Contains the core modules, components, services, and other application-specific files.
        *   **`app.component.*`**: The root component of the application.
        *   **`app.module.ts`**: The root module of the application.
        *   **`components/`**: Contains all the components of the application like `home`, `login`, `profile` etc...
        * **`modelos/`**: Contains the application models
        * **`modules/`**: Contains all the feature modules of the application
        *   **`enums/`**: Contains the enumeration types.
        * **`pipes/`**: Contains the pipes.
        *   **`route/`**: Contains the routing logic.
        *   **`validacion/`**: Contains the guards.
        *   **`services/`**: Contains the services.
    *   **`assets/`**: Contains static assets like images, internationalization files (`i18n/`), and other static content.
    *   **`environments/`**: Contains environment-specific configuration files.
    *   **`main.ts`**: The main entry point of the application.
    * **`styles.css`**: Contains the general styles of the project.
    *   **`index.html`**: The main HTML file.
*   **`e2e/`**: Contains end-to-end (e2e) test files.
*   **`angular.json`**: Angular CLI configuration file.
*   **`package.json`**: Node.js project file that lists the packages and dependencies.
*   **`tsconfig.json`**: TypeScript configuration file.
*   **`tslint.json`**: TSLint configuration file.
* **`firebase.json`**: Firebase configuration file.
* **`.vscode/`**: Contains settings for visual studio code.
* **`src/browserslist`**: Configures the browsers.

## Technologies Used

*   Angular (version 7.1.1)
*   TypeScript
*   HTML5
*   CSS3
*   Angular CLI
*   Firebase

## Installation and Setup

1.  **Prerequisites:**
    *   Node.js (v10 or higher) and npm installed.
    *   Angular CLI installed globally (`npm install -g @angular/cli`).

2.  **Clone the repository:**
    

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
# demofront
