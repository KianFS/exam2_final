import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private firestore: Firestore) {}

  private get tasksCol(): CollectionReference<DocumentData> {
    return collection(this.firestore, 'tasks');
  }

  getTasks(): Observable<Task[]> {
    return collectionData(this.tasksCol, { idField: 'id' }) as Observable<
      Task[]
    >;
  }

  /** add a brand‑new task */
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
