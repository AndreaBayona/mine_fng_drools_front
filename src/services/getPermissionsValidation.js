import {request} from "./request";
import {ADMIN_ROLE_ID} from "../utils/serverConfig";

export const PERMISSIONS_VALIDATION = "getPermissionsValidation";

export const getPermissionsValidation = async (roleId) => {
    const body = {
        user: {
            "id": "444",
            "name": "Andrea Bayona",
            "type": "admin",
            "userName": "abayona",
            "password": "pass",
            "roleIds": [roleId]
        },
        action: {
            "actionType": "LOAD_ANEXO_5_FILE",
            "fileInfo": {},
            "data": []
        }
    }
    return await request(PERMISSIONS_VALIDATION, 'POST', body);
};