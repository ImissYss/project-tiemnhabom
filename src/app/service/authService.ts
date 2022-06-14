import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  isLoggedIn = false;
  constructor(private auth: AngularFireAuth) {
  }

  async signin(phone: string, password: string){
    await this.auth.signInWithEmailAndPassword(phone, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(res.user))
      })
  }

  async signup(form: any){
    await this.auth.createUserWithEmailAndPassword(form.phone, form.password)
      .then(res => {
        console.log("sign up ok")
        this.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(res.user))
      })
  }

  logout(){
    this.auth.signOut();
    localStorage.removeItem('user');
  }

}
