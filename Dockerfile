# Imagem Base
FROM node:latest

# Cria a pasta app
WORKDIR /app

# Instala as dependencias
COPY package*.json ./
RUN npm install

# Copia os arquivos necessários
COPY compiler.js ./
COPY execute.js ./
COPY interpreter.js ./
# TODO: Chamar a AST

# Executa o código
CMD [ "node", "execute.js" ]
