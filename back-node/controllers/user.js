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
	const query = "INSERT INTO users('name', 'email', 'password') VALUES(?)";

	const values = [
		req.body.name,
		req.body.email,
		req.body.password
	];

	db.query(query, [values], (err) => {
		if (err) {
			return (res.json(err));
		}

		return (res.status(200).json("User added"));
	});
};

export const updateUser = (req, res) => {
	const query = "UPDATE users SET 'name' = ?, 'email' = ?, 'password' = ? WHERE 'id' = ?";

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

export const deleteUser = (req, res) => {
	const query = "DELETE FROM users WHERE 'id' = ?";

	db.query(query, [req.params.id], (err) => {
		if (err) {
			return (res.json(err));
		}

		return (res.status(200).json("User deleted"));
	});
};