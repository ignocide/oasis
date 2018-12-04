FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY /target/todo-service-0.0.1-SNAPSHOT.jar oasis-todo-service.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/oasis-todo-service.jar"]