import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
// import { EventEmitter } from 'stream';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input()
  recipe!: Recipe;
  @Input() index! : number;
  // @Output() recipeSelected = new EventEmitter<void>();
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  //  onSelected(){
  //    this.recipeService.recipeSelected.emit(this.recipe);
  //  }
}
