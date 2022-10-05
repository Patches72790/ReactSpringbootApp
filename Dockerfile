FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y openjdk-17-jdk-headless \
                    maven \
                    software-properties-common \
                    build-essential \
                    curl

WORKDIR /app
ENV APP_ROOT=/app
COPY ./pom.xml /app/pom.xml

# install node and npm dependencies
#RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
#RUN apt-get -y install nodejs
ARG NODE_VERSION=12.22.0
ARG NODE_PACKAGE=node-v${NODE_VERSION}-linux-x64
ARG NODE_HOME=/opt/${NODE_PACKAGE}
ENV NODE_PATH ${NODE_HOME}/lib/node_modules
ENV PATH ${NODE_HOME}/bin:$PATH

RUN curl https://nodejs.org/dist/v$NODE_VERSION/$NODE_PACKAGE.tar.gz | tar -xzC /opt/

RUN node --version
RUN npm --version
COPY ./package.json /app/package.json
COPY ./webpack.config.js /app/webpack.config.js
COPY ./tsconfig.json /app/tsconfig.json
COPY ./src /app/src/
RUN --mount=type=cache,target=/root/npm/.cache NODE_ENV=development npm --yes -f install
RUN npm run build

CMD ["mvn", "clean", "spring-boot:run"]
