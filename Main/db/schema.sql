DROP DATABASE IF EXISTS company;

CREATE DATABASE company;

USE company;

CREATE TABLE department (
    id INT,
    name VARCHAR(30) ,
    PRIMARY KEY (id)
);

CREATE TABLE job_role (
    id INT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role VARCHAR(30),
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY ( manager_id) REFERENCES employee(id)
);

