import {db} from "../db.js";

export const getUsers = (_, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, data) => {
	if (err) {
	  return (res.json(err));
	}
	return (res.status(200).json(data));
  });
};

export const addUser = (req, res) => {
	const query = `INSERT INTO users(\`name\`, \`email\`, \`password\`) VALUES('${req.body.name}', '${req.body.email}', '${req.body.password}');`;

	db.query(query, (err) => {
		if (err) {
			return (res.json(err));
		}

		return (res.status(200).json("User added"));
	});
};

export const updateUser = (req, res) => {
	const query = "UPDATE users SET `name` = ?, `email` = ?, `password` = ? WHERE `id` = ?";

	const values = [
		req.body.name,
		req.body.email,
		req.body.password
	];

	db.query(query, [...values, req.params.id], (err) => {
		if (err) {
			return (res.json(err));
		}

		return (res.status(200).json("User updated"));
	});
};
//TODO: deleta todos as tasks do usuário e o usuario
export const deleteUser = (req, res) => {
	const queryTask = `DELETE FROM task WHERE \`owner_id\` = '${req.params.id}';` 

	const queryUsers = `DELETE FROM users WHERE \`id\` = '${req.params.id}';`;

	db.query(queryTask, (err) => {
		if (err) {
			return (res.json(err));
	}});

	db.query(queryUsers, (err) => {
		if (err) {
			return (res.json(err));
		}

		return (res.status(200).json("User deleted"));
	});
};