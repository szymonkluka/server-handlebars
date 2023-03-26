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

    const { author, sender, title, message, picture } = req.body;

    if (author && sender && title && message && picture) {
        res.render('contact', { isSent: true, pictureName: picture });
    }
    else {
        res.render('contact', { isError: true });
    }

});

app.use((req, res, next) => {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/views/${name}`));
    };
    next();
});

app.get(['/', '/home'], (req, res) => {
    res.render('index');
});

app.use(('/user/'), (req, res) => {
    res.status(403).render(`forbidden`);
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', { layout: 'blue' });
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
    res.status(404).render('notfound');
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});