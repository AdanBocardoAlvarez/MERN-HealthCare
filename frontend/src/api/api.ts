import axios, { AxiosResponse } from 'axios';
import {
    ICity,
    ICountry,
    ILang,
    INationality,
    IPostData,
    ITimingPostData
} from '../interfaces/Consultant/consultant-step1';
import { IStatus, ITokenData } from '../interfaces/token';
import {
    IComplaintTypeConsultant,
    IConsultant,
    IConsultantBooking,
    IGetAddressDetails,
    IGetClientListConsultant,
    IGetConsultanttComplaintList
} from '../interfaces/Consultant/consultant';
import {
    IConsultantProfile,
    IGetBankDetails,
    IGetBasicProfile,
    IGetEducationDetails,
    IGetMyAllCerificate,
    IGetProfileAndKeyword
} from '../interfaces/Consultant/consultantprofile';
import { IAuthor, IBlogGet } from '../interfaces/Admin/blog';
import { IQuote } from '../interfaces/Admin/quote';
import { IFavorite } from '../interfaces/Client/favorite';
import { IAdminAllComplaint, IAdminPanel, IGetComplaintRecord, IWaitingUserlist } from '../interfaces/Admin/keyword';
import { IDisorderList } from '../interfaces/Admin/disorder';
import { AllBooking } from '../interfaces/Admin/allbooking';
import {
    IComplaintTypeClient,
    IGetClientComplaintList,
    IGetConsultantListClient
} from '../interfaces/Client/client';
import { IDigitalProduct } from '../interfaces/Admin/digitalProduct';
import { IClientSIngleProfile } from '../interfaces/Consultant/clientProfile';
import { IBlogList, IOTPVerification } from '../interfaces/main-page';

const instanceAdmin = (token: string) =>
    axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/admin-panel/`,
        headers: {
            Authorization: `Bearer ${token}`,
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    });
const instanceClient = (token: string) =>
    axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/client`,
        headers: {
            Authorization: `Bearer ${token}`,
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    });

const instanceConsulatant = (token: string) =>
    axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/consultant/`,
        headers: {
            Authorization: `Bearer ${token}`,
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    });

const responseBody = (response: AxiosResponse) => response.data;
const getResponseBody = (response: AxiosResponse) => response.data.data;

const requestsAdmin = {
    get: (url: string, token?: string) => instanceAdmin(token).get(url).then(getResponseBody),
    post: (url: string, body: {}, token?: string) => instanceAdmin(token).post(url, body).then(responseBody),
    patch: (url: string, body: {}, token?: string) => instanceAdmin(token).patch(url, body).then(responseBody),
    put: (url: string, body: {}, token?: string) => instanceAdmin(token).put(url, body).then(responseBody),
    delete: (url: string, token?: string) => instanceAdmin(token).delete(url).then(responseBody)
};

const requestsClient = {
    get: (url: string, token?: string, params: Object = {}) => instanceClient(token).get(url, { params }).then(getResponseBody),
    post: (url: string, body: {}, token?: string) => instanceClient(token).post(url, body).then(responseBody),
    put: (url: string, body: {}, token?: string) => instanceClient(token).put(url, body).then(responseBody),
    delete: (url: string, token?: string) => instanceClient(token).delete(url).then(responseBody)
};

const requestsConsultant = {
    get: (url: string, token?: string) => instanceConsulatant(token).get(url).then(getResponseBody),
    post: (url: string, body: {}, token?: string) => instanceConsulatant(token).post(url, body).then(responseBody),
    patch: (url: string, body: {}, token?: string) => instanceConsulatant(token).patch(url, body).then(responseBody),
    postLogin: (url: string, body: {}, token?: string) => instanceConsulatant(token).post(url, body).then(responseBody),
    put: (url: string, body: {}, token?: string) => instanceConsulatant(token).put(url, body).then(responseBody),
    delete: (url: string, token?: string) => instanceConsulatant(token).delete(url).then(responseBody)
};

export const AdminApi = {
    postWebSetting: (post: Object, url: string, token?: string) => requestsAdmin.post(url, post, token),
    getWebSetting: (url: string, token?: string) => requestsAdmin.get(url, token),
    getComplaintRecord: (url: string, token?: string): Promise<IGetComplaintRecord> => requestsAdmin.get(url, token),
    getConsultantList: (url: string, token?: string): Promise<IConsultant[]> => requestsAdmin.get(url, token),
    getAuthorList: (url: string, token?: string): Promise<IAuthor[]> => requestsAdmin.get(url, token),
    getQuotesList: (url: string, token?: string): Promise<IQuote[]> => requestsAdmin.get(url, token),
    getBlogList: (url: string, token?: string): Promise<IBlogGet[]> => requestsAdmin.get(url, token),
    getBlogDigitalProduct: (url: string, token?: string): Promise<IDigitalProduct[]> => requestsAdmin.get(url, token),
    getComman: (url: string, token?: string): Promise<IAdminPanel[]> => requestsAdmin.get(url, token),
    getCommanWating: (url: string, token?: string): Promise<IWaitingUserlist[]> => requestsAdmin.get(url, token),
    getComplaintList: (url: string, token?: string): Promise<IAdminAllComplaint[]> => requestsAdmin.get(url, token),
    getRecordByID: (url: string, token?: string) => requestsAdmin.get(url, token),
    getConsultantProfile: (url: string, token?: string): Promise<IConsultantProfile[]> => requestsAdmin.get(url, token),
    getClientProfile: (url: string, token?: string): Promise<IClientSIngleProfile> => requestsAdmin.get(url, token),
    createPost: (post: Object, url: string, token?: string): Promise<ITokenData> => requestsAdmin.post(url, post, token),
    postLogin: (post: Object, url: string, token?: string): Promise<ITokenData> => requestsAdmin.post(url, post, token),
    Login: (post: Object, url: string, token?: string): Promise<ITokenData> => requestsAdmin.post(url, post, token),
    createPatch: (post: Object, url: string, token?: string): Promise<ITokenData> => requestsAdmin.patch(url, post, token),
    VerifyStatus: (post: Object, url: string, token?: string): Promise<IStatus> => requestsAdmin.post(url, post, token),
    RestorePatch: (post: Object, url: string, token?: string): Promise<IStatus> => requestsAdmin.patch(url, post, token),
    getMyAllBookingList: (url: string, token?: string): Promise<AllBooking[]> => requestsAdmin.get(url, token),
    tempDeleteBlog: (url: string, token?: string): Promise<ITokenData> => requestsAdmin.delete(url, token),
    getAdminDisorderList: (url: string, token?: string): Promise<IDisorderList[]> => requestsAdmin.get(url, token),
    changePassword: (post: Object, url: string, token?: string): Promise<IStatus> => requestsAdmin.post(url, post, token),

    simpleGet: (url: string, token?: string) => requestsAdmin.get(url, token),
    simplePost: (post: Object, url: string, token?: string) => requestsAdmin.post(url, post, token),
    simplePut: (post: Object, url: string, token?: string) => requestsAdmin.put(url, post, token),
};

export const ClientApi = {
    getMyProfileConsultant: (url: string, token?: string): Promise<IConsultantProfile[]> => requestsClient.get(url, token),
    getMyProfileConsultantSingle: (url: string, token?: string): Promise<IConsultantProfile> => requestsClient.get(url, token),
    getMyProfile: (url: string, token?: string) => requestsClient.get(url, token),
    getConsultantName: (url: string, token?: string): Promise<IGetConsultantListClient[]> => requestsClient.get(url, token),
    getComplaintClientList: (url: string, token?: string): Promise<IGetClientComplaintList[]> => requestsClient.get(url, token),
    getFavoriteList: (url: string, token?: string): Promise<IFavorite[]> => requestsClient.get(url, token),
    getConsultantAll: (url: string, token?: string) => requestsClient.get(url, token),
    getMyBookingList: (url: string, token?: string) => requestsClient.get(url, token),
    getLifestyleList: (url: string, token?: string) => requestsClient.get(url, token),
    getDisplayBlog: (url: string, token?: string) => requestsClient.get(url, token),
    postLogin: (post: Object, url: string, token?: string): Promise<ITokenData> => requestsClient.post(url, post, token),
    createPost: (post: Object, url: string, token?: string): Promise<ITokenData> => requestsClient.post(url, post, token),
    postClientFavourite: (post: Object, url: string, token?: string) => requestsClient.post(url, post, token),
    PostRegister: (post: Object, url: string, token?: string): Promise<IPostData> => requestsClient.post(url, post, token),
    PostBooking: (post: Object, url: string, token: string) => requestsClient.post(url, post, token),
    getComplaintTypeList: (url: string, token?: string): Promise<IComplaintTypeClient[]> => requestsClient.get(url, token),
    getNationality: (url: string, token?: string): Promise<INationality[]> => requestsClient.get(url, token),
    getFavouriteDetails: (url: string, token?: string) => requestsClient.get(url, token),
    getConsultantFilter: (url: string, body?: Object) => requestsClient.get(url, '', body),
    changePassword: (post: Object, url: string, token?: string): Promise<IStatus> => requestsClient.post(url, post, token),
    getBlogProfile: (url: string, token?: string): Promise<IBlogList[]> => requestsClient.get(url, token),
    getVerifyClient: (url: string, token?: string): Promise<IOTPVerification> => requestsClient.get(url, token),
    updateDocument: (post: Object, url: string, token?: string): Promise<ITokenData> => requestsClient.post(url, post, token),

    simpleGet: (url: string, token?: string) => requestsClient.get(url, token),
    simplePost: (post: Object, url: string, token?: string) => requestsClient.post(url, post, token),
    simplePut: (post: Object, url: string, token?: string) => requestsClient.put(url, post, token),
};

export const ConsultantApi = {
    getComplaintTypeListConsultant: (
        url: string,
        token: string
    ): Promise<IComplaintTypeConsultant[]> => requestsConsultant.get(url, token),
    getComplaintClientNameList: (url: string, token?: string): Promise<IGetClientListConsultant[]> =>
        requestsConsultant.get(url, token),
    getComplaintConsultantList: (
        url: string,
        token?: string
    ): Promise<IGetConsultanttComplaintList[]> => requestsConsultant.get(url, token),
    getMyBasicProfileConsultant: (url: string, token?: string): Promise<IGetBasicProfile> => requestsConsultant.get(url, token),
    getMyEducationDetailsConsultant: (url: string, token?: string): Promise<IGetEducationDetails> => requestsConsultant.get(url, token),
    getMyBankConsultant: (url: string, token?: string): Promise<IGetBankDetails> => requestsConsultant.get(url, token),
    getTimeSlot: (url: string, token?: string) => requestsConsultant.get(url, token),
    getMyProfileAndKeywordConsultant: (url: string, token?: string): Promise<IGetProfileAndKeyword> => requestsConsultant.get(url, token),
    getMyProfileConsultant: (url: string, token?: string): Promise<IConsultantProfile[]> => requestsConsultant.get(url, token),

    getLang: (url: string, token?: string): Promise<ILang[]> => requestsConsultant.get(url, token),
    getCountry: (url: string, token?: string): Promise<ICountry[]> =>
        requestsConsultant.get(url, token),
    getCity: (url: string, token?: string): Promise<ICity[]> => requestsConsultant.get(url, token),
    createPost: (post: Object, url: string, token?: string): Promise<IPostData> => requestsConsultant.post(url, post, token),
    createTiming: (post: ITimingPostData, url: string, token?: string): Promise<IStatus> => requestsConsultant.post(url, post, token),
    changePassword: (post: Object, url: string, token?: string): Promise<IStatus> => requestsConsultant.post(url, post, token),
    loginPost: (post: Object, url: string, token?: string): Promise<ITokenData> => requestsConsultant.post(url, post, token),
    login: (post: Object, url: string, token?: string): Promise<ITokenData> => requestsConsultant.postLogin(url, post, token),
    getMyBookingList: (url: string, token?: string): Promise<IConsultantBooking[]> => requestsConsultant.get(url, token),
    getAddressDetails: (url: string, token?: string): Promise<IGetAddressDetails> => requestsConsultant.get(url, token),
    getAllMyCertificate: (url: string, token?: string): Promise<IGetMyAllCerificate[]> => requestsConsultant.get(url, token),
    getSingleMyCertificate: (url: string, token?: string): Promise<IGetMyAllCerificate> => requestsConsultant.get(url, token),
    CertificatePatch: (post: Object, url: string, token?: string): Promise<ITokenData> => requestsConsultant.patch(url, post, token),
    GetNoteSingle: (url: string, token?: string) => requestsConsultant.get(url, token),
    getVerifyConsultant: (url: string, token?: string): Promise<IOTPVerification[]> => requestsConsultant.get(url, token),
    getDashbaord: (url: string, token?: string) => requestsConsultant.get(url, token),
    updateDocument: (post: Object, url: string, token?: string): Promise<ITokenData> => requestsConsultant.post(url, post, token),


    deleteCertificate: (url: string, token?: string) => requestsConsultant.delete(url, token),

    simpleGet: (url: string, token?: string) => requestsConsultant.get(url, token),
    simplePost: (post: Object, url: string, token?: string) => requestsConsultant.post(url, post, token),
    simplePut: (post: Object, url: string, token?: string) => requestsConsultant.put(url, post, token),
    simplePatch: (post: Object, url: string, token?: string) => requestsConsultant.patch(url, post, token),
    simpleDelete: (url: string, token?: string) => requestsConsultant.delete(url, token),

};
