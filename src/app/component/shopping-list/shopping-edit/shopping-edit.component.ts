import {
  Component,

  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShopingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';

import * as fromShoppingList from '../store/shopping-list.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slFor!: NgForm;
  subcription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  //  @ViewChild('nameInput',{ static : false})
  // nameInputRef!: ElementRef;
  //  @ViewChild('amountInput',{ static : false})
  // amountInputRef!: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>()
  constructor(private shoppingListService: ShopingListService,private store:Store<fromShoppingList.AppState>) {}
  ngOnInit(): void {
    this.subcription = this.shoppingListService.startedEditing.subscribe(
      (index: number)=>{
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.shoppingListService.getIngredients(index);
            this.slFor.setValue({
              name:this.editedItem.name,
              amount: this.editedItem.amount
            })
          }
    );
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);

    const newIngredient = new Ingredient(value.name, value.amount);
    // this.ingredientAdded.emit(newIngredient);
    if(this.editMode){
     // this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient)
     this.store.dispatch(new ShoppingListActions.UpdateIngredients(newIngredient))
    }
    else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
       //this.shoppingListService.addIngredient(newIngredient);
      
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slFor.reset();
    // this.store.dispatch(new ShoppingListActions.StopEdit);
    this.editMode = false;
  }
  onDelete(){
    //this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredients(this.editedItemIndex))
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
      //this.store.dispatch(new ShoppingListActions.StopEdit);
  }
}
