import 'dotenv/config';
import { Server } from "./server";
import https from "https";
import http from "http";
import fs from "fs";

let app = new Server().app;
let PORT = process.env.PORT || 5000;

console.log(`Run under environment :: ${process.env.NODE_ENV}`);
if (process.env.IS_HTTPS === 'true') {
    https.createServer({
        key: fs.readFileSync(`/etc/letsencrypt/live/vhealthy.fr/privkey.pem`),
        cert: fs.readFileSync(`/etc/letsencrypt/live/vhealthy.fr/fullchain.pem`),
    }, app).listen(PORT, () => console.log(`https Server is running on Port ${PORT}.`));
} else {
    http.createServer(app).listen(PORT, () => console.log(`http Server is running on Port ${PORT}.`));
}
