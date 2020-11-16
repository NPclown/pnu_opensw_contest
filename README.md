# 온라인 저지 시스템

온라인 저지 사이트를 구현하는 것에 목표가 있다.

## 요구사항

- [Node.js](https://nodejs.org/) >= 14.x
- [Yarn](https://classic.yarnpkg.com/en/)
- [Docker CE](https://www.docker.com/)

## 설치방법

### Linux / Mac
- git clone 
```
git clone https://github.com/NPclown/pnu_opensw_contest.git
```
- 도커 이미지 다운로드

```
cd server
docker build -t compiler:1.0 .
docker pull mongo
```
- mongo db 실행

```
$ docker run -d -p 10017:27017 --name mongo-db \
	    -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
	    -e MONGO_INITDB_ROOT_PASSWORD=secret \
	    mongo
```
- dotEnv(.env) setting

```
$ cp env .env

```

- Backend 실행

```
$ cd server
$ yarn
$ yarn start
```

-  FrontEnd 실행

```
$ cd client
$ yarn
$ yarn start
```

## 서버 API

[백엔드 API](./server/README.md)

## 참여인원

- 이현아, hyn2626@naver.com, FrontEnd
- 손동현, nigrumspiritus@gmail.com, BackEnd

## 참고

- OnlineJudge, [https://github.com/QingdaoU/OnlineJudge](https://github.com/QingdaoU/OnlineJudge)
- Mongoose, [https://mongoosejs.com/docs/guide.html](https://mongoosejs.com/docs/guide.html)
- React, [https://ko.reactjs.org/tutorial/tutorial.html](https://ko.reactjs.org/tutorial/tutorial.html)
- CodeMirror, [https://uiwjs.github.io/react-codemirror/](https://uiwjs.github.io/react-codemirror/)
- React-Bootrap, [https://react-bootstrap.github.io/getting-started/introduction](https://react-bootstrap.github.io/getting-started/introduction)
- 프로그래머스, [https://programmers.co.kr/learn/challenges](https://react-bootstrap.github.io/getting-started/introduction)


## 라이센스

- [MIT](http://opensource.org/licenses/MIT)
