import { Test, TestingModule } from '@nestjs/testing';
import { DriverListService } from './driver-list.service';

describe('DriverListService', () => {
  let service: DriverListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverListService],
    }).compile();

    service = module.get<DriverListService>(DriverListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
