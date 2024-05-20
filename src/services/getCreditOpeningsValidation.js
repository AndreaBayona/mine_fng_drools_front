import {request} from "./request";
import {ADMIN_ROLE_ID} from "../utils/serverConfig";

export const CREDIT_VALIDATION = "getCreditOpeningsValidation";

export const getCreditOpeningsValidation = async (csvFileData) => {
    console.log({csvFileData});
    const body = {
        user: {
            "id": "444",
            "name": "Andrea Bayona",
            "type": "admin",
            "userName": "abayona",
            "password": "pass",
            "roleIds": [ADMIN_ROLE_ID]
        },
        creditQuotaOpenings: csvFileData,
    }
    return await request(CREDIT_VALIDATION, 'POST', body);
};