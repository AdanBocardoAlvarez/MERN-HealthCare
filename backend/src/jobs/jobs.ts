import { Email } from "./email";

export class Jobs {

    static runRequirdJobs() {
        // Database.backupJobs();
        Email.runEmailJobs();
    }
}