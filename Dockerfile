FROM node:23-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install --force
COPY . .
RUN npm run build

FROM node:23-alpine AS production

WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]

FROM node:23-alpine AS development

WORKDIR /app
ENV NODE_ENV development

COPY package.json yarn.lock ./
RUN npm install --force
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
