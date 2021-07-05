import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  show =false;
  selectedCountry: any;

  cities = {};

  countries = [{
    id: 1, name: 'Amazon Web Services',
     cities: ['US West (Oregon)', 'US East (Northern Virginia)', 
    'US East (Ohio)']
  },
  {
    id: 2, name: 'Google Cloud Platform', cities: ['US Central (Iowa)', 'Europe West (Netherlands)', 'Europe West (London)']
  },
  {
    id: 3, name: 'Microsoft Azure',cities: ['West US 2 (Washington)', 'Central US (Iowa)', 'East US 2 (Virginia)']
  },
  ];

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.userValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        // firstName: ['', Validators.required],
        // lastName: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      this.cities = this.countries.filter(x => x.id == 1)[0].cities;
  }

 

  onChange(deviceValue) {
    this.cities = this.countries.filter(x => x.id == deviceValue)[0].cities;
    console.log('cities',this.cities)
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
     
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
    
      this.loading = true;
      this.authenticationService.signup(this.f.username.value, this.f.password.value,
        )
          .pipe(first())
          .subscribe({
              next: () => {
                  // get return url from query parameters or default to home page
                  // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                  // this.router.navigateByUrl(returnUrl);
              },
              error: error => {
                  this.error = error;
                  this.loading = false;
              }
          });
        
  }

  region(){
      this.show = true;
      console.log('true')
  }

}
