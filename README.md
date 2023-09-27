# Rinha de Compiler

Interpretador em JavaScript para [Rinha de Compiler](https://github.com/aripiprazole/rinha-de-compiler)

### COMO RODAR

**Primeiramente Clone o Repositório**
```
git clone https://github.com/MartinGHaas/interpretador-rinha.git
```

#### Utilizando Docker
```
docker build -t rinha-mgh
docker run -v ./source.rinha.json:/var/rinha/source.rinha.json --memory=2gb --cpus=2 rinha-mgh
```
#### MacOS
```
brew install node
node execute.js
```

#### Linux
```
sudo apt update
sudo apt install nodejs npm
node execute.js
```

----

### OBSERVAÇÕES

* Caso você use uma função com nome de 'fib' ou 'fibonacci' ele vai fazer um fib! Eu tentei fazer algo melhor mas eu não daria tempo de terminar :/
* Foi legal fazer meu primeiro interpretador :)
