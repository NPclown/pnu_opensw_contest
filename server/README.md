
---
문제 관련 API
GET     index       /workbooks          모든 문제 리스트 조회
GET     retrieve    /workbooks/:id      특정 문제 조회
POST    create      /workbooks          신규 문제 등록
PUT     replace     /workbooks/:id      특정 문제 갱신 (존재하지 않으면 생성)
PATCH   update      /workbooks/:id      특정 문제 갱신
DELETE  delete      /books              모든 문제 삭제
DELETE  delete      /books/:id          특정 문제 삭제
---
테스트 케이스 관련 API
GET     index       /testcase/:workbooks           특정 문제의 모든 테스트케이스 리스트 조회
GET     retrieve    /testcase/:workbooks/:id       특정 테스트케이스 조회
POST    create      /testcase/:workbooks           신규 테스트케이스 등록
PUT     replace     /testcase/:workbooks/:id       특정 테스트케이스 갱신 (존재하지 않으면 생성)
PATCH   update      /testcase/:workbooks/:id       특정 테스트케이스 갱신
DELETE  delete      /testcase/:workbooks           특정 문제의 모든 테스트케이스 삭제
DELETE  delete      /testcase/:workbooks/:id       특정 테스트케이스 삭제
---
실행 관련 API
POST    create      /execution        문제에 대한 테스트 케이스 실행
---
채점 관련 API
POST    create      /submit           문제에 대한 채점 실행

```
docker pull mongo

docker run --name mongodb -d -p 9017:27017 mongo
```
```
docker pull npclown/gcc:2.0 
```