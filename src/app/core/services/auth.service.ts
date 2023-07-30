import { Injectable } from '@angular/core';
import { AuthLoginDto } from '../dto/authLoginRequestDto';
import { Observable, tap } from 'rxjs';
import { HttpClient } from  '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { AuthLoginResponseDto } from '../dto/authLoginResponseDto';
import { TokenService } from './token.service';
import { RegisterRequestDto } from '../dto/registerRequestDto';
import { RegisterResponseDto } from '../dto/registerResponseDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl:string = environment.apiUrl;

  constructor(private http: HttpClient,private tokenService: TokenService) { }

  public signIn(authDto: AuthLoginDto): Observable<AuthLoginResponseDto>{
    return this.http.post<AuthLoginResponseDto>(this.apiUrl + "/auth/sign-in",authDto).pipe(
      tap(response => {
        this.tokenService.saveToken(response.jwt);
      })
    );
  }


  public register(registerDto: RegisterRequestDto ): Observable<RegisterResponseDto>{
      return this.http.post<RegisterResponseDto>(this.apiUrl + "/auth/register",registerDto);
  }
}
