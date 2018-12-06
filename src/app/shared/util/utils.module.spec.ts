import { UtilsModule } from './utils.module';

describe('TimeModule', () => {
    let timeModule: UtilsModule;

    beforeEach(() => {
        timeModule = new UtilsModule();
    });

    it('should create an instance', () => {
        expect(timeModule).toBeTruthy();
    });
});
