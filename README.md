# Project Name: Todo List

## Description
This project is a simple todo list application developed. It allows users to create, update, and delete tasks, helping them stay organized and productive.

## Features
- Create new tasks with a title and description
- Mark tasks as complete or incomplete
- Edit task details such as title and description
- Delete tasks that are no longer needed
- Filter tasks based on their completion status

## Installation
1. Clone the repository: `git clone https://github.com/todo-list.git`
2. Navigate to the project directory: `cd todo-list/`
3. Install front-end dependencies: `cd ./front-react/ && npm install && cd ..`
4. Install back-end dependencies: `cd ./back-node/ && npm install && cd ..`
4. Set MySQL: `CREATE TABLE `tasks_main`.`new_table` (
  `task_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `finished` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`task_id`));`


## Run
1. Open the first terminal and run: `npm run dev`;
2. Open the second terminal and run: `npm start`;


