import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { PhotoFrameModule } from '../../photo-frame/photo-frame.module';
import { Photo } from '../interfaces/photo';
import { PhotoBoardModule } from '../photo-board.module';

@Injectable()
export class PhotoBoardService {
  constructor(private http: HttpClient) {}

  public getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3000/photos').pipe(
      map((photos) =>
        photos.map((photo) => {
          return { ...photo, description: photo?.description.toUpperCase() };
        })
      ),
      tap(console.log),
      delay(2000)
    );
  }
}
