const nedb = require('nedb');
class GuestBook {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    //a function to seed the database
    init() {
        this.db.insert({
            subject: 'I liked the exhibition',
            contents: 'nice',
            published: '2020-02-16',
            author: 'Peter',
            starter: true
        });
        this.db.insert({
            subject: 'I liked the exhibition sdfhsfh',
            contents: 'nicesshjsfjshgsgj',
            published: '2020-02-15',
            author: 'Peter',
            starter: true,
            course: "lunch"
        });
        //for later debugging
        console.log('db entry Peter inserted');

        this.db.insert({
            subject: "Didn't like it",
            contents: 'A really terrible style!',
            published: '2020-02-18',
            author: 'Ann',
            main: true

        });
        //for later debugging
        console.log('db entry Ann inserted');
    }
    //a function to return all entries from the database
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({}, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }    
    getEntriesByCourse(courseName) {
        return new Promise((resolve, reject) => {
            this.db.find({[courseName]:true }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getEntriesByCourse returns: ', entries);
                }
            })
        })
    }


}

module.exports = GuestBook;