import { Repository } from 'typeorm';
import { Hackathon } from './entities/hackathon.entity';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';
import { QueryHackathonDto } from './dto/query-hackathon.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class HackathonsService {
    private hackathonRepository;
    constructor(hackathonRepository: Repository<Hackathon>);
    create(createHackathonDto: CreateHackathonDto): Promise<Hackathon>;
    findAll(query: QueryHackathonDto, pagination: PaginationDto): Promise<{
        items: Hackathon[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string): Promise<Hackathon>;
    update(id: string, updateHackathonDto: UpdateHackathonDto): Promise<Hackathon>;
    remove(id: string): Promise<void>;
}
