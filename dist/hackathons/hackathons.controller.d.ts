import { HackathonsService } from './hackathons.service';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';
import { QueryHackathonDto } from './dto/query-hackathon.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class HackathonsController {
    private readonly hackathonsService;
    constructor(hackathonsService: HackathonsService);
    create(createHackathonDto: CreateHackathonDto): Promise<import("./entities/hackathon.entity").Hackathon>;
    findAll(query: QueryHackathonDto, pagination: PaginationDto): Promise<{
        items: import("./entities/hackathon.entity").Hackathon[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string): Promise<import("./entities/hackathon.entity").Hackathon>;
    update(id: string, updateHackathonDto: UpdateHackathonDto): Promise<import("./entities/hackathon.entity").Hackathon>;
    remove(id: string): Promise<void>;
}
