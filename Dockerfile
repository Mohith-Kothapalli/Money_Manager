FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/demo-0.0.1-SNAPSHOT.jar moneymanagerv1.0.jar
EXPOSE 9090
ENTRYPOINT ["java","-jar","moneymanagerv1.0.jar"]