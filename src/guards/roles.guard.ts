import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from '@nestjs/jwt';
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private jwtService: JwtService, private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            const user = this.jwtService.verify(token, { secret: process.env.JWT_ACCESS_SECRET });
            req.user = user;
            return user.roles.some(role => requiredRoles.includes(role.value));
        } catch (error) {
            throw new UnauthorizedException({ message: 'No access' });
        }
    }

}