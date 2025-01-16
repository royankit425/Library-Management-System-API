# Library-Management-System-API-Distronix-Project---Backend-
Library Management System API (Distronix Project - Backend)

Database Schema link using DB Designer:
https://dbdesigner.page.link/3MCF7srCANBoM71UA

Docker pull image:
docker pull royankit425/distronix-mysql

Run the container from the image:
docker run --name distronix-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d royankit425/distronix-mysql

Incase the docker image does not work, follow these steps-
1. Open MySQL workbench and create a connection with user:root and password:my-secret-pw on port 3306:3306
2. Create a new database using the following command: create database LibraryManagementSystem;
3. Run queries from the .sql files inside the distronix-mysql folder.

This should setup the database with the required tables along with the data entries.
