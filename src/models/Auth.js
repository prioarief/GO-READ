const connection = require('../config/database');
module.exports = {
	getAll: (show, page) => {
		return new Promise((resolve, reject) => {
			connection.query(`SELECT * FROM authors`, (error, result) => {
				if (error) {
					reject(error);
				}
				resolve(result);
			});
		});
	},

	login: (email) => {
		return new Promise((resolve, reject) => {
			connection.query(
				'SELECT u.id, u.email, u.password, u.name, u.is_active, u.created_at, r.role FROM users u JOIN roles r ON r.id = u.role WHERE u.email = ? ',
				email,
				(error, result) => {
					if (error) {
						reject(error);
					}
					resolve(result);
				}
			);
		});
	},

	register: (setData) => {
		return new Promise((resolve, reject) => {
			connection.query('INSERT INTO users SET ?', setData, (error, result) => {
				if (error) {
					reject(error);
				}

				if (result) {
					const newData = {
						id: result.insertId,
						...setData,
					};
					resolve(newData);
				}
			});
		});
	},

	editUsers: (setData, id) => {
		return new Promise((resolve, reject) => {
			connection.query(
				'UPDATE users SET ? WHERE id=?',
				[setData, id],
				(error, result) => {
					if (error) {
						reject(error);
					}
					resolve(result);
				}
			);
		});
	},

	deleteUser: (id) => {
		return new Promise((resolve, reject) => {
			connection.query('DELETE FROM users WHERE id=?', id, (error, result) => {
				if (error) {
					reject(error);
				}
				resolve(result);
			});
		});
	},

	detailUser: (id) => {
		return new Promise((resolve, reject) => {
			connection.query(
				'SELECT u.*, r.role FROM users u JOIN roles r ON r.id = u.role WHERE u.id = ? ',
				id,
				(error, result) => {
					if (error) {
						reject(error);
					}
					resolve(result);
				}
			);
		});
	},

	insertCode: (data) => {
		return new Promise((resolve, reject) => {
			connection.query(
				'INSERT INTO verification SET ? ',
				data,
				(error, result) => {
					if (error) {
						reject(error);
					}
					resolve(result);
				}
			);
		});
	},

	getCode: (email) => {
		return new Promise((resolve, reject) => {
			connection.query(
				'SELECT * FROM verification WHERE email = ? ',
				email,
				(error, result) => {
					if (error) {
						reject(error);
					}
					resolve(result);
				}
			);
		});
	},

	deleteCode: (email) => {
		return new Promise((resolve, reject) => {
			connection.query(
				'DELETE FROM verification WHERE email = ? ',
				email,
				(error, result) => {
					if (error) {
						reject(error);
					}
					resolve(result);
				}
			);
		});
	},
};
