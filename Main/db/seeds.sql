USE company;

INSERT INTO  department (id, name)
VALUES (2, 'Sales');
INSERT INTO department (id, name)
VALUES (3, 'Accounting');
INSERT INTO department (id, name)
VALUES (4, 'Customer Service');
INSERT INTO department (id, name)
VALUES (5, 'Human Resources');
INSERT INTO  department (id, name)
VALUES (1, 'Management');




INSERT INTO job_role (id, title, salary, department_id)
VALUES (1, 'Managment', 130000, 1);
INSERT INTO job_role (id, title, salary, department_id)
VALUES (2, 'Sales', 65000, 2);
INSERT INTO job_role (id, title, salary, department_id)
VALUES (3, 'Accounting', 50000, 3);
INSERT INTO job_role (id, title, salary, department_id)
VALUES (4, 'Reception', 35000, 4);
INSERT INTO job_role (id, title, salary, department_id)
VALUES (5, 'Human Resources', 60000, 5);



INSERT INTO employee (id, first_name, last_name, role, manager_id)
VALUES (1, 'Michael', 'Scott', 'Managment', 01);
INSERT INTO employee (id, first_name, last_name, role, manager_id)
VALUES (2, 'Dwight', 'Schrute', 'Sales', 02);
INSERT INTO employee (id, first_name, last_name, role, manager_id)
VALUES (3, 'Kevin', 'Malone', 'Accounting', 03);        