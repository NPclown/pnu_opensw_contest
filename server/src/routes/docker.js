const express = require('express');
const router = express.Router();
const Docker = require('dockerode');
const fs = require('fs');
const cryptoRandomString = require('crypto-random-string');
const stream = require('stream');
const async = require('async');
const rimraf = require('rimraf');

const docker = new Docker({
    socketPath: '/var/run/docker.sock'
});

const makeFolder = (dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

const makeFile = (dir, language, code, testcase) => {
    fs.writeFileSync(`${dir}/solution.c`,code,'utf8');
}

const containerLogs = (container) => {
    return new Promise((resolve, reject)=>{
        var logStream = new stream.PassThrough();
        var test = "";

        logStream.on('data', function(chunk){
            test += chunk.toString('utf8');
        });

        container.logs({
            follow: true,
            stdout: true,
            stderr: true
        }, function(err, stream){
            if(err) {
                return logger.error(err.message);
            }

            container.modem.demuxStream(stream, logStream, logStream);

            stream.on('end', function(){
                resolve(test);
            });

            setTimeout(function() {
                stream.destroy();
            }, 2000);
        });
    })
}
  
router.post('/execution', (req, res, next) =>{
    let options = {
        Image: "npclown/gcc:2.0", //req.body.containerImage
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: false,
        HostConfig: {
            PortBindings: {}
        }
    };

    //임시 폴더 생성
    const tmp_dir = __dirname+"/../tmp/"+cryptoRandomString({length:16});
    makeFolder(tmp_dir);

    //기본 파일 복사하기
    fs.copyFileSync(__dirname+"/../workbooks/1/main.c",tmp_dir+"/main.c");
    fs.copyFileSync(__dirname+"/../workbooks/1/solution.h",tmp_dir+"/solution.h");
    fs.copyFileSync(__dirname+"/../workbooks/1/score.txt",tmp_dir+"/score.txt");


    //파일 생성 SourceCode / Input / Output
    var code = '#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\nlong long solution(int a, int b) {\nlong long answer = 0;\nreturn answer;\n}'
    var language = "c"
    var testcase = ""
    makeFile(tmp_dir,language,code,testcase);

    // volume
    var src = tmp_dir;
    var dis = "/tmp";
    options['Volumes'] = JSON.parse('{"' + dis + '": {}}');
    options.HostConfig = {
        'Binds': [src + ':' + dis]
    }

    options.Cmd = ['/bin/bash', '-c', 'cd tmp; gcc -o main.out *.c && ./main.out'];
    
    docker.createContainer(options, function(err, container) {
        container.start({}, async function(err, data) {
            var logs = await containerLogs(container);
            var state = await container.inspect();
            // await container.remove();
            // rimraf.sync(tmp_dir);

            var test = fs.readFileSync(`${tmp_dir}/result.txt`, 'utf8').split("\n");

            var tmp = []
            for (var i = 0; i < parseInt(test.length / 3); i++){
                tmp.push({ 
                    "input" : test[i*3],
                    "output" : test[i*3+1],
                    "result" : test[i*3+2],
                    "prints" : logs
                })
            }
            console.log(test.length/3);
            var result = {
                state : state.State.ExitCode,
                results : tmp
            }

            res.send(result)
        });
    });
});

module.exports = router;