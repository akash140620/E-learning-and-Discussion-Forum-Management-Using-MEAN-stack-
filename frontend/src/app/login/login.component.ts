
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {provideHttpClient} from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mail:any;
  password:any;
  constructor(private route:Router, private http:HttpClient){ }
   
  onsubmit(){
    alert(this.mail);

    const data={
      email:this.mail,
      password:this.password
    }
    let a=this.http.post("http://localhost:3000/loginUser",data).subscribe((response)=>{
      if(response=="success"){
        this.route.navigateByUrl("/home")}
        else alert(response);
    },(error)=>{
      console.log(error);
    });
    

  }
}