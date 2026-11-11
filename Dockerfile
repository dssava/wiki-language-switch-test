# Official image with Node.js and all Playwright browsers; the tag must match the Playwright version in package.json.
FROM mcr.microsoft.com/playwright:v1.65.0-noble

WORKDIR /app

# Copy manifests first so the dependency layer is cached until they change.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
