FROM node:20-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Instalar sin correr postinstall para evitar generate prematuro
RUN npm install --ignore-scripts

# Copiar todo el código fuente
COPY . .

# Generar el cliente con el schema completo
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

RUN cp -r src/generated dist/src/generated

EXPOSE 3000

CMD ["npm", "run", "start"]
