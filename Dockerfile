# Minimal multi-stage Node.js Dockerfile — adapt entrypoint and build steps to your project.
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --production

FROM node:18-alpine AS build
WORKDIR /app
COPY . .
# If you have a build step (vite/next/etc), run it here:
# RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app ./
EXPOSE 8080
# Adjust entrypoint to your server start script or static server.
CMD ["node", "server/index.js"]