const guestbookDAO = require('../models/guestbookModel');
const db = new guestbookDAO();
 
db.init();

exports.entries_list = function(req, res) {
    res.send('<h1>Not yet implemented: show a list of guest book entries.</h1>');
    db.getAllEntries();
}
exports.landing_page = function(req, res) {
        db.getAllEntries()
            .then((list) => {
                res.render('entries', {
                    'title': 'Guest Book',
                    'entries': list
                });
                console.log('promise resolved');
            })
            .catch((err) => {
                console.log('promise rejected', err);
            })
}
exports.landing_page2 = function (req, res) {
    Promise.all([
        db.getEntriesByCourse("starter"),
        db.getEntriesByCourse("main")
    ])
        .then(([entries1, entries2]) => {
            res.render('entries2', {
                'title': 'Guest Book',
                'entries1': entries1,
                'entries2': entries2,
            });

        }).catch((err) => {
            console.log('error handling author posts', err);
        });
}     