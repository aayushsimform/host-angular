import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { RecipesComponent } from './component/recipes/recipes.component';
import { RecipeDetailComponent } from './component/recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './component/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './component/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './component/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './component/shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './component/shared/dropdown.directive';
import { ShopingListService } from './component/shopping-list/shopping-list.service';
import { RecipeStartComponent } from './component/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './component/recipes/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecipeService } from './component/recipes/recipes.service';
import { AuthComponent } from './component/auth/auth.component';
import { LoadingSpinnerComponent } from './component/shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './component/shared/alert/alert.component';
import { RecipesModule } from './component/recipes/recipes.module';
import { ShoppingListModule } from './component/shopping-list/shopping-list.module';
import { ShoppingListRoutingModule } from './component/shopping-list/shopping-list-routing.module';
import { RecipesRoutingModule } from './component/recipes/recipes-routing.module';
import { shoppingListReducer } from './component/shopping-list/store/shopping-list.reducer';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer} as ActionReducerMap<any,any> ),
    RecipesModule,
    ShoppingListModule,
    ShoppingListRoutingModule,
    RecipesRoutingModule
  ],
  providers: [ShopingListService, RecipeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
