## Server API

### 초기 셋팅

#### mongo db 설치

- 도커 이미지 다운로드

	```
    cd server
    docker build -t compiler:1.0 .
	docker pull mongo
	```
- mongo db 실행

	```
	docker run -d -p 10017:27017 --name mongo-db \
	    -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
	    -e MONGO_INITDB_ROOT_PASSWORD=secret \
	    mongo
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
| GET   		| /api/workbooks/:workbooks_id      	| 특정 문제 조회 |
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
    "code": 0,
    "data": {
        "msg": "Success",
        "items": [
            {
                "id": "1",
                "name": "두 정수 사이의 합"
            },
            {
                "id": "2",
                "name": "평균 구하기"
            }
        ]
    }
}
-----------------------------------------------
{
    "code": 21,
    "data": {
        "msg": "Information Not Exist",
        "err": "Information Not Exist"
    }
}
```

#### 특정 문제 조회
```
GET http://localhost:5000/api/workbooks/1
```

```
{
    "code": 0,
    "data": {
        "msg": "Success",
        "items": {
            "id": "1",
            "name": "두 정수 사이의 합",
            "cont": "&lt;p&gt;두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요.&lt;br&gt;예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.&lt;/p&gt;&lt;h5&gt;제한 조건&lt;/h5&gt;&lt;ul&gt;&lt;li&gt;a와 b가 같은 경우는 둘 중 아무 수나 리턴하세요.&lt;/li&gt;&lt;li&gt;a와 b는 -10,000,000 이상 10,000,000 이하인 정수입니다.&lt;/li&gt;&lt;li&gt;a와 b의 대소관계는 정해져있지 않습니다.&lt;/li&gt;&lt;/ul&gt;&lt;h5&gt;입출력 예&lt;/h5&gt;&lt;table class=\"table\"&gt;&lt;thead&gt;&lt;tr&gt;&lt;th&gt;a&lt;/th&gt;&lt;th&gt;b&lt;/th&gt;&lt;th&gt;return&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td&gt;3&lt;/td&gt;&lt;td&gt;5&lt;/td&gt;&lt;td&gt;12&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;3&lt;/td&gt;&lt;td&gt;3&lt;/td&gt;&lt;td&gt;3&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;5&lt;/td&gt;&lt;td&gt;3&lt;/td&gt;&lt;td&gt;12&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
            "inits": {
                "c": "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nlong long solution(int a, int b) {\n    long long answer = 0;\n    return answer;\n}",
                "cpp": "#include <string>\n#include <vector>\n\nusing namespace std;\n\nlong long solution(int a, int b) {\n    long long answer = 0;\n    return answer;\n}",
                "python": "def solution(a, b):\n    answer = 0\n    return answer",
                "python3": "def solution(a, b):\n    answer = 0\n    return answer"
            },
            "sample": {
                "testcase": [
                    {
                        "_id": "5fa2b68d1f94700b1235e632",
                        "input": "3 4",
                        "output": "7"
                    }
                ],
                "schema": "a(int) b(int)"
            }
        }
    }
}
----------------------------------------------
{
    "code": 21,
    "data": {
        "msg": "Information Not Exist",
        "err": "Information Not Exist"
    }
}
```

#### 신규문제 등록
```
POST http://localhost:5000/api/workbooks

{
      "name": "평균 구하기",
      "cont": "&lt;p&gt;정수를 담고 있는 배열 arr의 평균값을 return하는 함수, solution을 완성해보세요.&lt;/p&gt;&lt;h4&gt;제한사항&lt;/h4&gt;&lt;ul&gt;&lt;li&gt;arr은 길이 1 이상, 100 이하인 배열입니다.&lt;/li&gt;&lt;li&gt;arr의 원소는  -10,000 이상 10,000 이하인 정수입니다.&lt;/li&gt;&lt;/ul&gt;&lt;h4&gt;입출력 예&lt;/h4&gt;&lt;table class=\"table\"&gt;&lt;thead&gt;&lt;tr&gt;&lt;th&gt;arr&lt;/th&gt;&lt;th style=\"text-align: center\"&gt;return&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td&gt;[1,2,3,4]&lt;/td&gt;&lt;td style=\"text-align: center\"&gt;2.5&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;[5,5]&lt;/td&gt;&lt;td style=\"text-align: center\"&gt;5&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
      "inits" : {
        "c": "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\n// arr_len은 배열 arr의 길이입니다.\ndouble solution(int arr[], size_t arr_len) {\n    double answer = 0;\n    return answer;\n}",
        "cpp": "#include <string>\n#include <vector>\n\nusing namespace std;\n\ndouble solution(vector<int> arr) {\n    double answer = 0;\n    return answer;\n}",
        "python": "def solution(arr):\n    answer = 0\n    return answer",
        "python3": "def solution(arr):\n    answer = 0\n    return answer"
      },
      "code" : {
        "main" : {
          "c": "#include <stdio.h>\n#include \"solution.h\"\n\nint main(int argc, char *argv[])\n{\n    double result = 0;\n    int arr[100];\n    int length=0;\n    double c;\n\n    FILE* fin = fopen(argv[1], \"r\");\n    FILE* fout = fopen(argv[2], \"r\");\n    FILE* fr = fopen(argv[3], \"w\");\n\n    while(!feof(fin)){\n        fscanf(fin,\"%d\",&arr[length]);\n        length++;\n    }\n    fscanf(fout,\"%lf\",&c);\n\n    result = solution(arr,length);\n\n    fprintf(fr,\"[\");\n    for (int i=0; i< length; i++){\n        fprintf(fr,\"%d\",arr[i]);\n        if(i != length -1 ){\n            fprintf(fr,\", \");\n        }\n    }\n    fprintf(fr,\"]\\n\");\n    fprintf(fr,\"%lf\\n\",c);\n\n    if(result == c){\n        fprintf(fr,\"테스트를 통과하였습니다.\\n\");\n    }else{\n        fprintf(fr,\"실행한 결괏값 %lf이(가) 기댓값 %lf와(과) 다릅니다.\\n\", result, c);\n    }\n\n    return 0;\n}",
          "cpp": "#include <iostream>\n#include <fstream>\n#include <string>\n#include <vector>\n#include \"solution.h\"\n\nusing namespace std;\n\nint main(int argc, char *argv[])\n{\n    double result = 0;\n    vector<int> arr;\n    double c;\n\n    ifstream fin(argv[1]);\n    ifstream fout(argv[2]);\n    ofstream fr(argv[3]);\n\n    while(!fin.eof()){\n        double tmp;\n        fin >> tmp;\n        arr.push_back(tmp);\n    }\n    fout >> c;\n\n    result = solution(arr);\n\n    fr << '[';\n    for (int i=0; i< arr.size(); i++){\n        fr << arr[i];\n        if(i != arr.size() -1 ){\n            fr << \", \";\n        }\n    }\n    fr << ']' << endl;\n    fr << c << endl;\n\n    if(result == c){\n        fr << \"테스트를 통과하였습니다.\" << endl;\n    }else{\n        fr << \"실행한 결괏값 \"<< result << \"이(가) 기댓값 \" << c << \"와(과) 다릅니다.\" << endl;\n    }\n\n    fin.close();\n    fout.close();\n    fr.close();\n\n    return 0;\n}",
          "python": "# -*- coding: utf-8 -*-\nimport os\nimport sys\nfrom solution import solution\n\nfin = open(sys.argv[1],'r')\nfout = open(sys.argv[2],'r')\nfr = open(sys.argv[3],'w')\n\narr = map(int, fin.read().split(' '))\nc = float(fout.read())\n\nresult = solution(arr)\n\nfr.write('[')\nfor index, item in enumerate(arr):\n    fr.write('{0}'.format(item))\n    if(index != len(arr)-1):\n        fr.write(', ')\n\nfr.write(']\\n')\nfr.write('{0}\\n'.format(c))\n\nif(result == c):\n    fr.write('테스트를 통과하였습니다.\\n')\nelse:\n    fr.write('실행한 결괏값 {0}이(가) 기댓값 {1}와(과) 다릅니다.\\n'.format(result,c))\n\nfr.close()",
          "python3": "# -*- coding: utf-8 -*-\nimport os\nimport sys\nfrom solution import solution\n\nfin = open(sys.argv[1],'r')\nfout = open(sys.argv[2],'r')\nfr = open(sys.argv[3],'w')\n\narr = list(map(int, fin.read().split(' ')))\nc = float(fout.read())\n\nresult = solution(arr)\n\nfr.write('[')\nfor index, item in enumerate(arr):\n    fr.write('{0}'.format(item))\n    if(index != len(arr)-1):\n        fr.write(', ')\n\nfr.write(']\\n')\nfr.write('{0}\\n'.format(c))\n\nif(result == c):\n    fr.write('테스트를 통과하였습니다.\\n')\nelse:\n    fr.write('실행한 결괏값 {0}이(가) 기댓값 {1}와(과) 다릅니다.\\n'.format(result,c))\n\nfr.close()"
        },
        "header" : {
          "c": "double solution(int arr[], size_t arr_len);",
          "cpp": "double solution(std::vector<int> arr);"
        }
      },
      "score" : [
        {
          "input" : "1 2 3 4",
          "output" : "2.5"
        },
        {
          "input" : "5 5",
          "output" : "5"
        }
      ],
      "sample": {
        "testcase": [
            {
                "_id": "5fa2b68d1f94700b1235e632",
                "input": "3 4",
                "output": "7"
            }
        ],
        "schema": "a(int) b(int)"
      },
      "docker" : {
          "memory" : 10
      }
    }
```

```
{
    "code": 0,
    "data": {
        "msg": "Information Register Successful",
        "item": {
            "id": "c135a57c"
        }
    }
}
```
#### 특정문제 수정 / 갱신
```
PATCH http://localhost:5000/api/workbooks/c135a57c

{
      "name": "평균 구하기1",
      "cont": "&lt;p&gt;정수를 담고 있는 배열 arr의 평균값을 return하는 함수, solution을 완성해보세요.&lt;/p&gt;&lt;h4&gt;제한사항&lt;/h4&gt;&lt;ul&gt;&lt;li&gt;arr은 길이 1 이상, 100 이하인 배열입니다.&lt;/li&gt;&lt;li&gt;arr의 원소는  -10,000 이상 10,000 이하인 정수입니다.&lt;/li&gt;&lt;/ul&gt;&lt;h4&gt;입출력 예&lt;/h4&gt;&lt;table class=\"table\"&gt;&lt;thead&gt;&lt;tr&gt;&lt;th&gt;arr&lt;/th&gt;&lt;th style=\"text-align: center\"&gt;return&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td&gt;[1,2,3,4]&lt;/td&gt;&lt;td style=\"text-align: center\"&gt;2.5&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;[5,5]&lt;/td&gt;&lt;td style=\"text-align: center\"&gt;5&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
      "inits" : {
        "c": "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\n// arr_len은 배열 arr의 길이입니다.\ndouble solution(int arr[], size_t arr_len) {\n    double answer = 0;\n    return answer;\n}",
        "cpp": "#include <string>\n#include <vector>\n\nusing namespace std;\n\ndouble solution(vector<int> arr) {\n    double answer = 0;\n    return answer;\n}",
        "python": "def solution(arr):\n    answer = 0\n    return answer",
        "python3": "def solution(arr):\n    answer = 0\n    return answer"
      },
      "code" : {
        "main" : {
          "c": "#include <stdio.h>\n#include \"solution.h\"\n\nint main(int argc, char *argv[])\n{\n    double result = 0;\n    int arr[100];\n    int length=0;\n    double c;\n\n    FILE* fin = fopen(argv[1], \"r\");\n    FILE* fout = fopen(argv[2], \"r\");\n    FILE* fr = fopen(argv[3], \"w\");\n\n    while(!feof(fin)){\n        fscanf(fin,\"%d\",&arr[length]);\n        length++;\n    }\n    fscanf(fout,\"%lf\",&c);\n\n    result = solution(arr,length);\n\n    fprintf(fr,\"[\");\n    for (int i=0; i< length; i++){\n        fprintf(fr,\"%d\",arr[i]);\n        if(i != length -1 ){\n            fprintf(fr,\", \");\n        }\n    }\n    fprintf(fr,\"]\\n\");\n    fprintf(fr,\"%lf\\n\",c);\n\n    if(result == c){\n        fprintf(fr,\"테스트를 통과하였습니다.\\n\");\n    }else{\n        fprintf(fr,\"실행한 결괏값 %lf이(가) 기댓값 %lf와(과) 다릅니다.\\n\", result, c);\n    }\n\n    return 0;\n}",
          "cpp": "#include <iostream>\n#include <fstream>\n#include <string>\n#include <vector>\n#include \"solution.h\"\n\nusing namespace std;\n\nint main(int argc, char *argv[])\n{\n    double result = 0;\n    vector<int> arr;\n    double c;\n\n    ifstream fin(argv[1]);\n    ifstream fout(argv[2]);\n    ofstream fr(argv[3]);\n\n    while(!fin.eof()){\n        double tmp;\n        fin >> tmp;\n        arr.push_back(tmp);\n    }\n    fout >> c;\n\n    result = solution(arr);\n\n    fr << '[';\n    for (int i=0; i< arr.size(); i++){\n        fr << arr[i];\n        if(i != arr.size() -1 ){\n            fr << \", \";\n        }\n    }\n    fr << ']' << endl;\n    fr << c << endl;\n\n    if(result == c){\n        fr << \"테스트를 통과하였습니다.\" << endl;\n    }else{\n        fr << \"실행한 결괏값 \"<< result << \"이(가) 기댓값 \" << c << \"와(과) 다릅니다.\" << endl;\n    }\n\n    fin.close();\n    fout.close();\n    fr.close();\n\n    return 0;\n}",
          "python": "# -*- coding: utf-8 -*-\nimport os\nimport sys\nfrom solution import solution\n\nfin = open(sys.argv[1],'r')\nfout = open(sys.argv[2],'r')\nfr = open(sys.argv[3],'w')\n\narr = map(int, fin.read().split(' '))\nc = float(fout.read())\n\nresult = solution(arr)\n\nfr.write('[')\nfor index, item in enumerate(arr):\n    fr.write('{0}'.format(item))\n    if(index != len(arr)-1):\n        fr.write(', ')\n\nfr.write(']\\n')\nfr.write('{0}\\n'.format(c))\n\nif(result == c):\n    fr.write('테스트를 통과하였습니다.\\n')\nelse:\n    fr.write('실행한 결괏값 {0}이(가) 기댓값 {1}와(과) 다릅니다.\\n'.format(result,c))\n\nfr.close()",
          "python3": "# -*- coding: utf-8 -*-\nimport os\nimport sys\nfrom solution import solution\n\nfin = open(sys.argv[1],'r')\nfout = open(sys.argv[2],'r')\nfr = open(sys.argv[3],'w')\n\narr = list(map(int, fin.read().split(' ')))\nc = float(fout.read())\n\nresult = solution(arr)\n\nfr.write('[')\nfor index, item in enumerate(arr):\n    fr.write('{0}'.format(item))\n    if(index != len(arr)-1):\n        fr.write(', ')\n\nfr.write(']\\n')\nfr.write('{0}\\n'.format(c))\n\nif(result == c):\n    fr.write('테스트를 통과하였습니다.\\n')\nelse:\n    fr.write('실행한 결괏값 {0}이(가) 기댓값 {1}와(과) 다릅니다.\\n'.format(result,c))\n\nfr.close()"
        },
        "header" : {
          "c": "double solution(int arr[], size_t arr_len);",
          "cpp": "double solution(std::vector<int> arr);"
        }
      },
      "score" : [
        {
          "input" : "1 2 3 4",
          "output" : "2.5"
        },
        {
          "input" : "5 5",
          "output" : "5"
        }
      ],
      "sample": {
        "testcase": [
            {
                "_id": "5fa2b68d1f94700b1235e632",
                "input": "3 4",
                "output": "7"
            }
        ],
        "schema": "a(int) b(int)"
      },
      "docker" : {
          "memory" : 10
      }
    }
```

```
{
    "code": 0,
    "data": {
        "msg": "Information Modify Successful",
        "item": {
            "id": "c135a57c"
        }
    }
}

{
    "code": 29,
    "data": {
        "msg": "Information Not Register",
        "err": {}
    }
}
```

#### 모든 문제 삭제
```
DELETE http://localhost:5000/api/workbooks
```

```
{
    "code": 0,
    "data": {
        "msg": "Delete Successful"
    }
}
```

#### 특정 문제 삭제
```
DELETE http://localhost:5000/api/workbooks/3
```

```
{
    "code": 0,
    "data": {
        "msg": "Delete Successful"
    }
}
```
--
### 실행 및 채점 API (작업중)

| HTTP verbs | Route  | CRUD|
| ----------- |----------- |----------- |
| POST  		| /run/execution       	| 문제에 대한 테스트 케이스 실행 | 
| POST   		| /run/score      		| 문제에 대한 채점 실행 |

#### 문제에 대한 테스트 케이스 실행
```
POST http://localhost:5000/run/execution

{
    "id": "1",
    "language": 1,   // range (1~4)
    "code": "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nlong long solution(int a, int b) {\n    long long answer = 0;\n\n        if( a == b) {\n            return a;\n        }\n        if(a > b) {\n            for(int i = b ; i <= a; i++) {\n                answer += i;\n            }\n        }else {\n            for(int i = a ; i <= b; i++) {\n                answer += i;\n            }\n        }\n\n    return answer;\n}",
    "testcase": [{"input" : "1 5", "output" : "12"},{"input" : "3 3", "output" : "3"},{"input" : "5 3", "output" : "12"}]
}
```

```
{
    "code": 0,
    "data": {
        "msg": "Success",
        "items": {
            "state": 0,
            "success": 2,
            "total": 3,
            "result": [
                {
                    "success": false,
                    "input": "1, 5",
                    "output": "12",
                    "result": "실행한 결괏값 15이(가) 기댓값 12와(과) 다릅니다.",
                    "prints": ""
                },
                {
                    "success": true,
                    "input": "3, 3",
                    "output": "3",
                    "result": "테스트를 통과하였습니다.",
                    "prints": ""
                },
                {
                    "success": true,
                    "input": "5, 3",
                    "output": "12",
                    "result": "테스트를 통과하였습니다.",
                    "prints": ""
                }
            ]
        }
    }
}

------------------------------------------
{
    "code": 21,
    "data": {
        "msg": "Compile Error",
        "items": {
            "state": 1,
            "result": {
                "err": "/tmp/cceeCvLf.o: In function `main':\nmain.c:(.text+0xc7): undefined reference to `solution'\ncollect2: error: ld returned 1 exit status\n"
            }
        }
    }
}
```
#### 문제에 대한 채점 실행
```
POST http://localhost:5000/run/score

{
    "id": "1",
    "language": 1,   // range (1~4)
    "code": "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nlong long solution(int a, int b) {\n    long long answer = 0;\n\n        if( a == b) {\n            return a;\n        }\n        if(a > b) {\n            for(int i = b ; i <= a; i++) {\n                answer += i;\n            }\n        }else {\n            for(int i = a ; i <= b; i++) {\n                answer += i;\n            }\n        }\n\n    return answer;\n}",
}
```

```
{
    "code": 0,
    "data": {
        "msg": "Success",
        "items": {
            "statue": 0,
            "score": "66.7",
            "result": [
                {
                    "success": false,
                    "time": "0.029ms"
                },
                {
                    "success": true,
                    "time": "0.03ms"
                },
                {
                    "success": true,
                    "time": "0.038ms"
                }
            ]
        }
    }
}

------------------------------------------
{
    "code": 21,
    "data": {
        "msg": "Compile Error",
        "items": {
            "state": 1,
            "score": 0,
            "result": [
                {
                    "state": 1,
                    "success": false,
                    "err": "런타임 에러"
                },
                {
                    "state": 1,
                    "success": false,
                    "err": "런타임 에러"
                },
                {
                    "state": 1,
                    "success": false,
                    "err": "런타임 에러"
                }
            ]
        }
    }
}
```
--
### 테스트 케이스 API (추후 작성 예정)

| HTTP verbs | Route  | CRUD|
| ----------- |----------- |----------- |
| GET  		| /api/testcase/:workbooks_id       		| 특정 문제의 모든 테스트케이스 리스트 조회 | 
| GET   		| /api/testcase/:workbooks_id/testcase_id   	| 특정 테스트케이스 조회 |
| POST  		| /api/testcase/:workbook_id       			| 신규 테스트케이스 등록 | 
| PATCH  	| /api/testcase/:workbooks_id/:testcase_id  	| 특정 테스트케이스 수정 / 갱신 |
| DELETE 	| /api/testcase/:workbooks_id       		| 특정 문제의 모든 테스트케이스 삭제| 
| DELETE 	| /api/testcase/:workbooks_id/:testcase_id  | 특정 테스트케이스 삭제 |
--