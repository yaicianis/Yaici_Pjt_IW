import { Injectable } from '@angular/core';
import { ClientDataService } from '../data/client-data.service';
import { ProfessionalDataService } from '../data/professional-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user:any = null;

  constructor(
    private clientDataService: ClientDataService,
    private professionalDataService: ProfessionalDataService 
  ) {}

  login = (email:string, password: string): boolean => {
    const user = [
      this.clientDataService.getByEmailAndPassword(email, password),
      this.professionalDataService.getByEmailAndPassword(email, password)
    ].find(u => u);
  
    if (user) {
      this.user = { ...user, role: user.role || 'client' };
      return true;
    }
  
    return false;
  }

  logout = () => { this.user = null }
  getUser = () => { return this.user }
  isLoggedIn = () : boolean => { return this.user !== null }

}
