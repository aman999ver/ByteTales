<<<<<<< HEAD
# Stage 1: Build
FROM node:18-alpine as build
=======
FROM node:20-alpine
>>>>>>> 2935e4d18f247f9f859bef186661ce872c7f7fef

WORKDIR /app

COPY package*.json ./
<<<<<<< HEAD
RUN npm install

COPY . .

# Accept build argument for API URL
ARG VITE_API_URL
=======

RUN npm ci

COPY . .

ARG VITE_API_URL=http://team7.cbit.site:4007
>>>>>>> 2935e4d18f247f9f859bef186661ce872c7f7fef
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

<<<<<<< HEAD
# Stage 2: Serve
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8007

CMD ["nginx", "-g", "daemon off;"]
=======
EXPOSE 8007

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8007"]
>>>>>>> 2935e4d18f247f9f859bef186661ce872c7f7fef
