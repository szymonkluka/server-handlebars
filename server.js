const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const upload = multer();

const app = express();
app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));

app.post('/contact/send-message', upload.single('picture'), (req, res) => {

    const { author, sender, title, message } = req.body;

    if (author && sender && title && message) {
        res.render('contact', { isSent: true });
    }
    else {
        res.render('contact', { isError: true });
    }

});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/hello/:name', (req, res) => {
    res.render('hello');
});

app.get('/about', (req, res) => {
    res.render('about.hbs', { layout: 'black' });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/info', (req, res) => {
    res.render('info');
});

app.get('/history', (req, res) => {
    res.render('history');
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});