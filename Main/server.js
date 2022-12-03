const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const fs = require('fs');

//connect to a database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
      
    }
);

//query the database

//add inquirer prompts
inquirer
    .prompt([
        {
            type: 'list',
            name: 'first',
            message: 'What would you like to view?',
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
        }
    ])




