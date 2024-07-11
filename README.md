# Weather BBVA technical test

La Weather App es una aplicación que te brinda información precisa sobre el clima tanto de ese momento como semanal, diseñada siguiendo una arquitectura hexagonal orientada al frontend para garantizar la robustez, la testablidad y la facilidad de mantenimiento del código. Se ha prestado especial atención al testing, lo que asegura que la aplicación funcione de manera confiable en todo momento, incluso cuando no estés conectado a Internet. La app al ser una pwa se puede descargar para usarla desde el escritorio.

## Arquitectura
La arquitectura planteada es una arquitectura limpia comunmente conocida como hexagonal. La he puesto en practica con ciertas licencias para orientarla al front end sin ir contara el planteamiento del framework.

### 📂 Estructura de carpetas

![Screenshot 2023-09-16 at 16 11 30](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/b75dcaed-c3c3-4b27-9e04-005509d47d72)

La estructura de carpetas sigue el planteamiento de una arquitectura hexagonal con sus capas de dominio, aplicacion e infraestructura. El objetivo de esto es abstraernos por completo de los detalles de implementación como las apis externas. De esta manera protegemos la logica de negocio de nuestra aplicación (capa de dominio).
Además para una mayor escalabilidad aplico el vertical slicing que consiste en dividir el sistema en funcionalidades verticales completas, que atraviesan todas las capas de la arquitectura hexagonal.
Por lo tanto esto da como resultado:

![Screenshot 2023-09-16 at 16 26 08](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/5cee16fa-364a-4311-a94e-f9d5e9089c9c)

### ䷦ Flujo de datos

![Screenshot 2023-09-16 at 16 47 18](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/1addc34e-f770-4515-b435-9cc38350664e)

- Los bloques azules indican la capa de infraestructura en la cual tanto los modulos de infrestructura de cada una de las entidades como las factorias y el App pueden importar el repositorio e inicializarlo.
- Los bloques rosas indican la capa de aplicación la cual engloba los modulos de alicación de cada una de las entidades, los contextos, las paginas y las secciones. Estos acceden a las funcionalidades de los repositorios mediante inyección de dependencias y se encargan de aplicar los casos de uso. Estas capas solo pueden importar dominio. El framework eact al ser una dependencia siguiendo el concepto debería ser parte de la capa de infraestructura pero en testing será nuestro punto de entrada en los tests unitarios, algo que tradicionalmente ha sido la capa de aplicación.
- El bloque naranja no puede tener ningún tipo de dependencia ya que es la lógica de negocio de nuestra aplicación.
- El bloque amarillo no tiene ningún tipo de lógica y surte de componentes compartidos a las páginas y secciones.

## Estrategia de cacheo

Para los recursos de apliacción como imagenes y archivos se usa la estrategia de cache first para obtenerlo de cache siempre que sea posible.

<img width="718" alt="Screenshot 2023-09-16 at 17 01 48" src="https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/7504e595-57f5-4613-9f9e-337bba318dda">


Para las llamadas a APIs se usa la estrategia de stale while revalidate de esta manera los recursos cargaran lo mas rapido posible pero manteniendolos lo mas actualizados posible en el modo offline.

<img width="719" alt="Screenshot 2023-09-16 at 17 01 34" src="https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/1992b01c-78d9-4021-9380-c55d79016701">

## Testing

![Screenshot 2023-09-16 at 17 04 50](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/2197bc66-5efc-4e14-ad55-c24ad898736f)

En la aplicación se ha testeado la capa de aplicacion con tests de los componetes y páginas con testing library. La capa de dominio con vitest.
A demás de esto hay test e2e para asegurar los happy paths de la aplicación.
Gracias a la separación de la capa infraestructura y los ObjectMothers ha facilitado mucho los test pudiendo modificar los repositorios gracias a la inyección de dependencias.

Los test unitarios y de componete se ejecutan en cada commit gracias a lo hooks de husky.

![Screenshot 2023-09-16 at 17 15 50](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/b0d1e895-c823-4c35-8733-a3f8f58a6080)

Los rest e2e se ejecutan antes de mergear la pr para asegurar los flujos principales.

![Screenshot 2023-09-16 at 17 18 11](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/fafb1efe-7e21-4af9-a555-98358a0aeecf)

## Inicializar y probar la app

### 📦 Instalación

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
En los test tambien se puede ver la cobertura de código en la parte superior derecha 

![Screenshot 2023-09-16 at 17 21 42](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/2af53c17-48b1-4eec-a9d9-4209b85bdca9)

### Producción
Sitio web: https://davidmunozvi.github.io/BBVA-Technical-Test/

Esta aplicación se puede usar en modo offline gracias al cacheo comentado anteriormente y se pude descargar.

![Screenshot 2023-09-16 at 15 12 22](https://github.com/davidmunozvi/BBVA-Technical-Test/assets/43704932/1efc97be-6ec2-413a-9b8e-ed30982e0194)

changelog por si es de interes https://github.com/davidmunozvi/BBVA-Technical-Test/releases

Espero que te guste!

### Gracias por llegar hasta aquí 😄

