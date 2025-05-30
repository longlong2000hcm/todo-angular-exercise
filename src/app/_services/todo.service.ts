import { inject, Injectable } from '@angular/core';
import { Todo, todoTypeCheck } from '../todo.interface';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  writeBatch,
  onSnapshot,
  getFirestore,
} from 'firebase/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  authenticationService = inject(AuthenticationService);
  firestore = getFirestore();
  todoList: any = [];
  error = false;
  search = '';

  loadTodoList = () => {
    const uid = this.authenticationService.auth.currentUser?.uid;
    if (!uid) {
      return;
    }
    const collectionRef = collection(
      this.firestore,
      'users/' + this.authenticationService.auth.currentUser?.uid + '/todos'
    );

    onSnapshot(
      collectionRef,
      (snapshot) => {
        this.todoList = snapshot.docs.map((e) => {
          return { ...e.data(), dbId: e.id };
        });
      },
      (err) => {
        this.error = true;
        console.log('load todos error', err);
      }
    );
  };

  addTodo = async (item: Todo) => {
    if (todoTypeCheck(item) == false) {
      console.log('failed type check at addTodo', item);
      return;
    }
    try {
      const newTodoItemRef = await addDoc(
        collection(
          this.firestore,
          'users/' + this.authenticationService.auth.currentUser?.uid + '/todos'
        ),
        item
      );
      console.log('successfully added item to db', newTodoItemRef);
      return newTodoItemRef;
    } catch (error) {
      console.log('Error writing new message to Firebase Database', error);
      return;
    }
  };

  updateTodo = async (item: Todo) => {
    if (todoTypeCheck(item) == false) {
      console.log('failed type check at updateTodo', item);
      return;
    }
    if (item['dbId'] == undefined) {
      return;
    }
    try {
      const docRef = doc(
        this.firestore,
        'users/' + this.authenticationService.auth.currentUser?.uid + '/todos',
        item['dbId']
      );
      delete item['dbId'];
      await updateDoc(docRef, { ...item });
    } catch (error) {
      console.log('updateTodo error', error);
      return;
    }
  };

  deleteTodo = async (item: Todo) => {
    if (todoTypeCheck(item) == false) {
      console.log('failed type check at deleteTodo', item);
      return;
    }
    if (item['dbId'] == undefined) {
      return;
    }
    try {
      const docRef = doc(
        this.firestore,
        'users/' + this.authenticationService.auth.currentUser?.uid + '/todos',
        item.dbId
      );
      await deleteDoc(docRef);
      return;
    } catch (error) {
      console.log('delete failed, error:', error);
      return;
    }
  };

  deleteAllComplete = async () => {
    if (!this.todoList) {
      return;
    }
    const batch = writeBatch(this.firestore);
    for (const item of this.todoList) {
      if (todoTypeCheck(item) && item['complete'] == true) {
        const docRef = doc(
          this.firestore,
          'users/' +
            this.authenticationService.auth.currentUser?.uid +
            '/todos',
          item['dbId']
        );
        batch.delete(docRef);
      }
    }
    try {
      await batch.commit();
    } catch (error) {
      console.log('delete all complete error', error);
    }
  };

  markAllDb = async (complete: boolean) => {
    const batch = writeBatch(this.firestore);
    for (const item of this.todoList) {
      const docRef = doc(
        this.firestore,
        'users/' + this.authenticationService.auth.currentUser?.uid + '/todos',
        item['dbId']
      );
      batch.update(docRef, { complete: complete });
    }
    try {
      await batch.commit();
    } catch (error) {
      console.log('mark all error', error);
    }
  };

  clearCache = () => {
    this.todoList = [];
    this.error = false;
  };
}
