import express from "express"; // Importa o framework Express para construir aplicações web
import multer from "multer"; // Importa o Multer para lidar com requisições multipart/form-data (envio de arquivos)
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controller/postsController.js"; // Importa as funções para lidar com posts (listarPosts, postarNovoPost) e upload de imagens (uploadImagem) do arquivo postsController.js
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
}

// Configura o Multer para armazenar arquivos em disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // Função para especificar o diretório de destino para os arquivos enviados
    cb(null, 'uploads/'); // Define o diretório de destino como 'uploads/' (cria se não existir)
  },
  filename: function (req, file, cb) { // Função para personalizar o nome do arquivo enviado
    cb(null, file.originalname); // Utiliza o nome original do arquivo por simplicidade (considere potenciais conflitos)
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ storage }); // Utiliza o armazenamento configurado para o Multer

// Define as rotas da aplicação
const routes = (app) => {
  app.use(express.json()); // Analisa dados JSON recebidos no corpo da requisição
  app.use(cors(corsOptions));
  
  // Rota para obter uma lista de posts (lida pela função listarPosts)
  app.get("/posts", listarPosts);

  // Rota para criar um novo post (lida pela função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota para enviar uma imagem (lida pela função uploadImagem)
  // Utiliza o middleware upload.single('imagem') para lidar com um único arquivo chamado 'imagem'
  app.post("/upload", upload.single("imagem"), uploadImagem);
  app.put("/upload/:id", atualizarNovoPost);
};

export default routes; // Exporta a função routes para ser usada na aplicação principal