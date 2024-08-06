import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private password = 'boguszczapla';
  form: any;
  secondForm: FormGroup | undefined;
  thirdForm: FormGroup | undefined;
  passwordControl = new FormControl('');


  testList = [{label: 'test', value: 1}, {label: 'test2', value: 2}, {label: 'test3', value: 3}]

  parentIDList = [2, 12, 21, 32, 44];
  simpleNumberList = [0, 1];
  skillLevelList = [0, 30, 60, 90, 100];
  isMobile: boolean = false;
  isLogged: boolean = true;
  firstSectionFields = [
    { name: 'id', label: 'ID' },
    { name: 'parentID', label: 'ParentID' },
    { name: 'name', label: 'Name' },
    { name: 'isContainer', label: 'IsContainer' },
    { name: 'isMovableObject', label: 'IsMovableObject' },
    { name: 'isUnmovableobject', label: 'IsUnmovableObject' },
    { name: 'isTool', label: 'IsTool' },
    { name: 'isDevice', label: 'IsDevice' },
    { name: 'isDoor', label: 'IsDoor' },
    { name: 'isPremium', label: 'IsPremium' },
    { name: 'maxContSize', label: 'MaxContSize' },
    { name: 'length', label: 'Length' },
    { name: 'maxStackSize', label: 'MaxStackSize' },
    { name: 'unitWeight', label: 'UnitWeight' },
    { name: 'backgndImage', label: 'BackgndImage' },
    { name: 'faceImage', label: 'FaceImage' },
    { name: 'description', label: 'Description' }
  ];

  secondSectionFields = [
    { name: 'id', label: 'ID' },
    { name: 'name', label: 'Name' },
    { name: 'description', label: 'Description' },
    { name: 'startingToolsID', label: 'StartingToolsID' },
    { name: 'skillTypeID', label: 'SkillTypeID' },
    { name: 'skillLvl', label: 'SkillLvl' },
    { name: 'resultObjectTypeID', label: 'ResultObjectTypeID' },
    { name: 'skillDepends', label: 'SkillDepends' },
    { name: 'quantity', label: 'Quantity' },
    { name: 'autorepeat', label: 'Autorepeat' },
    { name: 'isBlueprint', label: 'IsBlueprint' },
    { name: 'imagePath', label: 'ImagePath' }
  ];	
  
  thirdSectionFields = [
    { name: 'id', label: 'ID' },
    { name: 'recipeID', label: 'RecipeID' },
    { name: 'materialObjectTypeID', label: 'MaterialObjectTypeID' },
    { name: 'quality', label: 'Quality' },
    { name: 'influence', label: 'Influence' },
    { name: 'quantity', label: 'Quantity' },
    { name: 'isRegionItemRequired', label: 'IsRegionItemRequired' },
  ];
  
  constructor(private fb: FormBuilder, private clipboard: Clipboard, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.setForm();
    this.isMobile = window.innerWidth > 860;

    this.form?.get('id')?.valueChanges.pipe(debounceTime(300)).subscribe((data: any) => {
      !!data && this.secondForm?.get('resultObjectTypeID')?.patchValue(data);
    });

    this.passwordControl.valueChanges.subscribe((userText) => {
      !!userText && userText === this.password ? this.isLogged = true : this.isLogged = false;
      console.log(userText, this.password, this.isLogged )
    });
  }

  setForm() {
    this.form = this.fb.group({
      id: '',
      parentID: null,
      name: '',
      isContainer: '',
      isMovableObject: '',
      isUnmovableobject: '',
      isTool: '',
      isDevice: '',
      isDoor: '',
      isPremium: '',
      maxContSize: '',
      length: '',
      maxStackSize: '',
      unitWeight: '',
      backgndImage: '',
      faceImage: '',
      description: ''
    });

    this.secondForm = this.fb.group({
      id: '',
      name: '',
      description: '',
      startingToolsID: '',
      skillTypeID: '',
      skillLvl: '',
      resultObjectTypeID: '',
      skillDepends: '',
      quantity: '',
      autorepeat: '',
      isBlueprint: '',
      imagePath: ''
    });

    this.thirdForm = this.fb.group({
      thirdFormContainer: this.fb.array([this.addForm()])
    });
  }

  get thirdFormContainer(): FormArray {
    return this.thirdForm?.get('thirdFormContainer') as FormArray;
  }

  addForm() {
    return this.fb.group({
      id: [''],
      recipeID: [''],
      materialObjectTypeID: [''],
      quality: [''],
      influence: [''],
      quantity: [''],
      isRegionItemRequired: ['']
    });
  }


  resetSingleForm(formIndex: number): void {
    const formGroup = this.thirdFormContainer.at(formIndex) as FormGroup;
    formGroup.reset();
    this.showSnackBar('Form has been reset.', 'warn');
  }

  addNewForm(): void {
    this.thirdFormContainer.push(this.addForm());
    this.showSnackBar('Form has been added.', 'success');
  }

  removeForm(formIndex: number) {
    this.thirdFormContainer.removeAt(formIndex);
    this.showSnackBar('Form has been removed.', 'warn');
  }

  resetForm(sectionType: number) {
    if (sectionType === 1) {
      this.form?.reset();
    } else if (sectionType === 2) {
      this.secondForm?.reset();
    } else {
      this.thirdForm?.reset();
    }
    this.showSnackBar('Form has been reset.', 'warn');
  }

  saveToFile(sectionType: number, form: any) {
    this.replaceUndefinedWithEmptyString(form);
    this.showSnackBar('Loading.', 'success');
    if (sectionType === 1) {
      const content = 
      `<row>
      <ID>${form?.get('id')?.value}</ID>
      <ParentID>${form?.get('parentID')?.value}</ParentID>
      <Name>${form?.get('name')?.value}</Name>
      <IsContainer>${form?.get('isContainer')?.value}</IsContainer>
      <IsMovableObject>${form?.get('isMovableObject')?.value}</IsMovableObject>
      <IsUnmovableObject>${form?.get('isUnmovableobject')?.value}</IsUnmovableObject>
      <IsTool>${form?.get('isTool')?.value}</IsTool>
      <IsDevice>${form?.get('isDevice')?.value}</IsDevice>
      <IsDoor>${form?.get('isDoor')?.value}</IsDoor>
      <IsPremium>${form?.get('isPremium')?.value}</IsPremium>
      <MaxContSize>${form?.get('maxContSize')?.value}</MaxContSize>
      <Length>${form?.get('length')?.value}</Length>
      <MaxStackSize>${form?.get('maxStackSize')?.value}</MaxStackSize>
      <UnitWeight>${form?.get('unitWeight')?.value}</UnitWeight>
      <BackgndImage>${form?.get('backgndImage')?.value}</BackgndImage>
      <FaceImage>${form?.get('faceImage')?.value}</FaceImage>
      <Description>${form?.get('description')?.value}</Description>
      </row>`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.txt';
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (sectionType === 2) {
      const content = 
      `<row>
      <ID>${form?.get('id')?.value}</ID>
      <Name>${form?.get('name')?.value}</Name>
      <Description>${form?.get('description')?.value}</Description>
      <StartingToolsID>${form?.get('startingToolsID')?.value}</StartingToolsID>
      <SkillTypeID>${form?.get('skillTypeID')?.value}</SkillTypeID>
      <SkillLvl>${form?.get('skillLvl')?.value}</SkillLvl>
      <ResultObjectTypeID>${form?.get('resultObjectTypeID')?.value}</ResultObjectTypeID>
      <SkillDepends>${form?.get('skillDepends')?.value}</SkillDepends>
      <Quantity>${form?.get('quantity')?.value}</Quantity>
      <Autorepeat>${form?.get('autorepeat')?.value}</Autorepeat>
      <IsBlueprint>${form?.get('isBlueprint')?.value}</IsBlueprint>
      <ImagePath>${form?.get('imagePath')?.value}</ImagePath>
      </row>`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.txt';
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      const content = 
      `<row>
      <ID>${this.form?.get('id')?.value}</ID>
      <ParentID>${this.form?.get('parentID')?.value}</ParentID>
      <Name>${this.form?.get('name')?.value}</Name>
      <IsContainer>${this.form?.get('isContainer')?.value}</IsContainer>
      <IsMovableObject>${this.form?.get('isMovableObject')?.value}</IsMovableObject>
      <IsUnmovableObject>${this.form?.get('isUnmovableobject')?.value}</IsUnmovableObject>
      <IsTool>${this.form?.get('isTool')?.value}</IsTool>
      <IsDevice>${this.form?.get('isDevice')?.value}</IsDevice>
      <IsDoor>${this.form?.get('isDoor')?.value}</IsDoor>
      <IsPremium>${this.form?.get('isPremium')?.value}</IsPremium>
      <MaxContSize>${this.form?.get('maxContSize')?.value}</MaxContSize>
      <Length>${this.form?.get('length')?.value}</Length>
      <MaxStackSize>${this.form?.get('maxStackSize')?.value}</MaxStackSize>
      <UnitWeight>${this.form?.get('unitWeight')?.value}</UnitWeight>
      <BackgndImage>${this.form?.get('backgndImage')?.value}</BackgndImage>
      <FaceImage>${this.form?.get('faceImage')?.value}</FaceImage>
      <Description>${this.form?.get('description')?.value}</Description>
      </row>`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.txt';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

  replaceUndefinedWithEmptyString(form: any) {
    form && Object.keys(form.controls).forEach(key => {
      const control = form?.get(key);
      if (control?.value === undefined || control?.value === null) {
        control?.setValue('');
      }
    });
  }

  copyThirdFormValues(formIndex: number): void {
    const formGroup = this.thirdFormContainer.at(formIndex) as FormGroup;
    const formValues = formGroup.value;
    const htmlContent = `
    <row>
      <ID>${formValues.id}</ID>
      <RecipeID>${formValues.recipeID}</RecipeID>
      <MaterialObjectTypeID>${formValues.materialObjectTypeID}</MaterialObjectTypeID>
      <Quality>${formValues.quality}</Quality>
      <Influence>${formValues.influence}</Influence>
      <Quantity>${formValues.quantity}</Quantity>
      <IsRegionItemRequired>${formValues.isRegionItemRequired}</IsRegionItemRequired>
    </row>`;
    this.clipboard.copy(htmlContent);
    this.showSnackBar('You copied this row.', 'success');
  }

  copyFirstFormValues(form: any): void {
    const htmlContent = 
    `<row>
      <ID>${form?.get('id')?.value}</ID>
      <ParentID>${form?.get('parentID')?.value}</ParentID>
      <Name>${form?.get('name')?.value}</Name>
      <IsContainer>${form?.get('isContainer')?.value}</IsContainer>
      <IsMovableObject>${form?.get('isMovableObject')?.value}</IsMovableObject>
      <IsUnmovableObject>${form?.get('isUnmovableobject')?.value}</IsUnmovableObject>
      <IsTool>${form?.get('isTool')?.value}</IsTool>
      <IsDevice>${form?.get('isDevice')?.value}</IsDevice>
      <IsDoor>${form?.get('isDoor')?.value}</IsDoor>
      <IsPremium>${form?.get('isPremium')?.value}</IsPremium>
      <MaxContSize>${form?.get('maxContSize')?.value}</MaxContSize>
      <Length>${form?.get('length')?.value}</Length>
      <MaxStackSize>${form?.get('maxStackSize')?.value}</MaxStackSize>
      <UnitWeight>${form?.get('unitWeight')?.value}</UnitWeight>
      <BackgndImage>${form?.get('backgndImage')?.value}</BackgndImage>
      <FaceImage>${form?.get('faceImage')?.value}</FaceImage>
      <Description>${form?.get('description')?.value}</Description>
    </row>`;
    this.clipboard.copy(htmlContent);
    this.showSnackBar('You copied this row.', 'success');
  }

  copySecondFormValues(form: any): void {
    const htmlContent = 
    `<row>
      <ID>${form?.get('id')?.value}</ID>
      <Name>${form?.get('name')?.value}</Name>
      <Description>${form?.get('description')?.value}</Description>
      <StartingToolsID>${form?.get('startingToolsID')?.value}</StartingToolsID>
      <SkillTypeID>${form?.get('skillTypeID')?.value}</SkillTypeID>
      <SkillLvl>${form?.get('skillLvl')?.value}</SkillLvl>
      <ResultObjectTypeID>${form?.get('resultObjectTypeID')?.value}</ResultObjectTypeID>
      <SkillDepends>${form?.get('skillDepends')?.value}</SkillDepends>
      <Quantity>${form?.get('quantity')?.value}</Quantity>
      <Autorepeat>${form?.get('autorepeat')?.value}</Autorepeat>
      <IsBlueprint>${form?.get('isBlueprint')?.value}</IsBlueprint>
      <ImagePath>${form?.get('imagePath')?.value}</ImagePath>
    </row>`;
    this.clipboard.copy(htmlContent);
    this.showSnackBar('You copied this row.', 'success');
  }

  showSnackBar(message: string, type: 'success' | 'warn'): void {
    this.snackBar.open(message, '', {
      duration: 1500,
      panelClass: type
    });
  }

}