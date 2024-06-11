## docker로 실행방법 (서버와 함께 prod 모드로 보고싶을때)

### 서버가 우선적으로 컨테이너가 띄워져있어야함

- 도커 이미지 빌드

1. .env 수정
   - NEXT_PUBLIC_API_URL=http://localhost:9900 -> NEXT_PUBLIC_API_URL=http://localhost:80
2. docker build . -t blog-client

- 도커 컨테이너 실행

1. docker run -d --name blog-client -p 3000:3000 blog-client:latest
