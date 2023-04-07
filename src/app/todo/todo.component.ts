import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CdkDragDrop ,moveItemInArray ,transferArrayItem } from '@angular/cdk/drag-drop';
import { ITask } from '../model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
todoForm !:FormGroup;
tasks:ITask[]=[];
inprogress:ITask[]=[];
done :ITask[]=[];
updateId!:any;
isEditEnabled : boolean =false;

constructor(private fb:FormBuilder){}
 

public ngOnInit():void{
  this.todoForm=this.fb.group({
    item : ['', Validators.required]
  })
}
public updateTask(){
  this.tasks[this.updateId].description = this.todoForm.value.item;
  this.tasks[this.updateId].done=false;
  this.todoForm.reset();
  this.updateId =undefined;
  this.isEditEnabled = false;
}
public addTask(){
  this.tasks.push({
    description:this.todoForm.value.item,
    done:false
  })
}
/**
 * name
 */
public  onEdit(item:ITask,i : Number){
  this.todoForm.controls['item'].setValue(item.description);
  this.updateId = i;
  this.isEditEnabled =true ;
}
public deleteTask(i: number){
  this.tasks.splice(i,1)
}
public deleteTaskInprogress(i: number){
  this.inprogress.splice(i,1)
}

public deleteTaskdone(i: number){
  this.done.splice(i,1)
}


public drop(event: CdkDragDrop<ITask[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
}
