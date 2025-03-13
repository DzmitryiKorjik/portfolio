const express = require('express');
const path = require('path');
const app = express();

// ...existing code...

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', `${req.params.page}.html`));
});

// ...existing code...

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
