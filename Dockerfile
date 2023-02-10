FROM node:16-bullseye-slim AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf --legacy-peer-deps

RUN npm install --only=development --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:16-bullseye-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm config get proxy
RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm config set registry http://registry.npmjs.org/

RUN npm cache clean --force && rm -rf node_modules && npm install --legacy-peer-deps
# RUN npm install --only=production
# RUN apt-get update 
# RUN apt-get install -y apt-utils  
# RUN apt-get install -y curl  
# RUN apt-get install -y \
#     fonts-liberation \
#     libasound2 \
#     libatk-bridge2.0-0 \
#     libatk1.0-0 \
#     libatspi2.0-0 \
#     libcups2 \
#     libdbus-1-3 \
#     libdrm2 \
#     libgbm1 \
#     libgtk-3-0 \
#    libgtk-4-1 \
    # libnspr4 \
    # libnss3 \
    # libwayland-client0 \
    # libxcomposite1 \
    # libxdamage1 \
    # libxfixes3 \
    # libxkbcommon0 \
    # libxrandr2 \
    # xdg-utils \
    # libu2f-udev \
    # libvulkan1
 # Chrome instalation 
# RUN curl -LO  https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
# RUN apt-get install -y ./google-chrome-stable_current_amd64.deb
# RUN rm google-chrome-stable_current_amd64.deb
# Check chrome version
# RUN echo "Chrome: " && google-chrome --version
WORKDIR /usr/src/app
COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]