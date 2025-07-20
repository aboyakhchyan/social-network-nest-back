FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3344

CMD ["npm", "run", "start:dev"]


# Build stage
# FROM node:20-alpine AS builder

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm ci

# COPY . .
# RUN npm run build

# # Production stage
# FROM node:20-alpine

# WORKDIR /usr/src/app

# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/package*.json ./
# COPY --from=builder /usr/src/app/dist ./dist

# EXPOSE 3344

# CMD ["npm", "run", "start:prod"]