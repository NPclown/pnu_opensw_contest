const express = require('express');
const router = express.Router();
const Docker = require('dockerode');
const fs = require('fs');
const cryptoRandomString = require('crypto-random-string');
const stream = require('stream');
const rimraf = require('rimraf');
const { check, validationResult } = require('express-validator');
const Workbook = require('../models/workbook');

const postValidator = [
    check('id').exists().withMessage('id is not null'),
    check('language').exists().withMessage('language is not null'),
    check('language').isInt({ min: 1, max:4}).withMessage('language is not round of range'),
    check('code').exists().withMessage('code is not null'),
]

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
        case 1:
            fs.writeFileSync(`${dir}/solution.c`,code,'utf8');
            break;
        case 2:
            fs.writeFileSync(`${dir}/solution.cpp`,code,'utf8');
            break;
        case 3:
            fs.writeFileSync(`${dir}/solution.py`,code,'utf8');
            break;
        case 4:
            fs.writeFileSync(`${dir}/solution.py`,code,'utf8');
            break;
    }
}

// 언어별 도커 옵션
const languageSelect = (language) => {
    return new Promise((resolve,reject) => {
        var langaugeOptions = {};
        switch(language){
            case 1:   //c
                langaugeOptions = {
                    dockerImage : 'npclown/gcc:3.0',
                    compile : 'cd tmp; gcc -o main.out *.c',
                    run : `cd tmp; ./main.out`
                }
                break;
            case 2:   //cpp
                langaugeOptions = {
                    dockerImage : 'npclown/gcc:3.0',
                    compile : 'cd tmp; g++ -o main.out *.cpp',
                    run : `cd tmp; ./main.out`
                }
                break;
            case 3:   //python
                langaugeOptions = {
                    dockerImage : 'npclown/gcc:3.0',
                    run : `cd tmp; python2 main.py`
                }
                break;
            case 4:   //python3
                langaugeOptions = {
                    dockerImage : 'npclown/gcc:3.0',
                    run : `cd tmp; python3 main.py`
                }
                break;
        }
        resolve(langaugeOptions);
    })
}

// 채점 소스코드 셋팅
const languageSetting = (tmp_dir, language, code) => {
    switch(language){
        case 1:   // c
            fs.writeFileSync(`${tmp_dir}/main.c`,code.main.c);
            fs.writeFileSync(`${tmp_dir}/solution.h`,code.header.c);
            break;
        case 2:   // c++
            fs.writeFileSync(`${tmp_dir}/main.cpp`,code.main.cpp);
            fs.writeFileSync(`${tmp_dir}/solution.h`,code.header.cpp);
            break;
        case 3:   // python
            fs.writeFileSync(`${tmp_dir}/main.py`,code.main.python);
            break;
        case 4:   // python3
            fs.writeFileSync(`${tmp_dir}/main.py`,code.main.python3);
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

                if(index == undefined | state.State.ExitCode != 0){
                    resolve({
                        state : state.State.ExitCode,
                        result : {
                            err : logs
                        }
                    })
                }else{
                    var result = fs.readFileSync(`${tmp_dir}/${index}.rst`,'utf-8').split('\n');

                    resolve({
                            success : "테스트를 통과하였습니다." === result[2] ? true : false,
                            input : result[0],
                            output : result[1],
                            result : result[2],
                            prints : logs
                    })
                }
            });
        });
    })
}

const dockerScore = (tmp_dir, options, index) => {
    return new Promise((resolve, reject)=>{
        docker.createContainer(options, function(err, container) {
            container.start({}, async function(err, data) {
                var logs = await containerLogs(container);
                var state = await container.inspect();
                await container.remove();

                if(index == undefined | state.State.ExitCode != 0){
                    resolve({
                        state : state.State.ExitCode,
                        success : false,
                        err : "런타임 에러"
                    })
                }else{
                    var result = fs.readFileSync(`${tmp_dir}/${index}.rst`,'utf-8').split('\n');

                    resolve({
                        success : "테스트를 통과하였습니다." === result[2] ? true : false,
                        time : (new Date(state.State.FinishedAt) - new Date(state.State.StartedAt))/1000+'ms'
                    })
                }
            });
        });
    })
}

router.post('/execution', postValidator, async(req, res, next) =>{
    try{
        const errors = validationResult(req).array();

        if (errors.length > 0) {
            res.json({ code: 43, data: { msg: 'Validation errors', err: errors } });
        } else {
            const id = req.body.id;
            const code = req.body.code;
            const language = req.body.language;
            const testcase = req.body.testcase;
            const langaugeOptions  = await languageSelect(language);
            const workbook = await Workbook.findOne({id:id})

            //임시 폴더 생성
            const tmp_dir = __dirname+"/../tmp/"+cryptoRandomString({length:16});
            makeFolder(tmp_dir);
            makeFolder(`${tmp_dir}/testcase`);

            //기본 소스코드 셋팅하기
            languageSetting(tmp_dir,language,workbook.code);
            makeFile(tmp_dir,language,code);

            // docker options
            let options = {
                Image: langaugeOptions.dockerImage,
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

            // complie
            if(language < 3){
                options.Cmd = ['/bin/bash', '-c', langaugeOptions.compile];
                var compile = await dockerCreate(tmp_dir,options);

                if(compile.state > 0){
                    rimraf.sync(tmp_dir);
                    res.json({code : 21,
                        data : {
                            msg : "Compile Error",
                            items : compile
                        }
                    })
                }else{
                    var execute_result = [];
                    var count = 0;
                    //execute
                    for (var index = 0; index < testcase.length; index++){
                        fs.writeFileSync(`${tmp_dir}/testcase/${index}.in`,testcase[index].input);
                        fs.writeFileSync(`${tmp_dir}/testcase/${index}.out`,testcase[index].output);
                        options.Cmd = ['/bin/bash', '-c', `${langaugeOptions.run} testcase/${index}.in testcase/${index}.out ${index}.rst`];
                        var execute = await dockerCreate(tmp_dir, options, index);
                        
                        if (execute.success){
                            count++;
                        }

                        execute_result.push(execute)
                    }
                    rimraf.sync(tmp_dir);
                    res.json({code : 0,
                        data : {
                            msg : "Success",
                            items : {
                                state : 0,
                                success : count,
                                total : testcase.length,
                                result : execute_result
                            }
                        }
                    })
                }
            }else{
                var execute_result = [];
                var count = 0;
                //execute
                for (var index = 0; index < testcase.length; index++){
                    fs.writeFileSync(`${tmp_dir}/testcase/${index}.in`,testcase[index].input);
                    fs.writeFileSync(`${tmp_dir}/testcase/${index}.out`,testcase[index].output);
                    options.Cmd = ['/bin/bash', '-c', `${langaugeOptions.run} testcase/${index}.in testcase/${index}.out ${index}.rst`];
                    var execute = await dockerCreate(tmp_dir, options, index);

                    if(execute.state > 0){
                        rimraf.sync(tmp_dir);
                        res.json({code : 21,
                            data : {
                                msg : "Compile Error",
                                items : execute
                            }
                        });
                    }
                        
                    if(execute.success){
                        count++;
                    }

                    execute_result.push(execute)
                }
                rimraf.sync(tmp_dir);
                res.json({code : 0,
                    data : {
                        msg : "Success",
                        items : {
                            state : 0,
                            success : count,
                            total : testcase.length,
                            result : execute_result
                        }
                    }
                })
            }
        }
    }catch(err){
        console.log(err);
        res.json({code: 500, data : { msg: "Internal Server Error", err: err}});
    }
});

router.post('/score', async(req, res, next) =>{
    try{
        const errors = validationResult(req).array();

        if (errors.length > 0) {
            res.json({ code: 43, data: { msg: 'Validation errors', err: errors } });
        } else {
            const id = req.body.id;
            const code = req.body.code;
            const language = req.body.language;
            const langaugeOptions  = await languageSelect(language);
            const workbook = await Workbook.findOne({id:id})
            const scoreCase = workbook.score;

            //임시 폴더 생성
            const tmp_dir = __dirname+"/../tmp/"+cryptoRandomString({length:16});
            makeFolder(tmp_dir);
            makeFolder(`${tmp_dir}/testcase`);

            //기본 소스코드 셋팅하기
            languageSetting(tmp_dir,language,workbook.code);
            makeFile(tmp_dir,language,code);

            // docker options
            let options = {
                Image: langaugeOptions.dockerImage,
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

            // complie
            if(language < 3){
                options.Cmd = ['/bin/bash', '-c', langaugeOptions.compile];
                var compile = await dockerScore(tmp_dir,options);

                if(compile.state > 0){
                    var result = []
                    for (var index = 0; index < scoreCase.length; index++){
                        result.push(compile)
                    }
                    rimraf.sync(tmp_dir);
                    res.json({code : 21, data : {
                                                msg : "Compile Error",
                                                items : {
                                                    state : 1,
                                                    score : 0,
                                                    result : result
                                                }
                                        }})
                }else{
                    var execute_result = [];
                    var count = 0;
                    //execute
                    for (var index = 0; index < scoreCase.length; index++){
                        fs.writeFileSync(`${tmp_dir}/testcase/${index}.in`,scoreCase[index].input);
                        fs.writeFileSync(`${tmp_dir}/testcase/${index}.out`,scoreCase[index].output);
                        options.Cmd = ['/bin/bash', '-c', `${langaugeOptions.run} testcase/${index}.in testcase/${index}.out ${index}.rst`];
                        var execute = await dockerScore(tmp_dir, options, index);
                        if (execute.success){
                            count++;
                        }
                        execute_result.push(execute)
                    }
                    rimraf.sync(tmp_dir);
                    res.json({code : 0,
                        data : {
                            msg : "Success",
                            items : {
                                statue : 0,
                                score : (count*100/scoreCase.length).toFixed(1),
                                result : execute_result
                            }
                        }
                    })
                }
            }else{
                var execute_result = [];
                var count=0;
                //execute
                for (var index = 0; index < scoreCase.length; index++){
                    fs.writeFileSync(`${tmp_dir}/testcase/${index}.in`,scoreCase[index].input);
                    fs.writeFileSync(`${tmp_dir}/testcase/${index}.out`,scoreCase[index].output);
                    options.Cmd = ['/bin/bash', '-c', `${langaugeOptions.run} testcase/${index}.in testcase/${index}.out ${index}.rst`];
                    var execute = await dockerScore(tmp_dir, options, index);
                    if (execute.state > 0){
                        var result = []
                        for (var index = 0; index < scoreCase.length; index++){
                            result.push(execute)
                        }
                        rimraf.sync(tmp_dir);
                        res.json({code : 21, data : {
                            msg : "Compile Error",
                            items : {
                                state : 1,
                                score : 0,
                                result : result
                            }
                        }})
                    }
                    if (execute.success){
                        count++;
                    }
                    execute_result.push(execute)
                }
                rimraf.sync(tmp_dir);
                res.json({code : 0,
                    data : {
                        msg : "Success",
                        items : {
                            statue : 0,
                            score : (count*100/scoreCase.length).toFixed(1),
                            result : execute_result
                        }
                    }
                })
            }
        }
    }catch(err){
        console.log(err);
        res.json({code: 500, data : { msg: "Internal Server Error", err: err}});
    }
});

module.exports = router;


