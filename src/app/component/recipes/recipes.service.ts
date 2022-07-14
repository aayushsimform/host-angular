import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShopingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[]=[
      new Recipe('ApplePie','How to make apple pie','https://cdn.pixabay.com/photo/2022/02/11/21/41/cheese-7008088_960_720.jpg',[
          new Ingredient('Apples', 6),
          new Ingredient('Fries',4),
      ]),
      new Recipe('Sandwitches','This is a simply test2','https://www.foodrepublic.com/wp-content/uploads/2015/01/porkbelly_0.jpg',[
          new Ingredient('Apples', 5),
          new Ingredient('Tomatoes',10),
      ]),
      new Recipe('Sandwitches','Veg. Sandwitch','https://media.istockphoto.com/photos/sandwich-and-fries-picture-id1300342890?b=1&k=20&m=1300342890&s=170667a&w=0&h=KUG9-2l8h7TsTC9tmBF_hJJ31nmMiFZNQoNglP80kYE=',[
          new Ingredient('Breads', 5),
          new Ingredient('vegies',10),
      ]),
      new Recipe('Burgers','Double chhese Burger','https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80',[
          new Ingredient('Cheese', 5),
          new Ingredient('Bread',10),
      ])
     ];
 //private recipes: Recipe[] = [];
  constructor(private shopingListService: ShopingListService,private store:Store<fromShoppingList.AppState>) {}
  setRecipe(recipe: Recipe[]) {
    this.recipes = recipe;

    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipe() {
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shopingListService.addIngredients(ingredients);
  }
  getRecipes(index: number) {
    return this.recipes[index];
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
