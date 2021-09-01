class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
import { Component , OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../User.service';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router'
@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})

export class AddMealComponent implements OnInit {
  public navToggled = false;
  public ingredients: string[]; 
  public instructions;
  public submitted = false;
  public submitSuccess = false;
  private imgFile: File;
  public imgTemp1_Readonly = false;
  public imgTemp2_Readonly = false;
  public foodForm: any; 
  public selectedImg: ImageSnippet;
  addOnBlur = true;
  public username: string;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];

  constructor(private _userService: UserService, private router: Router) { }
  logOut() { 
    this._userService.logOut();
    window.location.reload();
  }

  ngOnInit(): void {
    this.foodForm = new FormGroup({
      imgTemp: new FormControl(null, Validators.required),
      img: new FormControl(null),
      title: new FormControl('', Validators.required), 
      shortDesc: new FormControl('', Validators.required),
      serving: new FormControl('', Validators.required),
      calories: new FormControl(null, [Validators.required, Validators.min(0)]), 
      protein: new FormControl(null, [Validators.required, Validators.min(0)] ), 
      carb: new FormControl(null, [Validators.required, Validators.min(0)]), 
      fat: new FormControl(null, [Validators.required, Validators.min(0)]), 
      ingredients: new FormArray([], [Validators.required]), 
      instructions: new FormArray([], Validators.required), 
      tags: new FormArray([], Validators.required),
      in_plan: new FormControl(false), 
      user_id : new FormControl(this._userService.readToken()._id)
    }); 
    this.ingredients = [];
    this.username = this._userService.readToken().username;
    console.log(this.foodForm);
    
    var allClasses = [];
    var allElements = document.querySelectorAll('*');
    for (var i = 0; i < allElements.length; i++) {
      var classes = allElements[i].className.toString().split(/\s+/);
      for (var j = 0; j < classes.length; j++) {
        var cls = classes[j];
        if (cls && allClasses.indexOf(cls) === -1)
          allClasses.push(cls);
      }
    }

    console.log(allClasses);
  }
  get ingredientControls() {
    return (<FormArray>this.foodForm.get('ingredients')).controls;
  }
  get instructionControls() {
    return (<FormArray>this.foodForm.get('instructions')).controls;
  }
  sideNavToggle(): void {
    this.navToggled = !this.navToggled;
  }
  integerOnly(event: any) {
    return event.charCode >= 48 || event.charCode == 46;
  }
  addIngredient(): void {
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.foodForm.get('ingredients')).push(control);
    this.submitted = false;
  }
  removeIngredient(): void {
    (<FormArray>this.foodForm.get('ingredients')).removeAt(this.foodForm.get('ingredients').length - 1); 
  }
  addInstruction(): void {
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.foodForm.get('instructions')).push(control);
  }
  removeInstruction(): void {
    (<FormArray>this.foodForm.get('instructions')).removeAt(this.foodForm.get('instructions'))
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
  tagChange($event): void {
    console.log($event);
  }

  onSubmit() {
    console.log(this.foodForm);
    this.submitted = true;
    if(this.foodForm.status == "VALID") {
      this.submitSuccess = true;
      this.uploadImg()
      .then((res) => {
        this.foodForm.removeControl('imgTemp');
        this._userService.addFoodPost(this.foodForm.value).subscribe(
          (success) => {  
            alert(`Creating ${this.foodForm.controls['title'].value} successfully`);
            this.router.navigate(['/single-meal', success.id]);
          }, 
          (error) => console.log(error) 
        );
      })
      .catch((err) => {
        this.foodForm.status = "INVALID"; 
        this.submitted = false;
        alert(err);
      })
    }
  }
  disableImgInput(imgInput: any) {
    console.log(this.imgTemp1_Readonly, this.imgTemp2_Readonly)
    if(imgInput.id == "imgTemp1")
      this.imgTemp2_Readonly = !this.imgTemp2_Readonly; 
    else if(imgInput.id == "imgTemp2")
      this.imgTemp1_Readonly = !this.imgTemp1_Readonly;
    console.log(this.imgTemp1_Readonly, this.imgTemp2_Readonly)

  }
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const control = new FormControl(value, Validators.required);
    if(value) {
      this.tags.push(value);
      (<FormArray>this.foodForm.get('tags')).push(control);
    }
    if(event.input) 
      event.input.value = '';
  }
  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag); 
    if(index >= 0) {
      this.tags.splice(index, 1);
      (<FormArray>this.foodForm.get('tags')).removeAt(index);
    }
  }
  hasError(controlName: string, errorType: string) : boolean {
    if(this.submitted == true)
      return this.foodForm.controls[controlName].hasError(errorType);
  }
  hasArrayError(arrayName: string, errorType: string, controlName: any = null) : boolean {
    if(this.submitted) {
    let control = <FormArray>this.foodForm.get(arrayName)
    if(controlName == null)
      return control.hasError(errorType);
    return control.controls[controlName].hasError(errorType);
    }
  }
  processImg(imgInput: any) : void {
    const file: File = imgInput.files[0]; 
    this.imgFile = file;
  }
  uploadImg() {
    return new Promise((resolve, reject) => {
      if(this.imgFile) {
        console.log('in');
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
          this.selectedImg = new ImageSnippet(event.target.result, this.imgFile);
  
          this._userService.getImgUrl(this.selectedImg.file).subscribe(
            (res) => {
              console.log('string: ', res);
              this.foodForm.controls['img'].setValue(res[0].toString());
              console.log('here');
              resolve('uploaded');
            },
            (err) => {
              console.log(err);
              reject(err);
            })
        });
        
        reader.readAsDataURL(this.imgFile);
        
      }
      else if(this.foodForm.controls['imgTemp'].value) {
        this.foodForm.controls['img'].setValue(this.foodForm.controls['imgTemp'].value); 
        resolve('got an URL string'); 
      }
      else 
        reject('img upload failed, unknown reason!') //there was no else here, the if condition check was faster than those observables subscription
    })
    
  }
  
}
