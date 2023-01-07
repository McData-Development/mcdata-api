FROM node:19.4-alpine as build

# Add required packages
RUN apk add --no-cache openssl1.1-compat-dev

# Set working directory to /build inside the container
WORKDIR /build
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --silent; \
  else echo "Lockfile not found." && exit 1; \
  fi
COPY . ./

# Generating prisma scheme's
RUN npx prisma generate

# Build application
RUN yarn run build

EXPOSE 3020

ENTRYPOINT ["yarn", "run", "start:build"]
