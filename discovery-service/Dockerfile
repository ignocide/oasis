FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY /target/discovery-service-0.0.1-SNAPSHOT.jar oasis-discovery-service.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/oasis-discovery-service.jar"]