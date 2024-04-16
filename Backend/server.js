const path = require('path');
const express = require('express');
const { json } = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const connectDB = require('../Backend/config/db.js');
const userRoutes = require('../Backend/api/routes/userRoute.js');
const agentRoute = require('../Backend/api/routes/AgentRoute.js');
const sendEmailRoutes = require('../Backend/api/routes/AgentRoute.js');
const sendEmailByIdRoutes = require('../Backend/api/routes/AgentRoute.js'); 
const signInAgentRoute = require('../Backend/api/routes/AgentRoute.js'); 
const ClientRoutes = require("../Backend/api/routes/clientRoutes.js"); 
const SignInClientRoutes = require('../Backend/api/routes/clientRoutes.js'); 
const concatUserAndContratRoutes = require("../Backend/api/routes/clientRoutes.js"); 
const getAllConcatenationsRoutes= require("../Backend/api/routes/clientRoutes.js"); 
const contratRoute = require("./api/routes/contratRoute.js"); 
const sinistreRoute = require("./api/routes/SinistreRoute.js");
const colors = require('colors'); 
dotenv.config();

// Invoke connectDB
connectDB();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Mount routes to respective imports
app.use('/api/users', userRoutes);

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// test get route
app.get('/', (req, res) => {
    res.send('API is running...');
});
//_______________________Agent_____________________________________
// Utilisation de la route des agents
app.use('/api/agents', agentRoute);
// Associer les routes d'envoi d'email à votre application
app.use('/api/emailAgent', sendEmailRoutes);
app.use('/api/sendEmailById',sendEmailByIdRoutes); 
app.use('/api/signIn',signInAgentRoute); 
//____________________________Client______________________________
app.use('/api/client', ClientRoutes); 
app.use('/api/SignInClient',SignInClientRoutes); 
//_________________________________________________Contrat___________________________________________________________//
app.use('/api/concatenationClientContrat', concatUserAndContratRoutes); 
app.use('/api/getAllConcatenationContrat',getAllConcatenationsRoutes ); 
app.use('/api/contrat', contratRoute); 
//_____________________________________________Sinistre______________________________________________________________//
app.use('/api/sinistres', sinistreRoute); 

// Error middleware for 404
app.use(notFound);

// Error handler middleware
app.use(errorHandler);

// Set port number
const PORT = process.env.PORT || 3000;

app.listen(
	PORT,
	console.log(
		colors.yellow.bold(`Server running on port ${PORT}`)
	)
);
