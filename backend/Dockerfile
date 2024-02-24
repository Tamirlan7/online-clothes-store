FROM bellsoft/liberica-openjdk-debian:17
WORKDIR /app
EXPOSE 8080
COPY target/online-store-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]
