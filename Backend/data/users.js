const bcrypt = require('bcryptjs'); 

const User = [
	// Admin user
	{
		name: 'Admin',
		email: 'Admin@gmail.com',
		password: bcrypt.hashSync('admin1234', 10), //  10 = num rounds
		isAdmin: true,
	},

]
module.exports = User