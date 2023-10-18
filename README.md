# [더조은아카데미] 실전 프로젝트 계획표

<aside>
💡 CoinView 프로젝트 코딩에 대한 내용을 기입하는 S.A. 페이지 입니다.

</aside>

## 0. 목차

**1. 프로젝트 명**

**2. 팀원**

**3. 소개**

**4. 와이어프레임**

**5.프로그램 세팅 및 작업**

**6. API**

**7. 기능구현 분담**

**8. 서버와 데이터베이스의 관계도**


---

## 프로젝트 명

<aside>
💁🏻‍♂️ Coin View (코인뷰)

</aside>

## 팀원

<aside>
💁🏻‍♂️ 팀원 목록표<br>
<img width="600" alt="image" src="https://github.com/FullStackWeavers/Coin_Market_FE/assets/92284361/1dc1a988-96df-4b1f-9cee-7e9980cb73b8">


</aside>

## 소개

<aside>
💁🏻‍♂️ 빗썸 api를 활용한 코인 사이트
</aside>

## 와이어프레임

[coinview_wireframe.pdf](https://prod-files-secure.s3.us-west-2.amazonaws.com/dfaca62e-9daf-4846-8ba5-2735532647b6/483acb5e-857b-4771-9f45-74bff8e147ac/coinview_wireframe.pdf)

---

## 프로그램 세팅 및 작업

<aside>
🛠 프로그램 세팅 및 작업

- **GitHub Link**
    
    FE: [https://github.com/FullStackWeavers/Coin_Market_FE](https://github.com/FullStackWeavers/Coin_Market_FE)
    
    BE: [https://github.com/FullStackWeavers/Coin_Market_BE](https://github.com/FullStackWeavers/Coin_Market_BE)
    

- **Stack**
    
    
    <aside>
🔗 BackEnd_Stack 수정


![image](https://user-images.githubusercontent.com/92284361/227667321-e70c40a4-3696-479c-8e80-ede70f874685.png)
    

- **ERD**  수정
   
![mongoDB hackolade](https://user-images.githubusercontent.com/117289578/226113241-62171e24-f7a9-49ca-b573-0e9e8fd4d8ff.png)


- **npm**
 ```
 "@nestjs/axios": "^3.0.0",
 "@nestjs/common": "^10.0.0",
 "@nestjs/config": "^3.1.0",
 "@nestjs/core": "^10.0.0",
 "@nestjs/jwt": "^10.1.1",
 "@nestjs/passport": "^10.0.2",
 "@nestjs/platform-express": "^10.2.7",
 "@nestjs/platform-socket.io": "^10.2.7",
 "@nestjs/platform-ws": "^10.2.7",
 "@nestjs/typeorm": "^10.0.0",
 "@nestjs/websockets": "^10.2.7",
 "@types/crypto-js": "^4.1.2",
 "@types/express-session": "^1.17.8",
 "@types/js-cookie": "^3.0.4",
 "bcrypt": "^5.1.1",
 "cors": "^2.8.5",
 "crypto-js": "^4.1.1",
 "express-session": "^1.17.3",
 "jsonwebtoken": "^9.0.2",
 "mysql": "^2.18.1",
 "passport": "^0.6.0",
 "passport-google": "^0.3.0",
 "passport-google-oauth20": "^2.0.0",
 "passport-jwt": "^4.0.1",
 "passport-kakao": "^1.0.1",
 "passport-local": "^1.0.0",
 "passport-naver": "^1.0.6",
 "reflect-metadata": "^0.1.13",
 "request": "^2.88.2",
 "rxjs": "^7.8.1",
 "socket.io": "^4.7.2",
 "typeorm": "^0.3.17"
```    

- **Code Review Time**
    - 아침조회 (오전 09시)
        
        전일 19시부터 금일 08시까지 구현한 코드 및 기능 전달,
        19시전까지 어떤걸 할건지 전달.
        
    - 중간조회 (오후 04시)
        
        중간 코드리뷰 실행
        
        

</aside>


## API

<aside>

📃 API 표 수정

![image](https://user-images.githubusercontent.com/92284361/227671111-9f394da7-708e-45ef-93ce-ecd0839b7b6d.png)
    
</aside>

## **기능구현 분담**

<aside>
🙋🏻‍♂️  Dividing the implementation of Infrastructure features.

- 이기웅
    - Virtualization Technology
        
        Docker
        
    - AWS
    - GitHub Action
- 정붕기
    - Virtualization Technology
        
        Docker
        
    - ElasticSearch
    - AWS
- 주재훈
    - Virtualization Technology
        
        Docker-compose
        
    - MongoDB manager
        
        Managing DB
        
    - Cloud Database
        
        google-cloud/storage
        
    - AWS
        - https - Enable certification
            
            Testing VPC
            
- 한창윤
    - Virtualization Technology
        
        Docker
        
    - ElasticSearch
    - AWS
        
</aside>

<aside>
🙋🏻‍♂️ Dividing the implementation of Server features.

- 이기웅
    1. View user profile
    2. Edit user profile - nickname, password
    3. Upload profile photo
    4. Edit profile photo

- 주재훈
    1. Send email verification code
    2. Verify email address
    3. User signup
    4. User login
    5. User logout
    6. User withdrawal
    
- 정붕기
    1. Elasticsearch
    2. Vite+React

- 한창윤
    1. Elasticsearch
    
</aside>


## Architecture 수정/삭제?

![Lv1_1](https://user-images.githubusercontent.com/92284361/230899719-f7243865-c5ab-4ca3-a269-84f12496e370.png)



---
