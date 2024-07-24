import { AES, enc } from 'crypto-js';
import moment from 'moment-timezone';

export const formatDateDDMMYYYY = (d: any) => {
    var date = new Date(d);
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    if (isNaN(date.getTime())) {
        return d;
    } else {
        var day = date.getDate();
        let newDay = day.toString();
        if (day < 10) { newDay = "0" + day; }
        return newDay + " " + month[date.getMonth()] + ", " + date.getFullYear();
    }
}

export const randomID = (len: number): string => {
    let result = '';
    if (result) return result;
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
    let i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export const nl2br = (str?: string, is_xhtml: boolean = false) => {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}


export const strLimit = (string?: string, limit: number = 15) => {
    if (string !== undefined && string.length > limit) {
        return string.substring(0, limit) + "...";
    } else {
        return string
    }
}

export const getComplaintStatus = (status: number) => {
    try {
        let statusList = ["Raised", "Under Review", "Resolved"];
        return statusList[status];
    } catch (error) {
        return ""
    }
}

export const getComplaintDecision = (status: number) => {
    try {
        let statusList = ["Decision Pending", "Client", "Consultant"];
        return statusList[status];
    } catch (error) {
        return ""
    }
}

export const getPaymentStatus = (status: number) => {
    try {
        let statusList = ["Pending", "Success", "Failed"];
        return statusList[status];
    } catch (error) {
        return ""
    }
}

export const convertTo12HourFormat = (time24) => {
    // Extract hours, minutes, and seconds
    const [hours, minutes] = time24.split(':').map(Number);

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    const hours12 = (hours % 12 || 12).toString().padStart(2, '0');
    const minutes12 = minutes.toString().padStart(2, '0');

    // Format the result
    const time12 = `${hours12}:${minutes12} ${period}`;

    return time12;
}

export const myMoment = (dateTime = undefined, timezone = "Europe/Paris") => {
    return moment.tz(dateTime, timezone);
}

// Simple Caesar Cipher encryption function
export const encryptString = async (message: string) => {
    const key = process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY || 'my-secrate-key';
    const cipherText = await AES.encrypt(message, key);
    return cipherText.toString().replaceAll('+', 'xMl3Jk').replaceAll('/', 'Por21Ld').replaceAll('=', 'Ml32');
}

// Simple Caesar Cipher decryption function
export const decryptString = async (encodedText: string) => {
    const key = process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY || 'my-secrate-key';
    let bytes = AES.decrypt(encodedText.replaceAll('xMl3Jk', '+').replaceAll('Por21Ld', '/').replaceAll('Ml32', '='), key);
    return bytes.toString(enc.Utf8);
}


export const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export const convertTimeToAMPM = (timeString: string) => {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes] = timeString.split(':').map(Number);

    // Determine if it's AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12;

    // Construct the new time string
    const formattedTime = `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
}

export const encodeSlug = (string) => {
    return string.toLowerCase().replaceAll(' ', '-').replaceAll('/', '~');
}
export const decodeSlug = (string) => {
    return string.replaceAll('-', ' ').replaceAll('~', '/');
}

export const getUrlExtension = (url?: string) => {
    try {
        if (url) {
            return url.split(/[#?]/)[0].split('.').pop().trim();
        } else {
            return '';
        }
    } catch (error) {
        return '';
    }
}