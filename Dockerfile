FROM node:19.4-alpine as build

ARG fresh

# Add required packages
RUN apk add --no-cache openssl1.1-compat-dev

# Set working directory to /build inside the container
WORKDIR /build
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy directory
COPY . ./


# Generating prisma scheme's
RUN npx prisma generate

# Build application
RUN yarn run build

EXPOSE 3020

# Execute application
ENTRYPOINT ["yarn", "run", "start:build"]
