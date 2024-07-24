import { getEnv } from "../environments/env";
import WebsettingModel from "../model/Admin/WebSettingModel";

const Policy = `${getEnv().front_base_url}documents/240823_Etherna_Privacy_Policy_TLF_v2.pdf`;
const Terms = `${getEnv().front_base_url}documents/221223_Etherna_No2_GTC_v3_TLF_comm_trk.pdf`;

export class MailTemplate {

    static async sendForgotPasswordTemplate(data: { mailfor?: string, token: number, email?: string }): Promise<any> {
        const webSetting = await WebsettingModel.findOne();

        const domainName = webSetting?.domain_name_without_extension;
        const logo = webSetting.email_logo;
        const twitter = webSetting?.web_tw;
        const youtube = webSetting?.web_yt;
        const instagram = webSetting?.web_insta;
        const LinkedIn = webSetting?.web_linkedin;

        return `<!doctype html>
                <html lang="en-US">
                <head>
                    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                    <style type="text/css">
                        a:hover {text-decoration: underline !important;}
                    </style>
                </head>
                <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #F2F3F8;" leftmargin="0">
                    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#F2F3F8"
                        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700%7COpen+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                        <tr>
                            <td>
                                <table style="background-color: #F2F3F8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                    align="center" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                            <img width="60" src="${logo}" title="logo" alt="logo">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:0 35px; text-transform: capitalize">
                                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Reset your password</h1>
                                                        <span
                                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #CECECE; width:100px;"></span>
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; text-align:left">
                                                            You received this E-mail in response to your request to reset your password.
                                                            Click the button below to reset your password, the reset password link is only valid for 1 hour.
                                                            </p>

                                                        <a href="${getEnv().front_base_url}public/${data.mailfor}/verify/${data.token}/${data.email}"
                                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                            Password</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="10"> <p>Please read <a href="${Policy}" target="_blank" rel='noopener noreferrer'>Privacy Policy</a> and <a href="${Terms}" target="_blank" rel='noopener noreferrer'>Terms and condition</a></p></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="10">
                                                        <ul type="none" style="text-align: center;">
                                                            <li style="display: inline-block;">
                                                                <a  rel='noopener noreferrer'href="${twitter}"><img src="${getEnv().image_base_url}/uploads/social_media_icon/twitter.png" width="35" height="34" /></a>
                                                            </li>
                                                            <li style="display: inline-block;">
                                                                <a rel='noopener noreferrer' href="${youtube}"><img src="${getEnv().image_base_url}/uploads/social_media_icon/youtube.png" width="35" height="34" /></a>
                                                            </li>
                                                            <li style="display: inline-block;">
                                                                <a rel='noopener noreferrer' href="${instagram}"><img src="${getEnv().image_base_url}/uploads/social_media_icon/instagram.png" width="35" height="34" /></a>
                                                            </li>
                                                            <li style="display: inline-block;">
                                                                <a rel='noopener noreferrer' href="${LinkedIn}"><img src="${getEnv().image_base_url}/uploads/social_media_icon/linkedin.png" width="35" height="34" /></a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>${domainName}</strong></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>`
    }

    static async sendInvoiceTemplate(data: { Name?: string, Email?: string, InvoiceNumber?: string, City?: string, Country?: string, InvoiceDate?: string, BookingDate?: string, Amount?: string, Fees?: string }): Promise<any> {
        const webSetting = await WebsettingModel.findOne();
        return `<!DOCTYPE html><html lang="en">
            <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <style>:root{--theme-color: #177994; --white-color: white;}body{font-family: "Courier New", Arial, Helvetica, sans-serif; padding: 0; margin: 0;}.mb-2{margin-bottom:10px}.border{background-color: var(--white-color); width: 19cm; margin-left: 1cm; margin-top: 1cm; margin-bottom: 1cm; border-color: var(--theme-color); border-width: 1px; border-style: solid;}.parent-border{background-color: var(--white-color); width: 21cm;  min-height: 29.7cm; border-color: var(--theme-color); border-width: 1px; border-style: solid;}.table-row-border>th{border-left-color: var(--white-color); border-right-color: var(--white-color); border-bottom-color: var(--theme-color); border-top-color: var(--theme-color); border-width: 2px; border-style: solid; margin: 0; padding: 0; width: 4cm; height: 1cm; text-align: center; color: var(--theme-color);}td{height: 1cm; text-align: center;}.table-addresses>th, th.title{color: var(--theme-color); text-align: center; width: 4cm; text-align: left;}table.invoice-table-address{width: 100%;}table.invoice-table-address td{font-size: 15px; text-align: left; height: 0.5cm;}.parent{position: relative;}.child{position: absolute;}.invoice-table{margin-left: 1cm; margin-right: 1cm; width: calc(100% - 2cm);}.parent-invoice-logo-type{height: 3cm;}.parent-invoice-table-address{padding: 1cm; height: 4cm;}.parent-invoice-table{width: 100%;}.parent-invoice-total{margin-top: 1cm; height: 1cm;}.parent-invoice-terms{margin-top: 4cm; height: 5cm;}.invoice-type{font-size: 50px; font-weight: 700; color: var(--theme-color); left: 1cm; bottom: 0cm;}.invoice-logo{right: 1cm; bottom: 0cm;}.invoice-total-text{font-size: 30px; font-weight: 700; color: var(--theme-color); left: 1cm; bottom: 0cm;}.invoice-total{right: 1cm; bottom: 0cm; font-size: 30px; font-weight: 700;}.invoice-terms{left: 1cm; bottom: 0cm;}.invoice-terms h4,.invoice-terms p{margin: 0.2cm auto;}.text-start{text-align: start !important;}.text-end{text-align: end;}.pt-2 {padding-top:10px}</style>  <link rel="icon" type="image/x-icon" href="${webSetting.fab_icon}"> <title>${webSetting.web_legal_name} Invoice ${data?.InvoiceNumber}</title></head>
            <body> <div class="parent-border"> <div class="border"> <div class="parent parent-invoice-logo-type"> <span class="invoice-type child"> INVOICE </span> <img class="invoice-logo child" src="${webSetting.email_logo}" alt="" width="100" height="auto"> </div><div class="parent parent-invoice-table-address"> <table class="child invoice-table-address" style="border-spacing: 0;"> <colgroup> <col span="1" style="width: 33.3%;"> <col span="1" style="width: 33.3%;"> <col span="1" style="width: 33.3%;"> </colgroup><tbody> <tr class="table-addresses"> <th>FROM</th> <th>BILL TO</th> <th>INVOICE #</th> </tr><tr class="temp"> <td>Harju maakond, Tallinn,</td><td>${data?.Name}</td><td>${data?.InvoiceNumber}</td></tr><tr> <td>Kesklinna linnaosa,</td><td>${data?.City}</td><th class="title">INVOICE DATE:</th> </tr><tr> <td>Tartu mnt</td><td>${data?.Country}</td><td>${data?.InvoiceDate}</td></tr><tr> <td>67/1-13b10115</td><td>${data?.Email}</td></tr></tbody></table> </div><div class="parent parent-invoice-table"> <table class="invoice-table" style="border-spacing: 0;"> <colgroup> <col span="1" style="width: 60%;"> <col span="1" style="width: 20%;"> <col span="1" style="width: 20%;"> </colgroup> <tr class="table-row-border"> <th class="text-start">DESCRIPTION</th> <th>QTY</th> <th>PRICE</th> </tr><tr> <td class="text-start pt-2"> This invoice is for the online services you've received on the Vhealthy platform, aligning with our terms, conditions, and GDPR regulations. Please make the payment by the due date to ensure compliance. Thank you for choosing Vhealthy. </td><td>1</td><td>&euro; ${data?.Fees}</td></tr></table> </div><div class="parent parent-invoice-total"> <span class="invoice-total-text child"> TOTAL : </span> <span class="invoice-total child"> EURO ${data?.Fees}/- </span> </div><div class="parent parent-invoice-terms"><div class="child invoice-terms" style="bottom:2cm;"> <h4>NOTES</h4> <p>Thanks for your business.</p></div> <div class="child invoice-terms"> <h4>TERMS AND CONDITIONS</h4> <p>All services provided are subject to the terms and conditions outlined in the contract agreement or engagement letter.</p></div></div></div></div></body>
        </html>`
    }

    static async webTemplate(data: { Name?: string, Contant?: string }): Promise<any> {
        try {
            const webSetting = await WebsettingModel.findOne();
            const domainName = webSetting?.domain_name_without_extension

            const twitter = webSetting?.web_tw
            const youtube = webSetting?.web_yt
            const instagram = webSetting?.web_insta
            const LinkedIn = webSetting?.web_linkedin

            return `<html>
            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                <style type="text/css">
                    a:hover {
                        text-decoration: underline !important;
                        text-transform: lowercase;
                    }
                    a* {
                        text-decoration: underline !important;
                        text-transform: lowercase;
                    }
                </style>
            </head>
        
            <body style="margin: 0; padding: 0;">
                <table align="center" class="main-wrapper" width="100%" cellpadding="30" cellspacing="0" border="0" bgcolor="#fff6f6">
                    <tr>
                        <td>
                            <table class="email-wrapper" width="700" cellpadding="70" cellspacing="0" border="0" bgcolor="#fff" align="center" style="border-radius: 15px;">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="height: 1px;">&nbsp;</p>
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
                                            <tr>
                                                <td style="">
                                                    <h1
                                                        style="
                                                            padding-top: 10px;
                                                            padding-bottom: 30px;
                                                            color: #fff;
                                                            font-weight: 500;
                                                            margin: 0;
                                                            font-size: 32px;
                                                            font-family: 'Rubik', sans-serif;
                                                            background: linear-gradient(270deg, #caf0ef, #177994, #ee8af8);
                                                            padding-left: 5%;
                                                        "
                                                    >
                                                        <img width="60" src="${webSetting.email_logo}" title="logo" alt="logo" /> <br />
                                                        <span style="font-size: 1.2rem;">Welcome to VhealTHY</span>
                                                    </h1>
                                                    <p style="color: #455056; font-size: 15px; line-height: 24px; margin: 5px auto auto auto; text-align: left;">
                                                        Dear ${data.Name},
                                                    </p>
        
                                                    <p style="text-align: left;">${data.Contant}</p>
        
                                                    <p style="text-align: left; font-size: 14px; color: black; line-height: 25px; margin: 0 0 0;">Warm regards,</p>
                                                    <p style="text-align: left; font-size: 14px; color: black; line-height: 25px; margin: 0 0 0;">Team Vhealthy</p>
        
                                                    <div style="text-align: left;">
                                                        <a style="text-align: left;" href="#" title="logo" target="_blank"><img width="60" src="${webSetting.email_logo}" title="logo" alt="logo" /> </a>
                                                    </div>
                                                    <p style="height: 1px;">&nbsp;</p>
                                                    <p style="text-align: left;" style="text-transform: lowercase; font-size: 14px; color: black; line-height: 18px; margin: 0 0 0;">
                                                        Website : <a href="${domainName}" target="_blank"> www.${domainName} </a>
                                                    </p>
                                                    <p style="text-align: left;">Please read <a href="${Policy}" target="_blank" rel='noopener noreferrer'>Privacy Policy</a> and <a href="${Terms}" target="_blank" rel='noopener noreferrer'>Terms and condition</a></p>
                                                    <hr />
        
                                                    <ul type="none" style="text-align: center;">
                                                        <li style="display: inline-block;">
                                                            <a  rel='noopener noreferrer'href="${twitter}"><img src="${getEnv().image_base_url}/uploads/social_media_icon/twitter.png" width="35" height="34" /></a>
                                                        </li>
                                                        <li style="display: inline-block;">
                                                            <a rel='noopener noreferrer' href="${youtube}"><img src="${getEnv().image_base_url}/uploads/social_media_icon/youtube.png" width="35" height="34" /></a>
                                                        </li>
                                                        <li style="display: inline-block;">
                                                            <a rel='noopener noreferrer' href="${instagram}"><img src="${getEnv().image_base_url}/uploads/social_media_icon/instagram.png" width="35" height="34" /></a>
                                                        </li>
                                                        <li style="display: inline-block;">
                                                            <a rel='noopener noreferrer' href="${LinkedIn}"><img src="${getEnv().image_base_url}/uploads/social_media_icon/linkedin.png" width="35" height="34" /></a>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        </html>        
        `
        } catch (error) {
            return "";
        }
    }
}