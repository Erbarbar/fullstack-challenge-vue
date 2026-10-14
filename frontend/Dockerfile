FROM node:20-slim

WORKDIR /app

# We copy package files first to leverage Docker cache
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]