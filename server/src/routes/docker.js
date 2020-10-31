const express = require('express');
const router = express.Router();
const Docker = require('dockerode');
const fs = require('fs');
const cryptoRandomString = require('crypto-random-string');
const stream = require('stream');
const async = require('async');
const rimraf = require('rimraf');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const adapter = new FileSync('db.json')
const db = low(adapter)        

const docker = new Docker({
    socketPath: '/var/run/docker.sock'
});

const makeFolder = (dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

const makeFile = (dir, language, code) => {
    switch(language){
        case '1':
            fs.writeFileSync(`${dir}/solution.c`,code,'utf8');
            break;
        case '2':
            fs.writeFileSync(`${dir}/solution.cpp`,code,'utf8');
            break;
        case '3':
            fs.writeFileSync(`${dir}/solution.py`,code,'utf8');
            break;
        case '4':
            fs.writeFileSync(`${dir}/solution.py`,code,'utf8');
            break;
        case '5':
            fs.writeFileSync(`${dir}/solution.java`,code,'utf8');
            break;
    }
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

const dockerCreate = (tmp_dir, options, index) => {
    return new Promise((resolve, reject)=>{
        docker.createContainer(options, function(err, container) {
            container.start({}, async function(err, data) {
                var logs = await containerLogs(container);
                var state = await container.inspect();
                await container.remove();

                if(index == undefined){
                    resolve({
                        state : state.State.ExitCode,
                        result : { 
                            "prints" : logs
                        }
                    })
                }else{
                    var result = fs.readFileSync(`${tmp_dir}/${index}.rst`,'utf-8').split('\n');

                    resolve({
                        result : { 
                            "input" : result[0],
                            "output" : result[1],
                            "result" : result[2],
                            "prints" : logs
                        }
                    })
                }
            });
        });
    })
}

// 언어별 도커 이미지 선택
const languageSelect = (language) => {
    return new Promise((resolve,reject) => {
        var dockerImage;
        switch(language){
            case '1':   //c
            case '2':   //cpp
            case '3':   //python
            case '4':   //python3
                dockerImage = 'npclown/gcc:2.0'
                break;
            case '5':   //java
                dockerImage = 'npclown/java:1.0'
                break;
            default:    //none
                dockerImage = null
        }
        resolve(dockerImage);
    })
}

// 채점 소스코드 셋팅
const languageSetting = (language, tmp_dir, id) => {
    switch(language){
        case '1':
            fs.writeFileSync(`${tmp_dir}/main.c`,db.get('workbook').find({id: id}).get('code').get('main').get('c').value());
            fs.writeFileSync(`${tmp_dir}/solution.h`,db.get('workbook').find({id: id}).get('code').get('header').get('c').value());
            break;
        case '2':
            fs.writeFileSync(`${tmp_dir}/main.cpp`,db.get('workbook').find({id: id}).get('code').get('main').get('cpp').value());
            fs.writeFileSync(`${tmp_dir}/solution.h`,db.get('workbook').find({id: id}).get('code').get('header').get('cpp').value());
            break;
        case '3':
            fs.writeFileSync(`${tmp_dir}/main.py`,db.get('workbook').find({id: id}).get('code').get('main').get('python').value());
            break;
        case '4':
            fs.writeFileSync(`${tmp_dir}/main.py`,db.get('workbook').find({id: id}).get('code').get('main').get('python3').value());
            break;
        case '5':
            fs.writeFileSync(`${tmp_dir}/main.java`,db.get('workbook').find({id: id}).get('code').get('main').get('java').value());
            break;
    }
}

router.post('/execution', async(req, res, next) =>{
    //임시 폴더 생성
    const tmp_dir = __dirname+"/../tmp/"+cryptoRandomString({length:16});
    makeFolder(tmp_dir);
    makeFolder(`${tmp_dir}/testcase`);

    //기본 소스코드 셋팅하기
    languageSetting('1',tmp_dir,'1');
    makeFile(tmp_dir,'1',req.body.code);

    // docker options
    let options = {
        Image: await languageSelect('1'),
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: false,
        HostConfig: {
            PortBindings: {}
        }
    };

    // volume
    var src = tmp_dir;
    var dis = "/tmp";
    options['Volumes'] = JSON.parse('{"' + dis + '": {}}');
    options.HostConfig = {
        'Binds': [src + ':' + dis]
    }

    //complie
    options.Cmd = ['/bin/bash', '-c', `cd tmp; gcc -o main.out *.c`];
    var compile = await dockerCreate(tmp_dir,options);

    if(compile.result.state != 0){
        res.send(compile)
    }else{
        var result = [];
        var testcase = req.body.testcase;
    
        //execute
        for (var index = 0; index < testcase.length; index++){
            fs.writeFileSync(`${tmp_dir}/testcase/${index}.in`,testcase[index].input);
            fs.writeFileSync(`${tmp_dir}/testcase/${index}.out`,testcase[index].output);
            options.Cmd = ['/bin/bash', '-c', `cd tmp; ./main.out testcase/${index}.in testcase/${index}.out ${index}.rst`];
            var execute = await dockerCreate(tmp_dir,options, index);
            result.push(execute)
        }
        rimraf.sync(tmp_dir);
        res.send(result)
    }
});

module.exports = router;