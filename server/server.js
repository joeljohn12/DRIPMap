const path = require('path'),
cors = require('cors'),
express = require('express'),
mongoose = require('mongoose'),
morgan = require('morgan'),
bodyParser = require('body-parser'),
authRouter = require('./routes/auth'),
eventRouter = require('./routes/event'),
imageRouter = require('./routes/image');

mongoose.connect(process.env.DB_URI || require('./config/config').db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// Initialize app
const app = express();

// User cors to prevent resources from different origins being blocked
app.use(cors());

// Enable request logging for development debugging
app.use(morgan('dev'));

// Body parsing middleware
app.use(bodyParser.json());

// Router for authentication
app.use('/api/user', authRouter);

// Router for event CRUD operations
app.use('/api/event', eventRouter);

// Router for image creation and reading
app.use('/api/image', imageRouter);

// Serve any static files TODO: separate prod & dev environments
app.use(express.static(path.join(__dirname, '../../client/build')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

// Use env port or default
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server now running on port ${port}!`));
