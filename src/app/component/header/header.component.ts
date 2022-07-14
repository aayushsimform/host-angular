import { Component, OnInit, Output , EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  isAuthenticated = false;
  private userSub!: Subscription;
  // @Output() featureSelected = new EventEmitter<string>();
  // onSelect(feature: string){
  //       this.featureSelected.emit(feature);
  // }
  constructor(private dataStorageService:DataStorageService , private authServise: AuthService) { }
   
   ngOnInit() {
      this.userSub = this.authServise.user.subscribe(user =>{
        console.log(user);
        
            this.isAuthenticated= !!user ;
            console.log(!user);
            console.log(!!user);
            console.log(this.isAuthenticated);
            

            
      });
   }
   onSaveData(){
    this.dataStorageService.storeRecipes();
    
  }
  onLogout(){
    this.authServise.Logout();
    
  }
   onFetchData(){
     this.dataStorageService.fetchRecipes().subscribe();
   }
   ngOnDestroy() {
     this.userSub.unsubscribe();
     console.log(this.isAuthenticated);
  }
 
}
