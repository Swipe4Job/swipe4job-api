FROM node:20-alpine3.18 as build

WORKDIR /src
COPY . .
RUN npm cache clear --force
RUN npm i
RUN npx prisma generate
RUN npm run build


FROM node:20-alpine3.18
WORKDIR /app
COPY --from=build /src/node_modules ./node_modules
COPY --from=build /src/dist ./dist
#COPY --from=build /src/src/shared/infrastructure/views ./views
ENTRYPOINT ["node", "dist/main.js"]