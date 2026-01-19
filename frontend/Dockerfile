FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_URL=http://team7.cbit.site:4007
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

EXPOSE 8007

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8007"]
