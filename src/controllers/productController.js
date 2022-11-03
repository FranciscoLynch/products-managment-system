const mysql = require('mysql')

// Connection 
const connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// View products
exports.viewAll = (_req, res) => {

    connection.query('select * from products', (err, rows) => {

        if (!err) res.render('home', { rows })
        else console.log(err);
    })

}

exports.view = (req, res) => {

    connection.query('select * from products where id = ?', [req.params.id], (err, rows) => {

        if (!err) res.render('view-products', { rows })
        else console.log(err);
    })

}

exports.find = (req, res) => {

    const searchTerm = req.body.search;

    connection.query('select * from products where brand like ? or indumentaryType like ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {

        if (!err) res.render('home', { rows });
        else console.log(err);
    })

}

exports.form = (_req, res) => {
    res.render('add-product');
}

exports.create = (req, res) => {

    const { brand, indumentaryType, destination, price, stock } = req.body;

    connection.query('INSERT INTO products SET brand = ?, indumentaryType = ?, destination = ?, price = ?, stock = ?', [brand, indumentaryType, destination, price, stock], (err, _rows) => {

        if (!err) res.render('add-product', { alert: 'Product added successfully' });
        else console.log(err);

    })

}

exports.editProduct = (req, res) => {

    connection.query('SELECT * FROM products  WHERE id = ?', [req.params.id], (err, rows) => {

        if (!err) res.render('edit-product', { rows })
        else console.log(err);

    })

}

exports.updateProduct = (req, res) => {

    const { brand, indumentaryType, destination, price, stock } = req.body;

    try {

        connection.query('UPDATE products SET brand = ?, indumentaryType = ?, destination = ?, price = ?, stock = ? WHERE id = ?', [brand, indumentaryType, destination, price, stock, req.params.id], (_err, _rows) => {

            connection.query('SELECT * FROM products  WHERE id = ?', [req.params.id], (_err, rows) => {

                res.render('edit-product', { rows, alert: 'Product edited successfully' })

            })
        })
    } catch (err) {
        console.log(err);
    }

}

exports.remove = (req, res) => {

    connection.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, _rows) => {
        if (!err) res.redirect('/')
        else console.log(err)
    })

}