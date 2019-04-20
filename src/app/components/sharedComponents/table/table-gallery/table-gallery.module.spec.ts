import { TableGalleryModule } from './table-gallery.module';

describe('TableGalleryModule', () => {
  let tableGalleryModule: TableGalleryModule;

  beforeEach(() => {
    tableGalleryModule = new TableGalleryModule();
  });

  it('should create an instance', () => {
    expect(tableGalleryModule).toBeTruthy();
  });
});
