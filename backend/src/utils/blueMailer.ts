import nodemailer from "nodemailer";

export class blueMailer {
    static async sendEmail(data: { to: string, subject: string, html: any, attachmentContent?: any }): Promise<any> {

        try {

            let attachments = [];
            if (data.attachmentContent != null) { attachments.push(data.attachmentContent) }

            let transporter = nodemailer.createTransport({
                host: "smtp-relay.brevo.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "ingrid@vhealthy.fr", // generated ethereal user
                    pass: "04DIXCKVFg7R1EyY", // generated ethereal password
                },
            });

            const emailId = 'Vhealthy@gmail.com';
            const emailName = 'Vhealthy';
            let info = await transporter.sendMail({
                from: `"${emailName}" ${emailId}`,
                to: data.to,
                subject: data.subject,
                html: data.html,
                attachments
                // text: "Hello, Lucky"
            });

            return info?.messageId;
        } catch (error) {
            return false;
        }
    }
}