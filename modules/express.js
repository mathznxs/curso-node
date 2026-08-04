const express = require("express")
const UserModel = require("../src/models/user.model")

const app = express();
app.use(express.json())

// Exibindo usuário
app.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find({})
        res.status(200).json(users) 
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// Exibindo usuário por ID
app.get("/users/:id", async (req, res) => {
    try {   
        const id = req.params.id;
        const user = await UserModel.findById(id)

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

// Criando usuário 
app.post("/users", async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// Atualizando dados do usuário
app.patch("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const users = await UserModel.findByIdAndUpdate(id, req.body, {new: true});

        return res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

const port = 8080;
app.listen(port, () => console.log(`Rodando com Express na porta ${port}`))