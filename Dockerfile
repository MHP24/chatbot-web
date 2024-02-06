# Client build (static files)
FROM node:18.19-alpine3.17 AS client-build
WORKDIR /client/app
COPY . .
WORKDIR /client/app/client
RUN yarn
RUN yarn build

# Server building
FROM node:18.19-alpine3.17 AS server-deps
WORKDIR /app
COPY server/package.json ./
RUN yarn

FROM node:18.19-alpine3.17 AS server-build
WORKDIR /app
COPY server .
COPY --from=server-deps /app/node_modules ./node_modules
RUN yarn prisma:generate
RUN yarn build

FROM node:18.19-alpine3.17 AS runner
WORKDIR /app
COPY --from=server-build /app/node_modules ./node_modules
COPY --from=server-build /app/dist ./dist
COPY --from=client-build /client/app/server/static ./static
COPY server/package.json package.json
CMD ["yarn", "start:prod"]