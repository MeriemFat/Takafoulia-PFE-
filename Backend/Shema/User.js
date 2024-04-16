const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create User Schema
const userSchema = mongoose.Schema(
	{  
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		codeAgent:{ 
			type:String , 
			required:true, 
		},
		role: {
			type: String,
			enum: ['Agent', 'Client'] // Définir le rôle par défaut comme Client
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		agentList: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ListAgent'
		}, 
		clientList: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'ListeClient'
		}
	},
	{
		timestamps: true,
	}
);

// To match enteredPassword with hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// To encrypt password upon registration
userSchema.pre('save', async function (next) {
	// First check if password is modified
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
