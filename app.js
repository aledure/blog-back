const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const blogRoutes = require('./src/routes/BlogRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());


app.use('/api/posts', blogRoutes);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
