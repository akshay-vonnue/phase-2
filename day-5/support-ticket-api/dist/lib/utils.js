import { readFile, writeFile } from "fs/promises";
let path = '/home/akshay.antony/training/phase-2/day-5/support-ticket-api/data/data.json';
let data;
export async function readfile() {
    let fileData = await readFile(path, 'utf8');
    if (fileData.trim()) {
        data = JSON.parse(fileData);
    }
    else {
        data = [];
    }
    return data;
}
export async function writeToFile(newTicket) {
    let data = await readfile();
    data.push(newTicket);
    writeFile(path, JSON.stringify(data), "utf8");
    return data;
}
export async function updateTicketInFile(ticketId, data) {
    let fileData = await readfile();
    let ticket = fileData.find(t => t.id === ticketId);
    if (!ticket) {
        return -1;
    }
    if (fileData) {
        fileData = fileData.map(t => {
            if (t.id === ticketId) {
                return {
                    ...t,
                    ...data,
                    status: 'in-progress'
                };
            }
            return t;
        });
    }
    writeFile(path, JSON.stringify(fileData), "utf8");
    return 1;
}
export async function deleteTicketFromFile(ticketId) {
    let data = await readfile();
    data = data.filter(t => t.id !== ticketId);
    writeFile(path, JSON.stringify(data), "utf8");
    return data;
}
export async function handleError(res, message) {
    return res.status(404).json({
        success: false,
        message: message
    });
}
