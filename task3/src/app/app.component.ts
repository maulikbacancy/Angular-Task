import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/sevices/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor() {}

  ngOnInit(): void {
  }  
}
