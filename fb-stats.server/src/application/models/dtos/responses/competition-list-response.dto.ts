import Competition from "src/domain/entities/competition.entity";
import ResponseDTO from "./response.dto";

export default class CompetitionListResponseDTO extends ResponseDTO {
    constructor(
        public success: boolean,
        public competitions?: Competition[],
        public message?: string
    ) {
        super(success, message)
    }
}