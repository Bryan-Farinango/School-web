# School-web Tesis
## Centro de Desarrollo Infantil Descubrir 🚀
El proyecto School-web contiene el desarrollo de un sistema de administración de la guardería "Centro de Desarrollo infantil Descubrir" destinado a los usuarios finales **Padres de Familia** quienes llevaran el control de matrícula, notificaciones, calificaciones y transporte escolar de sus hijos. 
### **Video demostrativo**
* enlace_youtube
## Desarrollado por ✒️
* **Bryan Farinango** - [Bryan-Farinango](https://gist.github.com/Bryan-Farinango)
* **Josselyn Vela** - [JosselynVela](https://github.com/JosselynVela)
### Pre-requisitos 📋
El presento proyecto corresponde al front-end de la aplicación final desarrollada en Angular la cúal se comunica con el proyecto [School-web-back-end](https://github.com/Bryan-Farinango/School-web-back) desarrollado en laravel PHP 8 con base de datos no relacional **Mongo DB** y autenticación **Firebase** , es necesario cumplir con las siguientes instalaciones
* Node Js
* Firebase-tools
* Angular Cli 11.1
* Framework a elección

## Despliegue 📦

Primero es necesario clonar el repositorio en el ambiente local en nuestro caso lo realizamos en un servidor Ubuntu 20.0 hospedado en [Digital Ocean](https://www.digitalocean.com), el mismo contiene el proyecto back-end levantados mediante el servidor web Nginx.

![image](https://user-images.githubusercontent.com/38628690/131637054-836514cb-7b46-4a47-a85e-7d10bc107f66.png)

![image](https://user-images.githubusercontent.com/38628690/131636978-1d179ff0-9751-4493-86d3-a8a978a16693.png)

Configurar en el environment el **API RESTFULL** para la comunicación con el back-end
  ```
  apiUrl: 'http://157.245.116.195:8888/api'
```
A continuación es necesario ejecutar los siguientes comandos para poder instalar las dependecias necesarias  y levantar el proyecto angular de manera local.

```
npm install
```
```
ng serve
```
Si se utiliza un servidor host como en nuestro caso se debe generar el build del proyecto con el siguiente comando
```
ng build
```
## Funcinalidades Principales 📌
### Rol Administrador
Panel de aprobación de matrículas para el rol administrador
![image](https://user-images.githubusercontent.com/38628690/131638185-4917747b-79d6-46bf-9189-73b40d6d09d6.png)

Creación de Grados Escolares y asignaturas.
![image](https://user-images.githubusercontent.com/38628690/131638246-249ae85e-af41-4c94-a6a7-e1450f0bded4.png)

Añadir Usuarios con sus diferentes roles.
![image](https://user-images.githubusercontent.com/38628690/131638540-d4457bc1-12cb-4313-90b5-2493cbef429d.png)

Edición y control de usuarios y administradores.
![image](https://user-images.githubusercontent.com/38628690/131638664-357dcce3-8171-4de1-8a86-93ab5232db85.png)

Creación de rutas para transporte escolar
![image](https://user-images.githubusercontent.com/38628690/131638786-280cc56a-a3b0-48f7-9a41-33a5e3c92b75.png)

Añadir transportistas para posteriormente asignarlos a las rutas, ubicado en un proyecto de firebase diferente para la conexión a la APP móvil
![image](https://user-images.githubusercontent.com/38628690/131639166-c427415f-adc9-49d1-b3ae-f44275c6a56e.png)

Asignación de transportistas para las rutas de transporte escolar creadas anteriormente 
![image](https://user-images.githubusercontent.com/38628690/131639336-f2055f1c-683d-48ad-b943-34a393360eb9.png)

Edición y control de usuarios transportistas.
![image](https://user-images.githubusercontent.com/38628690/131639432-5e4bf914-6d0c-4d0c-ac0c-52dfa5c66b44.png)

### Rol Profesor
Emisión de comunicados a padres de Familia de los alumnos inscritos en una materia
![2021-08-28 23_40_04-School app - Opera](https://user-images.githubusercontent.com/38628690/131642312-a72bc1f7-2713-4a00-be68-64498d8f050a.png)

Creación y control del registro de Calificaciones de estudiantes
![image](https://user-images.githubusercontent.com/38628690/131642488-460b8d7e-9f45-4c95-b947-8b2af3f77f2e.png)

![2021-08-28 23_45_21-NVIDIA GeForce Overlay](https://user-images.githubusercontent.com/38628690/131642609-cf065498-8db7-4ccc-a0e3-94ba11862084.png)

### Padre de Familia
Solicitud de matrícula con formulario de datos para un grado.
![2021-08-28 23_31_05-NVIDIA GeForce Overlay](https://user-images.githubusercontent.com/38628690/131642775-93abc8b4-f036-43e5-a2d4-aee4f5ddca8b.png)

Sección de notificaciones a padres de familia emitidas por parte de los profesores de sus hijos.
![image](https://user-images.githubusercontent.com/38628690/131642863-c076f569-1345-4a4c-9e0e-927a760be3ae.png)

Visualización de calificaciones de sus hijos por materia.
![image](https://user-images.githubusercontent.com/38628690/131642946-c687059d-e272-437a-a79c-1b9926b27783.png)

Inscripción en transporte escolar conectado con la autenticación de firebase para conexión de datos registrados en la Web y mongo DB
![image](https://user-images.githubusercontent.com/38628690/131643052-fe19c56e-fea6-49c9-812b-b928541c1428.png)

Inscripción en transporte escolar habilitado una vez que el padre de familia se registre en la APP móvil
![image](https://user-images.githubusercontent.com/38628690/131643135-87bfcd87-ada5-4108-95f9-1c3ff57ccbfe.png)

