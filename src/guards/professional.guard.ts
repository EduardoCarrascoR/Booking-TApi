import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthorizationGuard } from './authorization.guard';

@Injectable()
export class ProfessionalGuard extends AuthorizationGuard {

  constructor() {
    super(['PROFESSIONAL']);
  }

}