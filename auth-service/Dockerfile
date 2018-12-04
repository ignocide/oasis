FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY /target/auth-service-0.0.1-SNAPSHOT.jar oasis-auth-service.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/oasis-auth-service.jar"]