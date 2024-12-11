import Competition from "src/domain/entities/competition.entity";
import ResponseDTO from "./response.dto";

export default class CompetitionResponseDTO extends ResponseDTO {
    constructor(
        public success: boolean,
        public competition?: Competition,
        public message?: string
    ) {
        super(success, message)
    }
}