import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { map,tap,take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService:AuthService) {}
  storeRecipes() {
    const recipe = this.recipeService.getRecipe();
    return this.http
      .put(
        'https://ng-course-recipe-book-8460a-default-rtdb.firebaseio.com/recipes.json',
        recipe
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchRecipes() { 
    this.authService.user.pipe(take(1)).subscribe(user =>{

    })
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
         console.log(` aaaa:${user?.token}`);
         
        
        return this.http.get<Recipe[]>(
          'https://ng-course-recipe-book-8460a-default-rtdb.firebaseio.com/recipes.json',
          {
            //params: new HttpParams().set('auth', user.token)
          }
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipe(recipes);
      })
    );
  }
}
    // this.http
    //   .get<Recipe[]>(
    //     'https://ng-course-recipe-book-8460a-default-rtdb.firebaseio.com/recipes.json'
    //   )
    //   .subscribe(recipes=> this.recipeService.setRecipe(recipes)
    //   );
     
    //  return this.http
    //       .get<Recipe[]>(
    //         'https://ng-course-recipe-book-8460a-default-rtdb.firebaseio.com/recipes.json'
    //       )
    //       .pipe(
    //         map(recipes => {
    //             console.log(recipes);
                
    //           return recipes.map(recipe => {
    //             return {
    //               ...recipe,
    //               ingredients: recipe.ingredients ? recipe.ingredients : []
    //             };
    //           });
    //         }),tap(recipes => {
    //             console.log(recipes);
    //             this.recipeService.setRecipe(recipes);
    //           })
    //       )
  //    }
//  }

