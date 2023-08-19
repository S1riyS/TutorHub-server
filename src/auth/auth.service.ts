import { Injectable, UnauthorizedException } from '@nestjs/common';
import { add } from 'date-fns';
import { CreateUserDTO as RegisterDTO } from '@user/dto';
import { UserService } from '@user/user.service';
import { LoginDTO } from './dto';
import { Tokens } from './interfaces';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Token, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDTO) {
    return this.userService.create(dto);
  }

  async login(dto: LoginDTO): Promise<Tokens> {
    const user = await this.userService.findOne(dto.email);
    let passwordMatches: boolean;

    if (user) {
      passwordMatches = await compare(dto.password, user.password);
    } else {
      passwordMatches = false;
    }

    if (!user || !passwordMatches) throw new UnauthorizedException('Incorrect email or password');

    return this.generateTokens(user);
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    const token = await this.prisma.token.findUnique({
      where: { value: refreshToken },
      include: { user: true },
    });
    // Checking if user has refresh token
    if (!token) throw new UnauthorizedException();

    // If he has, deleting it
    await this.prisma.token.delete({ where: { value: refreshToken } });

    // Checking if token is expired. If so, throwing exception
    if (new Date(token.exp) < new Date()) throw new UnauthorizedException();

    // If user has token, and it is alive, generating a new pair of tokens
    const tokenOwner: User = token.user;
    return this.generateTokens(tokenOwner);
  }

  private async generateTokens(user: User): Promise<Tokens> {
    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: refreshToken,
    };
  }

  private async generateRefreshToken(userId: string): Promise<Token> {
    const refreshTokenLifeMonths = this.config.get<number>('JWT_REFRESH_EXP_MONTHS');
    return this.prisma.token.create({
      data: {
        userId: userId,
        exp: add(new Date(), { months: refreshTokenLifeMonths }),
      },
    });
  }
}
