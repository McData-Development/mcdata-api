FROM 19.2-alpine as build
FROM nginx:alpine

# Set working directory to /build inside the container
WORKDIR /build
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN npm ci --silent
COPY . ./

# Save build folder and run nginx server
EXPOSE 80
COPY --from=build /build/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
