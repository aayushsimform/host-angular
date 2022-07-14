import { Component, OnInit } from '@angular/core';

import { AuthService } from './component/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title!: string;
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.title = 'my-project'
    this.authService.autoLogin()
  }
 
}
