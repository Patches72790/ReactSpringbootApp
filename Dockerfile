FROM openjdk:17-jdk-alpine

VOLUME /tmp
ARG JAR_FILE
COPY ${JAR_FILE} app.jar
CMD ["java", "-jar", "/app.jar"]
