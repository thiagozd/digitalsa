import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
 list = [];
 listItem = [];


 public novoForm: FormGroup
 public novoItemForm: FormGroup
  //FormGroup serve para gerar um grupo de inputs, FormBuilder trabalha junto

  constructor(private formBuild:FormBuilder) { }

  ngOnInit(): void {
    this.iniciarForm();
  }
  iniciarForm(){
    this.novoForm = this.formBuild.group({
      title:['', Validators.required],
	  desc:['', Validators.required],
	  list:['']
	})
	this.novoItemForm = this.formBuild.group({
		ckeckList:[''],
		descList:['', Validators.required]
	  })
	// AsyncStorage armazenamento local
	if(localStorage.getItem('Lista')){
		this.list =JSON.parse(localStorage.getItem('Lista'))
	}
  }

//   card
  onSubmit(model:any){
	model.list = this.listItem;
	this.list.push(model);
	localStorage.setItem('Lista', JSON.stringify(this.list));
	this.novoForm.reset();
	this.listItem = [];

  }
  //itens do card
  onSubmitList(model:any){
	this.listItem.push(model);
	if(model.ckeckList == "" || model.ckeckList == null){
		model.ckeckList = false
	}
	this.novoItemForm.reset();
  }
  
  excluirItem(obj){
	var t =this.list.findIndex(x=>x.title== obj['title'])
	this.list.splice(t);
	localStorage.setItem('Lista', JSON.stringify(this.list));
  }
}
