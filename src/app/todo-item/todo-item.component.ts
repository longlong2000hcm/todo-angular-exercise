import {
  Component,
  ElementRef,
  inject,
  Input,
  NgZone,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../todo.interface';
import { TodoService } from '../_services/todo.service';

@Component({
  selector: 'app-list-item',
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  standalone: true,
})
export class TodoItemComponent {
  @ViewChild('text') text?: ElementRef;

  @Input({ required: true }) item!: Todo;
  @Input({ required: true }) filter!: string;

  todoService = inject(TodoService);

  edit = false;
  constructor(private _ngZone: NgZone) {
    //empty
  }

  sendChecked() {
    this.todoService.updateTodo({
      ...this.item,
      complete: !this.item.complete,
    });
  }

  sendEdit(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.value != this.item['name']) {
      this.todoService.updateTodo({ ...this.item, name: target.value });
    }
    this.edit = false;
    target.blur();
  }

  sendDelete() {
    this.todoService.deleteTodo(this.item);
  }

  openEdit() {
    this.edit = true;
    const editInput = document.getElementById(
      '' + this.item.id
    ) as HTMLInputElement;
    this._ngZone.runOutsideAngular(() => {
      setTimeout(() => editInput.focus());
    });
  }

  handleBlur = () => {
    this.edit = false;
    const editInput = document.getElementById(
      '' + this.item.id
    ) as HTMLInputElement;
    editInput.value = this.item.name;
  };
}
