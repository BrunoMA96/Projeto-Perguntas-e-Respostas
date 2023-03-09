const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')
const app = express()

connection
    .authenticate()
    .then(() => {console.log('Conectado com o banco de dados...')})
    .catch((msgErro) => {console.log(msgErro)})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', (req, res) => {
    Pergunta.findAll({raw: true, order: [
        ['id', 'DESC']
    ]}).then(todasPerguntas => {
        res.render('index', {listaPerguntas: todasPerguntas})
    })
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post("/salvarpergunta", (req, res) => {
    let tituloWeb = req.body.titulo
    let descricaoWeb = req.body.descricao
    Pergunta.create({
        titulo: tituloWeb,
        descricao: descricaoWeb
    }).then(() => {
        res.redirect('/')
    })
})

app.get('/pergunta/:id', (req, res) => {
    const id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined) {
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then((respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                })
            }))
        } else {
            res.redirect('/')
        }
    })
})

app.post('/responder', (req, res) => {
    const corpoResp = req.body.corpo
    const perguntaRespId = req.body.pergunta
    Resposta.create({
        corpo: corpoResp,
        perguntaId: perguntaRespId
    }).then(() => {
        res.redirect(`/pergunta/${perguntaRespId}`)
    })
})

app.listen(8080, () => {
    console.log("App rodando...")
})