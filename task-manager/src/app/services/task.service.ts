import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  CollectionReference,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly tasksCol: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.tasksCol = collection(this.firestore, 'tasks');
  }

  getTasks(): Observable<Task[]> {
    return collectionData(this.tasksCol, { idField: 'id' }) as Observable<
      Task[]
    >;
  }

  addTask(title: string): Promise<void> {
    return addDoc(this.tasksCol, { title, completed: false }).then(() => {});
  }

  toggleTaskCompletion(task: Task): Promise<void> {
    if (!task.id) {
      return Promise.reject('Missing task id');
    }
    const ref = doc(this.firestore, 'tasks', task.id);
    return updateDoc(ref, { completed: !task.completed });
  }
}
