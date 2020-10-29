
---
문제 관련 API
GET     index       /api/workbooks          모든 문제 리스트 조회
GET     retrieve    /api/workbooks/:id      특정 문제 조회
POST    create      /api/workbooks          신규 문제 등록
PATCH   update      /api/workbooks/:id      특정 문제 갱신
DELETE  delete      /api/books              모든 문제 삭제
DELETE  delete      /api/books/:id          특정 문제 삭제
---
테스트 케이스 관련 API
GET     index       /api/testcase/:workbooks           특정 문제의 모든 테스트케이스 리스트 조회
GET     retrieve    /api/testcase/:workbooks/:id       특정 테스트케이스 조회
POST    create      /api/testcase/:workbooks           신규 테스트케이스 등록
PUT     replace     /api/testcase/:workbooks/:id       특정 테스트케이스 갱신 (존재하지 않으면 생성)
PATCH   update      /api/testcase/:workbooks/:id       특정 테스트케이스 갱신
DELETE  delete      /api/testcase/:workbooks           특정 문제의 모든 테스트케이스 삭제
DELETE  delete      /api/testcase/:workbooks/:id       특정 테스트케이스 삭제
---
실행 관련 API
POST    create      /execution        문제에 대한 테스트 케이스 실행
---
채점 관련 API
POST    create      /submit           문제에 대한 채점 실행

```
docker pull mongo

docker run -d -p 9017:27017 --name mongo-db \
    -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=secret \
    mongo
```
```
docker pull npclown/gcc:2.0 
```