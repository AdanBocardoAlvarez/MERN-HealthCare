import { body, query } from 'express-validator';

export class CommanValidator {
     static getConsulatantUser() { return [query('userId', 'Please Send User Id').notEmpty()] }
     static getConsulatantFees() { return [body('id', 'Please Send User Id').notEmpty(), body('fees', 'Please Enter Fees').notEmpty()] }
     static getConsulatantSessionTime() { return [body('id', 'Please Send User Id').notEmpty(), body('SlotTime', 'Please Enter Session Time In Minutes').notEmpty()] }
     static getConsulatantStatus() { return [body('id', 'Please Send User Id').notEmpty(), body('active_status', 'Please Send Status Code').notEmpty()] }
     static getConsulatantVerify() { return [body('id', 'Please Send User Id').notEmpty(), body('verified_status', 'Please Send User Verify Code').notEmpty()] }
}
