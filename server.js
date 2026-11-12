import express from "express"
const app = express()
const PORT = 3000

//sprint-02: array de objetos
function criarMensagem(id,usuario,texto){
    return { id,usuario:usuario.trim(),texto:texto.trim()}
}

const mensagens = [
    criarMensagem(1,'Ana','Olá,Turma!'),
    criarMensagem(2,'Lucas','Servidor funciona TOP!'),
    criarMensagem(3,'Felipe','Vamos conversar com o mensageiro local'),
]

function listaMensagens(){
    return mensagens
}

function quantidadeDeMensagens(){
    return mensagens.length
}

function buscarMensagem(id){
    return mensagens.find(mensagens=> mensagens.id === id)
}

app.get("/", (req, res) => {
    res.send("Servidor rodando!🚀");
});
app.get('/status', (req, res) => {
    res.json({status: 'online', sprint: 2, total:quantidadeDeMensagens()});
});
app.get('/sobre', (req,res) => {
    res.send('Meu primeiro servidor Node.js com Express e ES Modules')
});

//sprint 2:
app.get('/mensagens',(req,res) =>{
    res.json(listaMensagens())
})
app.get('/total-mensagens',(req,res) =>{
    res.json({total:quantidadeDeMensagens()})
})
app.get('/mensagens/:id',(req,res) =>{
    const mensagem = buscarMensagem(Number(req.params.id))
    if(!mensagem)
        return res.status(404).json({erro:'mensagem não encontrada'})
})

function consultar(falhar = false) {

return new Promise((resolve, reject) => {

setTimeout(() => {
falhar
? reject(new Error('Falhou'))
: resolve(mensagens);
}, 1000);
});
}

app.get("/mensagens-then", (req, res) => { 
    consultar()
    .then(lista => res.json(lista))
    .catch(() => res.status(500).json({ erro: "Falha na consulta" })); 
});

app.get("/mensagens-async",async (req,res)=>{
    try {res.json(await buscarMensagem())}
catch (erro) {
    console.error("Erro simulado:",erro.message)
    res.status(500).json({erro:"Falha simulada na consulta"})
}
})

app.listen(PORT,() => {
    console.log(`Servidor em http://localhost:${PORT}`)
});
