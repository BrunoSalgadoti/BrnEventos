import { DateTimeFormatPipe } from './DateTimeFormat.pipe';

describe('Pipe: DateTimeFormate', () => {
  it('create an instance', ()  => {
    let pipe = new DateTimeFormatPipe("dd/MM/yyyy");
    expect(pipe).Throw();
  });
});
