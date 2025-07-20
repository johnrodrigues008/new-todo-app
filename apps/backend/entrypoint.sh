#!/bin/sh
set -e

echo "Esperando banco de dados ficar disponível..."
until nc -z -v -w30 db 5432
do
  echo "Banco não disponível, esperando 2 segundos..."
  sleep 2
done

echo "Banco disponível! Rodando migrations..."
npx prisma migrate deploy

echo "Iniciando aplicação Node.js..."
node dist/src/main.js
