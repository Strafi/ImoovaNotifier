FROM node:18-alpine

WORKDIR /app

COPY . /app

ENV LANG en_US.utf8

# Install project dependencies
RUN npm install && \
	npm run release

ENV NODE_ENV=production

EXPOSE 8443
CMD ["npm", "run", "start"]
