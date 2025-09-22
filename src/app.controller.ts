// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    getRoot() {
        return {
            message: 'Bem-vindo à API da loja do seu Manoel',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            endpoints: {
                health: '/health',
                docs: '/swagger'
            }
        };
    }

    @Get('health')
    getHealth(): object {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            message: 'API está saudável'
        };
    }
}