FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY /target/config-service-0.0.1-SNAPSHOT.jar oasis-config-service.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/oasis-config-service.jar"]