const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


//connect to a database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '071318',
        database: 'company'
    },
    console.log(`Connected to the company database.`)
);
db.connect(function(err){
    if(err){
        console.log('error', err)
        return
    }
    console.log('connecterd to database')
})
//Query the database
// db.query('SELECT * FROM department', function (err, results) {
//     console.log(results);
// });



//add inquirer prompts

const app = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'first',
            message: 'What would you like to view?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit Program']
        }
    )
    .then(({first}) => {
        switch (first) {
            case 'View all departments':
                viewDepartments();
                break;

            case 'View all roles':
                    viewRoles();
                    break;

            case 'View all employees':
                    viewEmployees();
                    break;

            case 'Add a department':
                addDepartment();
                break;

            case 'Add a role':
                addRole();
                break;

            case 'Add an employee':
                addEmployee();
                break;

            case 'Update employee role':
                updateEmployeeRole();
                break;
                
        }
    
    })
}
app();

    const viewDepartments = () => {
        console.log(`Currently viewing all departments`)
        db.query('SELECT * FROM department', function(err, results) {
            console.table('\n', results, '\n');
            app()
        })
    
    }

    const viewRoles = () => {
        console.log(`Currently viewing all roles`)
        db.query('SELECT * FROM job_role', function(err, results) {
            console.table(results);
           app();
        });
    }

    const viewEmployees = () => {
        console.log(`Currently viewing all employees`)
        db.query(`SELECT * FROM employee`, function(err, results) {
            console.table(results);
            app();
        })
    }

    const addDepartment = () => {
        inquirer.prompt([
            {
                name: 'idDept',
                type: 'input',
                message: 'What department ID will you be adding?'
            },
            {
                name: 'nameDept',
                type: 'input',
                message: 'What is the name of the department?'
            }
        ]).then((response) => {
            db.query(`INSERT INTO department SET ?`,
            {
                id: response.idDept,
                name: response.nameDept,

            },
            (err, res) => {
                if (err) throw err;
                console.log(`\n ${response.nameDept} has been added to the database! \n`);
                app();
            })
        })
    }

    const addRole = () => {
       db.query(`SELECT * FROM department`, (err, res) => {
            if (err) throw err;
            let departments = res.map(department => ({name: department.name, value: department.id}));
        inquirer.prompt([
            {
                name: 'id',
                type: 'input',
                message: 'What is the ID of this role?'
            },
            {
                name: 'title',
                type: 'input',
                message: 'What is the employee title?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role?'
            },
            {
                name: 'depName',
                type: 'rawlist',
                message: 'What is the department do you want to add this role to?',
                choices: departments
            },
        ]).then((response) => {
            db.query(`INSERT INTO job_role SET ?`,
            {
                id: response.id,
                title: response.title,
                salary: response.salary,
                department_id: response.depName,
            },
            (err, res) =>{
                if (err) throw err;
                console.log(`\n ${response.title} was added to the database! \n`);
                app();
            })
        })
        
    })
};

    const addEmployee = () => {
        db.query(`SELECT * FROM job_role`, (err, res) => {
            if (err) throw err;
            let roles = res.map(job_role => ({name: job_role.title, value: job_role.title})); //Changed the value from id to role
            db.query(`SELECT * FROM employee`, (err, res) => {
                if (err) throw err;
                let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
                inquirer.prompt([
                    {
                        name: 'empID',
                        type: 'input',
                        message: 'Add an ID for the table',
                    },
                    {
                        name: 'firstName',
                        type: 'input',
                        message: 'Enter the employee first name.'
                    },
                    {
                        name: 'lastName',
                        type: 'input',
                        message: 'Enter the employee last name.'
                    },
                    {
                        name: 'role',
                        type: 'rawlist',
                        message: 'Please select the role for this employee',
                        choices: roles
                    },
                    {
                        name: 'manager',
                        type: 'rawlist',
                        message: 'Who is the manager for the employee?',
                        choices: employees
                    }
                ]).then((response) => {
                    db.query(`INSERT INTO employee SET ?`,
                    {
                        id: response.empID,
                        first_name: response.firstName,
                        last_name: response.lastName,
                        role: response.role,
                        manager_id: response.manager,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(`\n ${response.firstName} ${response.lastName} was added to the database!`);
                            app();
                    })
                    // db.query(`INSERT INTO job_role SET ?`,
                    // {
                    //     department_id: response.depID,
                    // },
                    // (err, res) => {
                    //     if (err) throw err;
                    //     console.log(`\n ${response.firstName} ${response.lastName} was added to the database!`);
                    //     app();
                    
                    // })
                })
            })
        })
    }

    const updateEmployeeRole = () => {
        //Time to add code for update role
    }








    // If I pick view all departments I am presented with a table with department names and ids   **DONE

    // If I view all roles it shows job title role id the department the role belongs to and the salary for the role **DONE

    // If I view all employees it shows a table showing employee data like ids, first names, last names, job titles, department salaries, and managers **DONE

    // WHEN I CHOOSE  ADD DEPARTMENT youre prompted to enter a name for the department and it gets added to the database **DONE

    //  ADD A ROLE  you enter the name , salary, and department for the role and the role is added the database **DONE

    // ADD an employee youre prompted to enter the employee first name, last name, role, and manager and is added the database **DONE

    //UPDATE an employee role youre prompted to select an employee to update and their new role and this information is updated to the database
    
