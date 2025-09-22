import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-token'), // sempre retorna o token fake
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data if username and password are correct', async () => {
      const result = await service.validateUser('admin', 'senha123');
      expect(result).toEqual({ username: 'admin', userId: 1 });
    });

    it('should return null if password is incorrect', async () => {
      const result = await service.validateUser('admin', 'wrongpass');
      expect(result).toBeNull();
    });

    it('should return null if user does not exist', async () => {
      const result = await service.validateUser('nonexistent', 'senha123');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access_token for valid user', async () => {
      const user = { username: 'admin', userId: 1 };
      const result = await service.login(user);
      expect(result).toEqual({ access_token: 'mocked-token' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: user.username,
        sub: user.userId,
      });
    });
  });
});
