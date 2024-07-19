import {db} from "../db.js";

export const getTasks = (_, res) => {
  const query = "SELECT * FROM main_table";

  db.query(query, (err, data) => {
	if (err) {
	  return (res.json(err));
	}
	return (res.status(200).json(data));
  });
};

export const addTask = (req, res) => {
	const query = `INSERT INTO main_table(\`title\`, \`description\`, \`finished\`) VALUES('${req.body.title}', '${req.body.description}', '${req.body.finished}');`;

	db.query(query, (err) => {
		if (err) {
			return (res.json(err));
		}

		return (res.status(200).json("User added"));
	});
};

export const updateTask = (req, res) => {
	const query = "UPDATE main_table SET `title` = ?, `description` = ?, `finished` = ? WHERE `task_id` = ?";

	const values = [
		req.body.title,
		req.body.description,
		req.body.finished
	];

	db.query(query, [...values, req.params.id], (err) => {
		if (err) {
			return (res.json(err));
		}

		return (res.status(200).json("User updated"));
	});
};
//TODO: deleta todos as tasks do usuário e o usuario
export const deleteTask = (req, res) => {
	const queryTask = `DELETE FROM main_table WHERE \`task_id\` = '${req.params.id}';` ;

	db.query(queryTask, (err) => {
		if (err) {
			return (res.json(err));
		}

			return (res.status(200).json("User deleted"));
	});
};