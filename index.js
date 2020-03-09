const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

let users = [];

server.post("/api/users", (req, res) => {
	const userInfo = req.body;

	if (!userInfo.name || !userInfo.bio) {
		res
			.status(400)
			.json({ errorMessage: "Please provide name and bio for the user." });
	} else if (userInfo.name && userInfo.bio) {
		userInfo.id = shortid.generate();
		users.push(userInfo);
		res.status(201).json(userInfo);
	} else {
		res.status(500).json({
			errorMessage: "There was an error while saving the user to the database"
		});
	}
});

server.get("/api/users", (req, res) => {
	if (!users) {
		res.status(500).json({
			errorMessage: "There was an error while saving the user to the database"
		});
	} else {
		res.status(200).json(users);
	}
});

server.get("/api/users/:id", (req, res) => {
	console.log("user id", req.params.id);

	const checkUser = users.find(user => user.id === req.params.id);

	if (!checkUser) {
		res
			.status(404)
			.json({ message: "The user with the specified ID does not exist." });
	} else if (checkUser) {
		res.status(200).json(checkUser);
	} else {
		res
			.status(500)
			.json({ errorMessage: "The user information could not be retrieved." });
	}
});

const PORT = 5001;
server.listen(PORT, () =>
	console.log(`\n ** API running on http://localhost:${PORT} **\n`)
);
