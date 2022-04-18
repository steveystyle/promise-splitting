const express = require('express');
const router = express.Router();
const controller = require('../controllers/guestbookControllers.js');

//added router to show both methods
router.get("/", controller.landing_page);
router.get("/ex2", controller.landing_page2);

router.get('/guestbook', controller.entries_list);

router.get('/peter', controller.peters_entries);

router.get('/new', controller.new_entries);
router.post('/new', controller.post_new_entry);

router.get('/posts/:author', controller.show_user_entries);

router.get('/json', controller.landing_page_json);  

router.use(function(req, res) {
        res.status(404);
        res.type('text/plain');
        res.send('404 Not found.');
    });

router.use(function(err, req, res, next) {
        res.status(500);
        res.type('text/plain');
        res.send('Internal Server Error.');
    });



module.exports = router;