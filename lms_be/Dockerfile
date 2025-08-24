# -----------------------------
# Stage 1: Build with Gradle
# -----------------------------
FROM gradle:8.9-jdk17-alpine AS builder

# Thư mục làm việc trong container
WORKDIR /app

# Copy file cấu hình Gradle trước để cache dependencies
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

# Tải dependencies (tạo cache để build sau nhanh hơn)
RUN ./gradlew build -x test --no-daemon || return 0

# Copy toàn bộ source vào
COPY . .

# Build project (tạo file JAR trong build/libs/)
RUN ./gradlew clean bootJar -x test --no-daemon

# -----------------------------
# Stage 2: Run Spring Boot JAR
# -----------------------------
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy JAR từ stage builder sang
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose cổng mặc định
EXPOSE 8080

# Lệnh chạy
ENTRYPOINT ["java", "-jar", "app.jar"]
