import {request} from "./request";
import {ADMIN_ROLE_ID} from "../utils/serverConfig";

export const FILE_VALIDATION = "getFileFormatValidation";

export const getFileFormatValidation = async (fileInfo) => {
    console.log({fileInfo});
    const body = {
        user: {
            "id": "444",
            "name": "Andrea Bayona",
            "type": "admin",
            "userName": "abayona",
            "password": "pass",
            "roleIds": [ADMIN_ROLE_ID]
        },
        fileInfo: {
            "fileType": fileInfo.fileType,
            "fileSize": fileInfo.fileSize,
            "fileId": 0
        }
    }
    return await request(FILE_VALIDATION, 'POST', body);
};