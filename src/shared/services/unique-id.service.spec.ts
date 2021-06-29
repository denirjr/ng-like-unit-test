import { UniqueIdService } from './unique-id.service';

let service: UniqueIdService = null;

describe(UniqueIdService.name, () => {
  beforeEach(() => {
    service = new UniqueIdService();
  });

  it(`#generatedUniqueIdWithPrefix should generate id when called with prefix`, () => {
    const id = service.generatedUniqueIdWithPrefix('app');

    expect(id.startsWith('app-')).toBeTrue();
  });

  it('Should not generate duplicated Ids when call multiple times', () => {
    const ids = new Set();

    for (let i = 0; i < 50; i++) {
      ids.add(service.generatedUniqueIdWithPrefix('app'));
    }

    expect(ids.size).toBe(50);
  });

  it('Should return the number if generatedIds when called', () => {
    service.generatedUniqueIdWithPrefix('app');
    service.generatedUniqueIdWithPrefix('app');
    expect(service.getNumberOfUniqueIds()).toBe(2);
  });

  it('Should throw when called with empty', () => {
    const emptyValues = [null, undefined, '', '0'];

    emptyValues.forEach((emptyValue) =>
      expect(() => service.generatedUniqueIdWithPrefix(emptyValue))
        .withContext(`${emptyValue}`)
        .toThrow()
    );
  });
});
