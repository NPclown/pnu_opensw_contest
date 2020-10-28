#include <stdio.h>
#include "solution.h"    // 함수 선언대신 추가

int main()
{
    int i=0;
    long long result = 0;
    int a, b, c;

    FILE* fs;
    FILE* fr;
    fs = fopen("score.txt", "r");
    fr = fopen("result.txt", "a+");

    while (feof(fs) == 0) {
        fscanf(fs,"%d %d %d",&a,&b,&c);
        result = solution(a,b);
        fprintf(fr,"%d, %d\n",a,b);
        fprintf(fr,"%d\n",c);
        if(result == c){
            fprintf(fr,"테스트를 통과하였습니다.\n");
        }else{
            fprintf(fr,"실행한 결괏값 %lld이(가) 기댓값 %d와(과) 다릅니다.\n", result, c);
        }
    }

    return 0;
}