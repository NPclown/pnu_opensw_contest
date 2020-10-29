## Server API

### 초기 셋팅

- 도커 이미지 다운로드

	```
	docker pull npclown/gcc:2.0 
	```

- 프로그램 실행

	```
	cd server
	yarn
	yarn start
	```
	
--
### Workbook API (문제집 관련 API)


| HTTP verbs | Route  | CRUD|
| ----------- |----------- |----------- |
| GET  		| /api/workbooks       				| 모든 문제 리스트 조회 | 
| POST   		| /api/workbooks/:workbooks_id      	| 특정 문제 조회 |
| POST  		| /api/workbooks       				| 신규 문제 등록 | 
| PATCH  	| /api/workbooks/:workbooks_id      	| 특정 문제 수정 / 갱신 |
| DELETE 	| /api/workbooks       				| 모든 문제 삭제 | 
| DELETE 	| /api/workbooks/:workbooks_id      	| 특정 문제 삭제 |


#### 모든 문제 리스트 조회
```
GET http://localhost:5000/api/workbooks
```
```
{
    "result": [
        {
            "id": "1",
            "name": "두 정수 사이의 합",
            "cont": "&lt;p&gt;두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요.&lt;br&gt;예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.&lt;/p&gt;&lt;h5&gt;제한 조건&lt;/h5&gt;&lt;ul&gt;&lt;li&gt;a와 b가 같은 경우는 둘 중 아무 수나 리턴하세요.&lt;/li&gt;&lt;li&gt;a와 b는 -10,000,000 이상 10,000,000 이하인 정수입니다.&lt;/li&gt;&lt;li&gt;a와 b의 대소관계는 정해져있지 않습니다.&lt;/li&gt;&lt;/ul&gt;&lt;h5&gt;입출력 예&lt;/h5&gt;&lt;table class=\"table\"&gt;&lt;thead&gt;&lt;tr&gt;&lt;th&gt;a&lt;/th&gt;&lt;th&gt;b&lt;/th&gt;&lt;th&gt;return&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td&gt;3&lt;/td&gt;&lt;td&gt;5&lt;/td&gt;&lt;td&gt;12&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;3&lt;/td&gt;&lt;td&gt;3&lt;/td&gt;&lt;td&gt;3&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;5&lt;/td&gt;&lt;td&gt;3&lt;/td&gt;&lt;td&gt;12&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
            "init_c": "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nlong long solution(int a, int b) {\n    long long answer = 0;\n    return answer;\n}",
            "init_cpp": "#include <string>\n#include <vector>\n\nusing namespace std;\n\nlong long solution(int a, int b) {\n    long long answer = 0;\n    return answer;\n}",
            "init_java": "class Solution {\n    public long solution(int a, int b) {\n        long answer = 0;\n        return answer;\n    }\n}",
            "init_py": "def solution(a, b):\n    answer = 0\n    return answer",
            "init_py3": "def solution(a, b):\n    answer = 0\n    return answer"
        },
        {
            "id": "2",
            "name": "평균 구하기",
            "cont": "&lt;p&gt;정수를 담고 있는 배열 arr의 평균값을 return하는 함수, solution을 완성해보세요.&lt;/p&gt;&lt;h4&gt;제한사항&lt;/h4&gt;&lt;ul&gt;&lt;li&gt;arr은 길이 1 이상, 100 이하인 배열입니다.&lt;/li&gt;&lt;li&gt;arr의 원소는  -10,000 이상 10,000 이하인 정수입니다.&lt;/li&gt;&lt;/ul&gt;&lt;h4&gt;입출력 예&lt;/h4&gt;&lt;table class=\"table\"&gt;&lt;thead&gt;&lt;tr&gt;&lt;th&gt;arr&lt;/th&gt;&lt;th style=\"text-align: center\"&gt;return&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td&gt;[1,2,3,4]&lt;/td&gt;&lt;td style=\"text-align: center\"&gt;2.5&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;[5,5]&lt;/td&gt;&lt;td style=\"text-align: center\"&gt;5&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
            "init_c": "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\n// arr_len은 배열 arr의 길이입니다.\ndouble solution(int arr[], size_t arr_len) {\n    double answer = 0;\n    return answer;\n}",
            "init_cpp": "#include <string>\n#include <vector>\n\nusing namespace std;\n\ndouble solution(vector<int> arr) {\n    double answer = 0;\n    return answer;\n}",
            "init_java": "class Solution {\n    public double solution(int[] arr) {\n        double answer = 0;\n        return answer;\n    }\n}",
            "init_py": "def solution(arr):\n    answer = 0\n    return answer",
            "init_py3": "def solution(arr):\n    answer = 0\n    return answer"
        }
    ]
}
```

#### 특정 문제 조회
```
GET http://localhost:5000/api/workbooks/1
```

```
{
    "result": {
        "id": "1",
        "name": "두 정수 사이의 합",
        "cont": "&lt;p&gt;두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요.&lt;br&gt;예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.&lt;/p&gt;&lt;h5&gt;제한 조건&lt;/h5&gt;&lt;ul&gt;&lt;li&gt;a와 b가 같은 경우는 둘 중 아무 수나 리턴하세요.&lt;/li&gt;&lt;li&gt;a와 b는 -10,000,000 이상 10,000,000 이하인 정수입니다.&lt;/li&gt;&lt;li&gt;a와 b의 대소관계는 정해져있지 않습니다.&lt;/li&gt;&lt;/ul&gt;&lt;h5&gt;입출력 예&lt;/h5&gt;&lt;table class=\"table\"&gt;&lt;thead&gt;&lt;tr&gt;&lt;th&gt;a&lt;/th&gt;&lt;th&gt;b&lt;/th&gt;&lt;th&gt;return&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td&gt;3&lt;/td&gt;&lt;td&gt;5&lt;/td&gt;&lt;td&gt;12&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;3&lt;/td&gt;&lt;td&gt;3&lt;/td&gt;&lt;td&gt;3&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;5&lt;/td&gt;&lt;td&gt;3&lt;/td&gt;&lt;td&gt;12&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
        "init_c": "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nlong long solution(int a, int b) {\n    long long answer = 0;\n    return answer;\n}",
        "init_cpp": "#include <string>\n#include <vector>\n\nusing namespace std;\n\nlong long solution(int a, int b) {\n    long long answer = 0;\n    return answer;\n}",
        "init_java": "class Solution {\n    public long solution(int a, int b) {\n        long answer = 0;\n        return answer;\n    }\n}",
        "init_py": "def solution(a, b):\n    answer = 0\n    return answer",
        "init_py3": "def solution(a, b):\n    answer = 0\n    return answer"
    }
}
```

#### 신규문제 등록
```
POST http://localhost:5000/api/workbooks

{
        "name" : "문제명",
        "cont" : "설명",
        "init_c" : "초기 소스코드",
        "init_cpp" : "초기 소스코드",
        "init_java" : "초기 소스코드",
        "init_py" : "초기 소스코드",
        "init_py3" : "초기 소스코드"
}
```

```
{
    "result": true
}
```
#### 특정문제 수정 / 갱신
```
PATCH http://localhost:5000/api/workbooks/3

{
        "name" : "문제명",
        "cont" : "설명",
        "init_c" : "초기 소스코드",
        "init_cpp" : "초기 소스코드",
        "init_java" : "초기 소스코드",
        "init_py" : "초기 소스코드",
        "init_py3" : "초기 소스코드"
}
```

```
{
    "result": true
}
```

#### 모든 문제 삭제
```
DELETE http://localhost:5000/api/workbooks
```

```
{
    "result": true
}
```

#### 특정 문제 삭제
```
DELETE http://localhost:5000/api/workbooks/3
```

```
{
    "result": true
}
```

--
### 테스트 케이스 API (작업중)

| HTTP verbs | Route  | CRUD|
| ----------- |----------- |----------- |
| GET  		| /api/testcase/:workbooks_id       		| 특정 문제의 모든 테스트케이스 리스트 조회 | 
| GET   		| /api/testcase/:workbooks_id/testcase_id   	| 특정 테스트케이스 조회 |
| POST  		| /api/testcase/:workbook_id       			| 신규 테스트케이스 등록 | 
| PATCH  	| /api/testcase/:workbooks_id/:testcase_id  	| 특정 테스트케이스 수정 / 갱신 |
| DELETE 	| /api/testcase/:workbooks_id       		| 특정 문제의 모든 테스트케이스 삭제| 
| DELETE 	| /api/testcase/:workbooks_id/:testcase_id  | 특정 테스트케이스 삭제 |
--
### 실행 및 채점 API (작업중)

| HTTP verbs | Route  | CRUD|
| ----------- |----------- |----------- |
| POST  		| /run/execution       	| 문제에 대한 테스트 케이스 실행 | 
| POST   		| /run/submit      		| 문제에 대한 채점 실행 |

#### 문제에 대한 테스트 케이스 실행 (아직 제대로 구현 안됨, 에러 처리 안함, C만 실행됨)
```
DELETE http://localhost:5000/run/execution

{
    "index": "1",
    "language": "c",
    "code": "code.....",
    "testcase": ""
}
```

```
{
    "state": 0,
    "results": [
        {
            "input": "3, 5",
            "output": "12",
            "result": "실행한 결괏값 8이(가) 기댓값 12와(과) 다릅니다.",
            "prints": ""
        },
        {
            "input": "3, 3",
            "output": "3",
            "result": "실행한 결괏값 6이(가) 기댓값 3와(과) 다릅니다.",
            "prints": ""
        },
        {
            "input": "5, 3",
            "output": "12",
            "result": "실행한 결괏값 8이(가) 기댓값 12와(과) 다릅니다.",
            "prints": ""
        }
    ]
}
```
--
#### mongo db 설치
```
docker pull mongo

docker run -d -p 9017:27017 --name mongo-db \
    -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=secret \
    mongo
```