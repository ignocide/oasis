FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY /target/gateway-service-0.0.1-SNAPSHOT.jar oasis-gateway-service.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/oasis-gateway-service.jar"]