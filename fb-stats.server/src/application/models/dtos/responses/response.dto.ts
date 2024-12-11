import IResponse from "./response.interface";

export default class ResponseDTO implements IResponse {
    constructor (
        public success: boolean,
        public message?: string
    ) { }
}