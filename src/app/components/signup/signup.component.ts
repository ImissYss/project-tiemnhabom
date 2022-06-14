import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NavigatorService} from "../../service/navigator.service";
import Validation from "../../utils/validation";
import {DOCUMENT} from "@angular/common";
import {AuthService} from "../../service/authService";
import {WindowService} from "../../service/window.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import {environment} from "../../../environments/environment";
// import auth = firebase.auth;

const firebaseApp = firebase.initializeApp(environment.firebase);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {


  form: FormGroup;
  hidden = true;
  pss: string = 'password';
  submitted = false;
  isSuccessful = false;
  errorMessage = '';

  phoneNumber: string;
  otp: string;
  phoneSignIn = false;
  windowRef: any;
  disableSendOtpButton = true;

  constructor(private authService: AuthService,
              public afAuth: AngularFireAuth,
              private formBuilder : FormBuilder,
              private route: Router,
              private navigator: NavigatorService,
              @Inject(DOCUMENT) private document: Document,
              private windowService: WindowService) {
    this.windowRef = this.windowService.windowRef;
  }

  sendOTP(){
    this.afAuth.signInWithPhoneNumber(this.phoneNumber, this.windowRef.recaptchaVerifier).then((confirmationResult) => {
      this.windowRef.confirmationResult = confirmationResult;
    })
  }

  verifyOTP(){
    this.windowRef.confirmationResult.confirm(this.otp)
      .then((userCredentials) => console.log(userCredentials));
  }

  ngOnInit(): void {
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{
        size: 'normal',
        callback: (response) => {
          //TODO
          this.disableSendOtpButton = false;
        }
      }
    )
    this.windowRef.recaptchaVerifier.render();
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
    this.form = this.formBuilder.group(
      {
        phone: ['', [
          Validators.required
        ]],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]],
        matchingPassword: ['', [
          Validators.required,

        ]]
      },
      {
        validators: [Validation.match('password', 'matchingPassword')]
      }
    )
  }
  ngAfterViewInit() {

  }

  showPass(){
    this.pss = 'text';
    this.hidden = false;
  }
  hiddenPass(){
    this.pss = 'password';
    this.hidden = true;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid){
      return;
    }
    this.authService.signup(this.form.value)


  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


}
