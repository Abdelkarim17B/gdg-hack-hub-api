import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from './common/decorators/public.decorator';

@ApiTags('app')
@Controller()
export class AppController {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Get API information' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns API information',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Hackathon Platform API' },
        version: { type: 'string', example: '1.0.0' },
        description: { type: 'string' },
        documentation: { type: 'string', example: '/api/docs' },
        status: { type: 'string', example: 'running' },
        endpoints: {
          type: 'object',
          properties: {
            api: { type: 'string', example: '/api' },
            docs: { type: 'string', example: '/api/docs' }
          }
        }
      }
    }
  })
  getInfo() {
    return {
      name: 'Hackathon Platform API',
      version: '1.0.0',
      description: 'API for managing hackathons, submissions, and evaluations',
      documentation: '/api/docs',
      status: 'running',
      endpoints: {
        api: '/api',
        docs: '/api/docs'
      }
    };
  }
}