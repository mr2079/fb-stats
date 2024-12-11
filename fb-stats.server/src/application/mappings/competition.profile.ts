import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import Competition from "src/domain/entities/competition.entity";
import CompetitionDTO from "../models/dtos/competition.dto";

@Injectable()
export default class CompetitionProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Competition, CompetitionDTO);
            createMap(mapper, Array<Competition>, Array<CompetitionDTO>);
        };
    }
}