# ---------- Stage 1: Build React app ----------
    FROM node:20 AS build

    WORKDIR /app
    
    # copy file cấu hình
    COPY package*.json ./
    RUN npm install
    
    # copy source
    COPY . .
    
    # build ra static files
    RUN npm run build
    
    
    # ---------- Stage 2: Nginx serve ----------
    FROM nginx:alpine
    
    # copy build từ stage 1 vào Nginx html folder
    COPY --from=build /app/build /usr/share/nginx/html
    
    # copy nginx config nếu muốn custom
    COPY ./nginx.conf /etc/nginx/conf.d/default.conf
    
    # copy script entrypoint để inject env.js (nếu cần đổi API_URL khi run)
    COPY ./docker-entrypoint.sh /docker-entrypoint.sh
    RUN chmod +x /docker-entrypoint.sh
    
    EXPOSE 80
    
    ENTRYPOINT ["/docker-entrypoint.sh"]
    CMD ["nginx", "-g", "daemon off;"]
    