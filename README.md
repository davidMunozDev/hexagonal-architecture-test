# Hexagonal architecture poc

This app provides accurate weather information both at the moment and weekly. It is designed with a frontend-oriented hexagonal architecture to ensure code robustness, testability, and ease of maintenance. Special attention has been paid to testing, which ensures that the application works reliably at all times, even when you are not connected to the Internet. The app being a PWA can be downloaded for use from the desktop.

## Architecture
The proposed architecture is commonly known as a hexagonal architecture. I have put it into practice with certain liberties to orient it towards the frontend without violating the framework's approach

### 📂 Folder structure

![Screenshot 2023-09-16 at 16 11 30](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/b75dcaed-c3c3-4b27-9e04-005509d47d72)

The folder structure follows the approach of a hexagonal architecture with its domain, application, and infrastructure layers. The goal is to completely abstract us from implementation details such as external APIs. This way, we protect the business logic of our application (domain layer).
Moreover, for greater scalability, I apply vertical slicing which consists of dividing the system into complete vertical functionalities that traverse all layers of the hexagonal architecture. This results in:

![Screenshot 2023-09-16 at 16 26 08](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/5cee16fa-364a-4311-a94e-f9d5e9089c9c)

### ䷦ Data flow

![Screenshot 2023-09-16 at 16 47 18](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/1addc34e-f770-4515-b435-9cc38350664e)

- The blue blocks indicate the infrastructure layer where both the infrastructure modules of each of the entities and the factories and the App can import the repository and initialize it.
- The pink blocks indicate the application layer which encompasses the application modules of each of the entities, the contexts, pages, and sections. These access the functionalities of the repositories through dependency injection and are responsible for applying the use cases. These layers can only import the domain. React framework, being a dependency, following the concept it should be part of the infrastructure layer but in testing, it will be our entry point in unit tests, something that traditionally has been the application layer.
- The orange block cannot have any type of dependency since it is the business logic of our application.
- The yellow block has no logic and provides shared components to the pages and sections.

## Caching strategy

For application resources such as images and files, the cache-first strategy is used to always get it from the cache when possible.

<img width="718" alt="Screenshot 2023-09-16 at 17 01 48" src="https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/7504e595-57f5-4613-9f9e-337bba318dda">


For API calls, the stale-while-revalidate strategy is used so that resources load as quickly as possible but keep them as up-to-date as possible in offline mode.

<img width="719" alt="Screenshot 2023-09-16 at 17 01 34" src="https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/1992b01c-78d9-4021-9380-c55d79016701">

## Testing

![Screenshot 2023-09-16 at 17 04 50](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/2197bc66-5efc-4e14-ad55-c24ad898736f)

In the app, the application layer has been tested with component and page tests using testing library. The domain layer with vitest. In addition to this, there are e2e tests to ensure the happy paths of the application. Thanks to the separation of the infrastructure layer and the ObjectMothers, testing has been greatly facilitated by being able to modify the repositories thanks to dependency injection.

Unit and component tests are executed on each commit thanks to Husky hooks.

![Screenshot 2023-09-16 at 17 15 50](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/b0d1e895-c823-4c35-8733-a3f8f58a6080)

E2E tests are executed before merging the PR to ensure the main flows.

![Screenshot 2023-09-16 at 17 18 11](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/fafb1efe-7e21-4af9-a555-98358a0aeecf)

## Initialize and test the app

### 📦 Installation

Install the project dependencies with npm

```
# install dependencies
npm i
```

### 🚀 Uso

```
# run the server on localhost:8080
npm run dev

# run unit tests
npm run test:ui

# run e2e tests
npm run test:ci
```
`
In the tests, you can also see the code coverage at the top right corner

![Screenshot 2023-09-16 at 17 21 42](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/2af53c17-48b1-4eec-a9d9-4209b85bdca9)

### Production
https://davidmunozdev.github.io/hexagonal-architecture-test/

