import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { user } from '../Data/User';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Character } from '../Data/Character';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private user: user | undefined
  private character: Character[] = []
  private showLoginPage: boolean = true
  private showRegisterPage: boolean = false
  private showCharacterPage: boolean = false
  private showCreateCharacterPage: boolean = false
  private firstName: string = 'Please Login'


  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  private showError(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 2000
    })
  }

  //return state info
  public getShowLoginPage(): boolean {
    return this.showLoginPage
  }

  public getShowRegisterPage(): boolean {
    return this.showRegisterPage
  }

  public getShowCharacterPage(): boolean {
    return this.showCharacterPage
  }

  public getFirstName(): string {
    return this.firstName
  }
  public returnCharacters(): Character[] {
    return this.character
  }

  public showCreateCharacter(): boolean {
    return this.showCreateCharacterPage
  }

  //login methods
  public tryLogin(username: string, password: string) {
    this.http.get<user>(`https://localhost:7286/api/User/login?username=${username}&password=${password}`)
      .pipe(take(1))
      .subscribe({
        next: data => {
          this.firstName = data.firstName
          this.getCharacters(data.id)
          this.loginSuccess()
        },
        error: err => {
          this.showError('Oops, something went wrong on the server side')
        }
      }
      )
  }
  private loginSuccess(): void {
    this.showLoginPage = false
    this.showCharacterPage = true
  }

  public logout(): void {
    this.showLoginPage = true
    this.showCharacterPage = false
    this.firstName = 'Please Login'
  }

  //character methods

  public getCharacters(id: number) {
    this.http.get<Character[]>(`https://localhost:7286/api/Character?id=${id}`)
      .pipe(take(1))
      .subscribe({
        next: data => {
          this.character = data
          this.returnCharacters()
        },
        error: err => {
          this.showError('Opps, something went wrong')
        }
      })
  }

  public createCharacter(name: string, type: string, description: string, hitPoints: number, armorPoints: number) {
    this.http.post(`https://localhost:7286/api/Character`, {
      name,
      type,
      description,
      hitPoints,
      armorPoints,
      userId: 1
    })
      .pipe(take(1))
      .subscribe({
        next: c => {
          this.doneWithAddCharacter()
        },
        error: err => {
          this.showError('Opps, something went wrong')
        }
      })
  }

  public deleteCharacter(id: number): void {
    this.http.delete<Character[]>(`https://localhost:7286/api/Character/${id}`)
      .pipe(take(1))
      .subscribe({
        next: c => {
          this.getCharacters(1)
        },
        error: err => {
          this.showError('Opps, something went wrong')
        }
      })
  }

  public addACharacter(): void {
    this.showLoginPage = false
    this.showCreateCharacterPage = true
    this.showCharacterPage = false
  }

  public doneWithAddCharacter(): void {
    this.getCharacters(1)
    this.showLoginPage = false
    this.showCreateCharacterPage = false
    this.showCharacterPage = true
  }

  //User Methods
  public createUser(name: string, email: string, password: string, firstName: string, lastName: string) {
    this.http.post(`https://localhost:7286/api/User`, {
      username: name,
      userEmail: email,
      password,
      firstName,
      lastName
    })
      .pipe(take(1))
      .subscribe({
        next: c => {
          this.doneWithAddCharacter()
        },
        error: err => {
          this.showError('Opps, something went wrong')
        }
      })
  }

  public addUser(): void {
    this.showRegisterPage = true
    this.showLoginPage = false
    this.showCreateCharacterPage = false
    this.showCharacterPage = false
    this.showCreateCharacterPage = false
  }

  public doneWithAddUser(): void {
    this.showRegisterPage = false
    this.showLoginPage = true
    this.showCreateCharacterPage = false
    this.showCharacterPage = false
    this.showCreateCharacterPage = false
  }





}
