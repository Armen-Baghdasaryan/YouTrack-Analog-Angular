import { Injectable, OnInit, inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { catchError, map, Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService implements OnInit {
  constructor(
    private fireStorage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {}

  // Create
  createProject(props: any) {
    if (!props) return;

    const id = this.firestore.createId();
    props.id = id;
    return of(this.firestore.doc(`projects/${id}`).set(props)).pipe(
      map(() => {}),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

  // Read
  getProject(id: string): Observable<any> {
    return this.firestore.doc(`projects/${id}`).get();
  }

  // Read All
  getProjects(): Observable<any> {
    return this.firestore.collection<any>('projects').valueChanges();
  }

  //Upload file
  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const path = `files/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);
    }
  }

  // Update
  updateProject(props: any): Observable<any | null> {
    // console.log(props);
    return of(this.firestore.doc(`projects/${props.id}`).update(props)).pipe(
      map(() => props),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

  // Delete
  deleteProject(id: string): Observable<void | null> {
    return of(this.firestore.doc(`projects/${id}`).delete()).pipe(
      map(() => {}),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }
}
