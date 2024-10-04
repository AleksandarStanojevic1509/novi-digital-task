# Stage 1: Build
FROM node:21-alpine AS build

WORKDIR /usr/src/app
COPY package*.json ./
# Install all dependencies (including devDependencies)
RUN npm install
COPY tsconfig.json ./
COPY src ./src 
# Install TypeScript globally and compile the code
RUN npm install -g typescript && tsc

# Stage 2: Production
FROM node:21-alpine AS production

WORKDIR /usr/src/app
# Copy only the compiled output and necessary files
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./
# Only install production dependencies
RUN npm install --only=production
EXPOSE 3000
CMD ["npm", "run", "start"]
