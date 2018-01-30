ARG NODE_VERSION
FROM node:${NODE_VERSION}-alpine
LABEL maintainer="Tine Kondo <kondotine@gmail.com>"

WORKDIR /usr/app

RUN \
    # Update apk repositories
    echo "http://dl-2.alpinelinux.org/alpine/edge/main" > /etc/apk/repositories && \
    echo "http://dl-2.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories && \
    echo "http://dl-2.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \    
    # Install chromium
    apk -U --no-cache --allow-untrusted add  \
        chromium \
        xvfb && \
    # Minimize size
    rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/

RUN yarn global add --silent gulp-cli yo @angular/cli && yarn cache clean
RUN sed -i -e '/rootCheck/d' "/usr/local/share/.config/yarn/global/node_modules/yo/lib/cli.js"

COPY integrations/ integrations/
COPY package.json generator-ngx-library/
COPY app/ generator-ngx-library/app/

RUN chmod +x integrations/build.sh

WORKDIR generator-ngx-library/
RUN npm link

WORKDIR ..

ENTRYPOINT  ["./integrations/build.sh"]
