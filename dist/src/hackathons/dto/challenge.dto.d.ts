export declare class CreateChallengeDto {
    name: string;
    description: string;
    criteria: string;
}
declare const UpdateChallengeDto_base: import("@nestjs/common").Type<Partial<CreateChallengeDto>>;
export declare class UpdateChallengeDto extends UpdateChallengeDto_base {
}
export {};
