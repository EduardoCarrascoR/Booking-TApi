import { FallbackExceptionFilter } from './fallback.filter';

describe('FallbackFilter', () => {
  it('should be defined', () => {
    expect(new FallbackExceptionFilter()).toBeDefined();
  });
});
