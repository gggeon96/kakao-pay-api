# 기반 이미지 선택
FROM gradle:7.0.2-jdk11 AS build

# 작업 디렉토리 생성 및 설정
WORKDIR /app

# 소스 코드 복사
COPY . .

RUN chmod +x ./gradlew

# 빌드
RUN ./gradlew  clean build --no-daemon

# 두 번째 단계: 빌드된 애플리케이션을 실행할 이미지
FROM openjdk:11-jdk-slim

# 작업 디렉토리 생성 및 설정
WORKDIR /app

# 빌드된 JAR 파일 복사
COPY --from=build /app/build/libs/demo-0.0.1-SNAPSHOT.jar .

# 컨테이너에서 사용할 포트 지정
EXPOSE 8080

# 애플리케이션 실행
CMD ["java", "-jar", "demo-0.0.1-SNAPSHOT.jar"]
