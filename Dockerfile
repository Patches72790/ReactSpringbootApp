FROM openjdk:17-jdk-alpine

VOLUME /tmp
ARG JAR_FILE

COPY ${JAR_FILE} app.jar

RUN mkdir /app

ADD ./* /app
WORKDIR /app
RUN ./mvnw clean install

CMD ["java", "-jar", "/app/app.jar"]
