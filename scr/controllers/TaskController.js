function index(req, res) {
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM products', (err, tasks) => {
        if(err) {
          res.json(err);
        }

        res.render('tasks/index', { tasks });
      });
    });
  }
  
  function create(req, res) {
    res.render('tasks/create');
  }
  
  function store(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
      console.log([data])
      conn.query('INSERT INTO products SET ?', [data], (err, rows) => {

        res.redirect('/tasks');
      });
    });
  }
  
  function destroy(req, res) {
    const id = req.body.product_id;

    req.getConnection((err, conn) => {
      
      conn.query('DELETE FROM products WHERE product_id = ?', [id], (err, rows) => {

        res.redirect('/tasks');
      });
    })
  }
  
  function edit(req, res) {
    const id = req.params.product_id;
  
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM products WHERE product_id = ?', [id], (err, tasks) => {
        if(err) {
          res.json(err);
        }
        res.render('tasks/edit', { tasks });
      });
    });
  }
  
  function update(req, res) {
    const id = req.params.product_id;
    const data = req.body;

    req.getConnection((err, conn) => {

      conn.query('UPDATE products SET ? WHERE product_id = ?', [data, id], (err, rows) => {
        res.redirect('/tasks');
      });
    });
  }
  
  
  module.exports = {
    index: index,
    create: create,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update,
  }