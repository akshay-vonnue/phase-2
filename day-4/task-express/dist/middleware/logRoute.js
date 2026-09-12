import { readFile, writeFile } from "fs/promises";
let path = `/home/akshay.antony/training/phase-2/day-4/task-express/log/log.json`;
export const logRoute = async (req, res, next) => {
    let data = [];
    try {
        let file = await readFile(path, "utf8");
        if (file.trim()) {
            data = JSON.parse(file);
        }
    }
    catch (e) {
        data = [];
    }
    console.log("log route called");
    let time = new Date();
    let jsonBody = {
        method: req.method,
        url: req.url,
        req: req.body,
        time: time.getTime()
    };
    data.push(jsonBody);
    try {
        await writeFile(path, JSON.stringify(data) + "\n", "utf8");
    }
    catch (e) {
        console.log('some error occured while logging data');
    }
    next();
};
