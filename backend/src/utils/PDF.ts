import { Utils } from "./utils";
import * as fs from 'fs';
import path from "path";
const htmlPdf = require('html-pdf-node');

export default class PDF {
    static async generate(data) {
        try {

            let pdfBuffer = await htmlPdf.generatePdf(data, { format: 'A4' });
            let filePath = path.resolve(__dirname, `../../uploads/invoice/pdf_${Utils.generateVerificatioToken(10)}.pdf`)

            fs.writeFileSync(filePath, pdfBuffer);
            return filePath;
        } catch (error) {
            return null;
        }
    }
}


