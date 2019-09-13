const workDir = "./service/builder/";
const fs = require('fs');

exports.build = (osName, osTag) => {
    console.log("osName: " + osName);
    console.log("osTag: " + osTag);

    // delete files
    deleteFile("dockerfile");
    deleteFile("build.sh");

    // replace dockerfile from template
    replaceFile("dockerfile", osName, osTag);

    // replace build.sh from template
    replaceFile("build.sh", osName, osTag);

    // run shell
    //while (!fs.existsSync(filePath)) { sleep(1000); }
    const filePath = workDir + "build.sh"
    execShell(
        'chmod +x ' + filePath + ' && '
        + filePath + ' ' + workDir
    );
}

const replaceFile = (fileName, osName, osTag) => {
    const data = fs.readFileSync(workDir + "tmp/" +fileName, "utf-8");
    const replaceStr = (
        data.replace(/osName/g, osName).replace(/osTag/g, osTag)
        );
    fs.writeFileSync(workDir + fileName, replaceStr, 'utf-8');
}

const execShell = (cmd) => {
    const exec = require('child_process').exec;
    exec(cmd, (err, stdout, stderr) => {
        if (err) { console.log(err); }
        console.log(stdout);
    });
}

const deleteFile = (filePath) => {
    if (fs.existsSync(workDir + filePath)) {
        fs.unlinkSync(workDir + filePath);
    }
}

async function sleep(t) {
    return await new Promise(r => {
        setTimeout(() => {
            r();
        }, t);
    });
}