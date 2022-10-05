FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y openjdk-17-jdk-headless \
                    maven \
                    software-properties-common \
                    build-essential \
                    curl

WORKDIR /app
ENV APP_ROOT=/app
ENV APP_NAME="characterviewerapp"

# Add java dependency file
COPY ./pom.xml /app/pom.xml

# install node and npm dependencies
ARG NODE_VERSION=12.22.0
ARG NODE_PACKAGE=node-v${NODE_VERSION}-linux-x64
ARG NODE_HOME=/opt/${NODE_PACKAGE}
ENV NODE_PATH ${NODE_HOME}/lib/node_modules
ENV PATH ${NODE_HOME}/bin:$PATH

RUN curl https://nodejs.org/dist/v$NODE_VERSION/$NODE_PACKAGE.tar.gz | tar -xzC /opt/
RUN node --version
RUN npm --version

# install npm deps and build
COPY ./package.json /app/package.json
COPY ./webpack.config.js /app/webpack.config.js
COPY ./tsconfig.json /app/tsconfig.json
COPY ./src /app/src/
RUN --mount=type=cache,target=/root/npm/.cache NODE_ENV=development npm --yes -f install
RUN npm run build

# create java jar
RUN mvn clean install

#CMD ["mvn", "spring-boot:run"]
CMD ["java", "-jar", "/app/target/characterviewerapp.jar"]
