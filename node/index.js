const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'database',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const sqlInsert = `INSERT INTO people(name) VALUES('Cristiano')`
const sqlSelect = `SELECT name FROM people`

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config)
    connection.query(sqlInsert)
    connection.query(sqlSelect, function(error, rows, fields){
        if (error) throw error;
        
        var data = '';
        for (var i=1;i<rows.length;i++) {
            data+= '<li>'+rows[i].name+'</li>';
        }
        res.send('<h1>Full Cycle Rocks!</h1><h3>Lista de nomes:</h3><ul>'+data+'</ul>')
    })
    connection.end()    
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})