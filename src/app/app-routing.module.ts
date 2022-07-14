import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { AuthGuard } from './component/auth/auth.guard';
import { RecipesComponent } from './component/recipes/recipes.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
   {path: 'recipe',loadChildren:()=> import("./component/recipes/recipes.module").then(m=> m.RecipesModule)},
   {path: 'shopping-list',loadChildren:()=> import("./component/shopping-list/shopping-list.module").then(m=> m.ShoppingListModule)},
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
