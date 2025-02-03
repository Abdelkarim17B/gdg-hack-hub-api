"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHackathonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_hackathon_dto_1 = require("./create-hackathon.dto");
class UpdateHackathonDto extends (0, swagger_1.PartialType)(create_hackathon_dto_1.CreateHackathonDto) {
}
exports.UpdateHackathonDto = UpdateHackathonDto;
//# sourceMappingURL=update-hackathon.dto.js.map