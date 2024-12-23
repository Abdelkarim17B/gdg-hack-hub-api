import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        role: import("../common/enums/role.enum").Role;
        name: string;
        judgeAssignments: import("../hackathons/entities/judge-assignment.entity").JudgeAssignment[];
        evaluations: import("../evaluations/entities/evaluation.entity").Evaluation[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
    }>;
    refreshToken(user: any): Promise<{
        access_token: string;
    }>;
    private generateAuthResponse;
}
