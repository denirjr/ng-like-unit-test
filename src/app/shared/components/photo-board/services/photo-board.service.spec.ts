import { TestBed } from '@angular/core/testing';
import { PhotoBoardService } from './photo-board.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

const mockData = {
  api: 'http://localhost:3000/photos',
  data: [
    {
      id: 1,
      description: 'batata 1',
      src: '',
    },
    {
      id: 2,
      description: 'batata 2',
      src: '',
    },
  ],
};

describe(PhotoBoardService.name, () => {
  let service: PhotoBoardService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoBoardService],
    });

    service = TestBed.inject(PhotoBoardService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it(`#${PhotoBoardService.prototype.getPhotos.name} should return photos with description in upper case`, (done) => {
    service.getPhotos().subscribe((photos) => {
      expect(photos[0].description).toBe('BATATA 1');
      expect(photos[1].description).toBe('BATATA 2');
      done();
    });
    httpController.expectOne(mockData.api).flush(mockData.data);
  });
});
