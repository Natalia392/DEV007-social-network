# Red Social: La comunidad del libro

Aquí está el link para nuestra página: https://la-comunidad-del-libro.web.app

## Índice

* [1. Descripción](#1-descripción)
* [2. Implementación del proyecto](#2-implementación-del-proyecto)
* [3. Encuestas](#3-encuestas)
* [4. Historias de usuario](#4-historias-de-usuario)
* [5. Prototipos de baja fidelidad](#5-prototipos-de-baja-fidelidad)
* [6. Prototipos de alta fidelidad](#6-prototipos-de-alta-fidelidad)
* [7. Test de usabilidad](#7-test-de-usabilidad)
* [8. Tecnologías y herramientas utilizadas](#8-tecnologías-y-herramientas-utilizadas)


***
## 1. Descripción

La Red Social de La comunidad del libro es una plataforma en línea diseñada específicamente para personas apasionadas por la lectura. Proporciona un espacio donde los usuarios pueden crear una cuenta utilizando su correo y contraseña, o iniciar sesión a través de Google. Una vez autenticados, los usuarios pueden realizar diversas acciones, como realizar publicaciones, dar likes, quitar likes, editar y eliminar sus publicaciones.

<div align="center">
  <img src="https://github.com/Natalia392/DEV007-social-network/assets/129551206/1789a5f9-e6bf-498e-835c-168d7209079a" alt="La comunidad del libro homepage" style="max-width: 100%;">
</div>

El enfoque principal de esta red social es permitir a los usuarios compartir sus experiencias de lectura, especialmente enfocándose en los libros que han leído recientemente y desean comentar. Con la capacidad de interactuar mediante publicaciones y likes, se fomenta la participación y la creación de una comunidad unida por su amor por los libros.

## 2. Implementación del proyecto

Para la implementación del proyecto seguimos una serie de parámetros y consideraciones específicas. Estos parámetros incluyeron el uso de tecnologías como HTML, CSS y JavaScript, así como el aprovechamiento de las funcionalidades de firestore y firebase.

A lo largo de la implementación, nos enfocamos en cumplir con los siguientes objetivos:

- Utilizamos HTML semántico para estructurar adecuadamente el contenido de la aplicación.
- Aplicamos selectores de CSS para estilizar y dar estilo a los elementos de la interfaz.
- Comprendimos y utilizamos el modelo de caja (box model) para controlar el diseño y el posicionamiento de los elementos.
- Empleamos flexbox y CSS Grid Layout para crear diseños flexibles y responsivos.
- Utilizamos selectores del DOM y manipulamos dinámicamente el DOM mediante el manejo de eventos.
- Implementamos ruteado utilizando el History API para crear una navegación fluida.
- Definimos y utilizamos funciones para modularizar el código y reutilizar la lógica.
- Realizamos pruebas unitarias y pruebas asíncronas para garantizar el correcto funcionamiento de la aplicación.
- Utilizamos mocks para simular comportamientos y verificar interacciones en las pruebas.
- Implementamos módulos de ECMAScript (ES Modules) para modularizar y organizar el código de manera eficiente.
- Aplicamos linter (ESLINT) para mantener una buena calidad de código y seguir buenas prácticas de programación.
- Utilizamos identificadores descriptivos y seguimos principios básicos de diseño visual para crear una interfaz atractiva y fácil de usar.
- Nos centramos en el usuario y diseñamos y desarrollamos el producto o servicio teniendo en cuenta las necesidades de los usuarios.
- Realizamos investigaciones y testeos de usabilidad para obtener feedback y mejorar continuamente la experiencia de usuario.
- Implementamos autenticación y control de acceso utilizando Firebase Auth.
- Almacenamos y recuperamos datos utilizando Firebase Firestore.

Fue fundamental trabajar en equipos de tres, asegurando que cada integrante tuviera la oportunidad de practicar y aprender todos los aspectos involucrados en cada historia de usuario. La división y organización del trabajo permitió el aprendizaje equitativo y la colaboración entre los miembros del equipo.

El proyecto se entregó subiendo el código a GitHub y desplegando la interfaz utilizando los servicios de Firebase. 

## 3. Encuestas

En la sección de encuestas, utilizamos Google Forms para recopilar información y opiniones de los usuarios. Diseñamos un cuestionario con las siguientes preguntas:

- De las siguientes paletas de colores, ¿cuál piensas que queda mejor para este tipo de red social?
- En una red social para amantes de la lectura, ¿qué te gustaría poder hacer?
- ¿Qué nombre te resuena más para esta aplicación?
- ¿En qué categorías te gustaría que estuvieran divididos los espacios para conversar?

Recibimos un total de 30 respuestas, y utilizamos los resultados para adaptar la creación de la red social. Más adelante, realizamos una segunda encuesta para consultar a los usuarios sobre la combinación de colores y el espaciado entre los elementos. En esta encuesta, incluimos una pregunta abierta donde los usuarios brindaron numerosas recomendaciones sobre el uso de los colores. Por ejemplo, un usuario mencionó que descartó la opción 2 de la primera propuesta debido al contraste de colores entre los botones y el fondo, y señaló la importancia de considerar la accesibilidad y los diferentes brillos de pantalla. También destacó que los detalles, como el aspecto de los botones, pueden influir en la experiencia del usuario (UX). Estas sugerencias fueron tomadas en cuenta para garantizar una experiencia de usuario más satisfactoria y una mejor atención a los detalles en el diseño de la interfaz.

Aquí hay algunas capturas de pantalla de nuestra encuesta: 

![image](https://github.com/Natalia392/DEV007-social-network/assets/129551206/947f3471-077c-40dc-a281-98ff70a7a22e)
![image](https://github.com/Natalia392/DEV007-social-network/assets/129551206/3eb39b68-abd3-4321-99b6-fc6722b4cb41)
![image](https://github.com/Natalia392/DEV007-social-network/assets/129551206/50d72a24-bfa3-4900-91e3-2da7c733e354)
![image](https://github.com/Natalia392/DEV007-social-network/assets/129551206/3cd447d4-c9a8-4fdc-be60-7c6432dbebc0)
![image](https://github.com/Natalia392/DEV007-social-network/assets/129551206/c7bf0bc5-f1c2-4d87-ad9b-48ce3c4581fa)

## 4. Historias de usuario

Los resultados de la encuesta nos dieron como resultado estas seis historias de usuario, las cuales cumplimos a cabalidad en este proyecto:  

**Primera historia - Como usuario lector quiero poder crear mi propia cuenta en la La comunidad del libro para poder acceder a su contenido.**

***Criterios de aceptación***
• Hay una pantalla que da la alternativa para registrarse o hacer inicio de sesión
• Si el usuario no ha creado su cuenta tendrá la opción de crear la cuenta (ingresar) con Google o bien de registrarse tradicionalmente con un correo y contraseña.
• Si el usuario ya tiene cuenta pide correo y contraseña 
• Si ingresa datos incorrectos muestra mensaje de error “contraseña o correo no son válidos”
• Si al crear una cuenta, el correo ingresado ya está en el registro, se envía un mensaje “este correo ya está asociado a una cuenta”

***Definición de terminado***

• Login con Firebase:
    ◦ Utiliza Firebase para el login
    ◦ Creación de cuenta de acceso y autenticación con cuenta de correo y contraseña, y también con una cuenta de Google.
• Validaciones:
    ◦ No pueden haber usuarios repetidos.
    ◦ La cuenta de usuario debe ser un correo electrónico válido.
    ◦ Lo que se escriba en el campo (input) de contraseña debe ser secreto.
• Comportamiento:
    ◦ Al enviarse el formulario de registro o inicio de sesión, debe validarse.
    ◦ Si hay errores, se deben mostrar mensajes descriptivos para ayudar al usuario a corregirlos.
General:
• Es una SPA.
• Debe ser responsive.
• Recibimos code review de al menos una compañera de otro equipo.
• Hicimos los test unitarios
• Testeamos manualmente buscando errores e imperfecciones simples.
• Hicimos pruebas de usabilidad e incorporamos el feedback de los usuarios como mejoras.
• Desplegamos nuestra aplicación y etiquetamos la versión (git tag).

**Segunda historia - Historia de Usuario 2: Como usuario quiero ingresar a mi cuenta para interactuar con el contenido de la web.**

***Criterios de aceptación***

• Hay una pantalla que da la alternativa para registrarse o hacer inicio de sesión 
• Al ingresar sus datos correctamente se le presenta al usuario una nueva pantalla con un mensaje 
• notificando que ha ingresado a su sesión.
• Si no se ha hecho el login, no se está habilitado para postear en La comunidad del libro
• Si ingresa datos incorrectos muestra mensaje de error “contraseña o correo no son válidos” 


***Definición de terminado***

• Login con Firebase:
    • Autenticación con cuenta de correo y contraseña, y también con una cuenta de Google.
• Validaciones: 
    • Solamente se permite el acceso a usuarios con cuentas ya registrada dentro de la base de datos.
    • Lo que se escriba en el campo (input) de contraseña debe ser secreto y sin espacios.
General:
• Es una SPA.
• Debe ser responsive.
• Recibimos code review de al menos una compañera de otro equipo.
• Hicimos los test unitarios
• Testeamos manualmente buscando errores e imperfecciones simples.
• Hicimos pruebas de usabilidad e incorporamos el feedback de los usuarios como mejoras.
• Desplegamos nuestra aplicación y etiquetamos la versión (git tag).

**Tercera historia - Como usuario de La comunidad del libro quiero publicar post para compartir opiniones sobre lecturas.**

***Criterios de aceptación***

• Debe existir un muro para postear
• El muro debe mostrar las publicaciones que se han registrado
• El usuario puede escribir y registrar un mensaje en el muro 
• Solo puede publicar si hay contenido en el input de post. En caso de no haber contenido se manda un mensaje al usuario, por ejemplo “Tu post está vacío”.
• El usuario debe estar logueado para poder postear
• Si el usuario no está logueado, no  puede postear y se le manda un mensaje diciendo por ejemplo “haz login o crea una cuenta para poder postear”.  Al recargar la aplicación, se debe verificar si el usuario está logueado antes de mostrar contenido.

***Definición de terminado***

Pre requisito: El usuario debe estar logueado. 
General:
• Es una SPA.
• Debe ser responsive.
• Recibimos code review de al menos una compañera de otro equipo.
• Hicimos los test unitarios
• Testeamos manualmente buscando errores e imperfecciones simples.
• Hicimos pruebas de usabilidad e incorporamos el feedback de los usuarios como mejoras.
• Desplegamos su aplicación y etiquetamos la versión (git tag).

**Cuarta historia - Como usuario de esta aplicación quiero dejar mi like en las publicaciones para indicar que me gustan.**

***Criterios de aceptación***

• Debe existir en la publicación el botón para likear
• Debe mostrar en la publicación un ícono
• Debe remover el like al clickear el mismo botón.
• El usuario debe estar logueado para poder dar like.
• Máximo un like por usuario
• Llevar conteo de lo likes junto a su respectivo ícono

***Definición de terminado***

Pre-requisito: Debe existir una publicación. El usuario debe estar logueado
General:
• Es una SPA.
• Debe ser responsive.
• Recibimos code review de al menos una compañera de otro equipo.
• Hicimos los test unitarios
• Testeamos manualmente buscando errores e imperfecciones simples.
• Hicimos pruebas de usabilidad e incorporamos el feedback de los usuarios como mejoras.
• Desplegamos su aplicación y etiquetamos la versión (git tag).

**Quinta historia - Como usuario quiero poder eliminar mis publicaciones para tener control de mis comentarios en la aplicación**

***Criterios de aceptación***

- El usuario puede ver el botón para eliminar posts únicamente en sus propios posts
- Antes de eliminar el post, se le pregunta al usuario si está seguro de querer eliminarlo a través de una ventana modal.
- Hay un botón para cancelar la eliminación de post
- Hay un botón para aceptar la eliminación del post
- El usuario puede eliminar sus propios posts

***Definición de terminado***

Pre-requisito: se debe poder postear y debe haber un usuario autenticado.
- Se identifica el usuario del post con el correo.
- Se identifica al usuario actual con el correo.
- Se hace la comparación para verificar que coinciden y que pueda ver los botones para eliminar.
General:
- Es una SPA.
- Debe ser responsive.
- Recibimos code review de al menos una compañera de otro equipo.
- Hicimos los test unitarios
- Testeamos manualmente buscando errores e imperfecciones simples.
- Hicimos pruebas de usabilidad e incorporamos el feedback de los usuarios como mejoras.
- Desplegamos su aplicación y etiquetamos la versión (git tag).
- Se elimina de firestore el documento del post.

**Sexta historia - Como usuario quiero editar las publicaciones que he hecho yo, para corregir texto en caso de requerirlo.**

***Criterios de aceptación***

- Sólo el usuario que ha hecho la publicación puede ver el ícono para editarla
- Al apretar el ícono, al usuario se el despliega una ventana modal.
- En la ventana modal viene incluido el value del post a editar
- Hay un botón para aceptar los cambios
- Hay un botón para cancelar los cambios
- El usuario puede editar el post y guardar esos cambios.

***Definición de terminado***

Pre-requisito: Tiene que haber un post. Tiene que haber un usuario autenticado
- Se identifica el usuario del post con el correo.
- Se identifica al usuario actual con el correo.
- Se hace la comparación para verificar que coinciden y que pueda ver los botones para editar.
- Se guarda el nuevo content del post y se reflejan los cambios de esa edición en el post y en firestore.
General:
- Es una SPA.
- Debe ser responsive.
- Recibimos code review de al menos una compañera de otro equipo.
- Hicimos los test unitarios
- Testeamos manualmente buscando errores e imperfecciones simples.
- Hicimos pruebas de usabilidad e incorporamos el feedback de los usuarios como mejoras.
 - Desplegamos su aplicación y etiquetamos la versión (git tag).
- El post queda editado tanto en la interfaz como en firestore (queda guardado en firestore el post actualizado).

## 5. Prototipos de baja fidelidad

Creamos los prototipos de baja fidelidad usando Figma. 

Aquí están algunas capturas de pantalla: 

![image](https://github.com/Natalia392/DEV007-social-network/assets/129551206/7b921117-903a-4fb5-82dd-7a55a2d91d51)
![image](https://github.com/Natalia392/DEV007-social-network/assets/129551206/d9ee06f8-6397-4cda-b850-2f2af72c5833)
![image](https://github.com/Natalia392/DEV007-social-network/assets/129551206/6968278b-96bc-4e65-bc3e-a10dc2da7930)

Para ver más detalles, este es el link: 
https://www.figma.com/file/xP0gQVyxLwAYcHtX3Pasnd/Prototipos-de-baja-fidelidad?type=design&mode=design&t=Kn1g00Bd4RCs27Xr-1 

## 6. Prototipos de alta fidelidad

Creamos los prototipos de alta fidelidad usando Figma. 

Aquí están algunas capturas de pantalla: 

![image](https://github.com/Natalia392/DEV007-social-network/assets/129551206/2074f0c5-4017-4262-80cc-7daada58d546)
![image](https://github.com/Natalia392/DEV007-social-network/assets/129551206/dfb90f19-5ebd-49ec-b347-5c77b5c612e1)
![image](https://github.com/Natalia392/DEV007-social-network/assets/129551206/dc9ae070-c206-43d9-a395-5a394296c407)

Para ver más detalles, este es el link: 
https://www.figma.com/file/9t8Sy3NkWdsfN4FECRuHFk/Prototipos-de-alta-fidelidad?type=design&mode=design&t=Kn1g00Bd4RCs27Xr-1

## 7. Test de usabilidad

Realizamos pruebas de usabilidad para evaluar la experiencia de los usuarios y recopilar comentarios y sugerencias que nos permitieran mejorar el diseño de nuestra aplicación. A través de estas pruebas, recibimos valiosos feedbacks tanto de los propios usuarios como de compañeras y coaches. Estos comentarios nos ayudaron a identificar áreas de mejora y realizar ajustes significativos en el diseño, especialmente en lo que respecta a los colores utilizados en nuestra interfaz.

Basándonos en los comentarios de los usuarios, notamos que los colores originales que habíamos seleccionado no eran completamente satisfactorios en términos de legibilidad, contraste y estética general. Algunos usuarios mencionaron que les resultaba difícil leer ciertos elementos de la interfaz debido a la falta de contraste entre el texto y el fondo. 

Después de considerar cuidadosamente todos estos aspectos, implementamos los cambios en el diseño de nuestra aplicación. Los nuevos colores seleccionados mejoraron significativamente la legibilidad de los textos, creando un mayor contraste y facilitando la lectura en general. Además, logramos una estética más atractiva y coherente en toda la interfaz.

Estamos agradecidas por el feedback recibido, ya que nos permitió realizar mejoras significativas en el diseño de nuestra aplicación. Valoramos la opinión de los usuarios su retroalimentación, ya que nos ayudaron a brindar una experiencia más agradable y satisfactoria a nuestros usuarios.

## 8. Tecnologías y Herramientas Utilizadas

En el desarrollo de este proyecto, se utilizaron diversas tecnologías y herramientas para implementar la funcionalidad y el diseño de la red social. A continuación, se enumeran las principales:

- HTML: Se utilizó HTML (HyperText Markup Language) para estructurar el contenido de la aplicación web y definir la semántica de los elementos.

- CSS: Se empleó CSS (Cascading Style Sheets) para aplicar estilos y dar formato a los elementos HTML, logrando así una interfaz visualmente atractiva.

- JavaScript: Se utilizó JavaScript como lenguaje de programación principal para implementar la lógica de la aplicación, manipular el DOM y gestionar las interacciones con el usuario.

- Firebase: Se hizo uso de Firebase, una plataforma de desarrollo de aplicaciones web de Google, para la implementación de funcionalidades clave, como la autenticación de usuarios y el almacenamiento de datos en Firestore.

- Firebase Auth: Esta herramienta de Firebase se utilizó para la autenticación de usuarios, permitiendo a los usuarios crear cuentas, iniciar sesión y mantener sesiones activas en la aplicación.

- Firebase Firestore: Se empleó Firestore, una base de datos en tiempo real de Firebase, para almacenar y recuperar datos de forma eficiente. Se utilizó para guardar la información de los usuarios, las publicaciones y los likes.

- HTML Semántico: Se hizo uso del HTML semántico para proporcionar una estructura clara y significativa al contenido de la aplicación, mejorando la accesibilidad y el SEO.

- Flexbox y CSS Grid Layout: Se utilizaron las técnicas de Flexbox y CSS Grid Layout para crear diseños flexibles y responsivos, que se adaptan a diferentes tamaños de pantalla y dispositivos.

- ES Modules: Se implementaron los módulos de ECMAScript (ES Modules) para modularizar y organizar el código de manera eficiente, facilitando el mantenimiento y la reutilización.

- ESLint: Se empleó ESLint como linter para mantener una buena calidad de código y seguir buenas prácticas de programación, asegurando la legibilidad y consistencia del código.

- Git y GitHub: Se utilizó Git como sistema de control de versiones para gestionar y controlar los cambios en el código. GitHub se utilizó como plataforma para alojar el repositorio del proyecto y facilitar la colaboración entre los miembros del equipo.

- Figma: Se utilizó Figma, una herramienta de diseño colaborativo, para crear los prototipos de baja fidelidad de la interfaz de la red social.

- Jest: Se utilizó Jest como framework de pruebas unitarias para garantizar la calidad del código y asegurar el correcto funcionamiento de las diferentes funcionalidades implementadas en la red social.

- Notion: Se utilizó Notion como una herramienta de organización y colaboración para el equipo de desarrollo. Notion es una plataforma todo en uno que permite crear documentos, bases de datos, tableros y mucho más. El equipo pudo utilizar Notion para gestionar tareas, crear y compartir documentación, hacer seguimiento de los avances y mantener un registro de las decisiones tomadas durante el desarrollo del proyecto.

- Trello: Trello también se utilizó como una herramienta de gestión de proyectos basada en tableros. Con Trello, el equipo pudo crear listas y tarjetas para representar las tareas pendientes, en progreso y completadas. Esto permitió tener una visualización clara del flujo de trabajo y facilitó la colaboración entre los miembros del equipo.

- Metodología Scrum: El equipo siguió la metodología Scrum para organizar y gestionar el desarrollo del proyecto. Se organizaron reuniones diarias de seguimiento para compartir actualizaciones, establecer objetivos y coordinar esfuerzos. También se realizaron sprint planning, sprint reviews y sprint retrospectives para iterar y mejorar continuamente el producto.

Estas son algunas de las principales tecnologías y herramientas utilizadas en la implementación de este proyecto. Cada una de ellas desempeñó un papel fundamental en la creación de la Red Social "La comunidad del libro".
