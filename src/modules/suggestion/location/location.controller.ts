import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import LocationService from './location.service';

@Controller('opt/location')
export default class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('regions')
  getRegions() {
    return {
      ok: true,
      data: this.locationService.getRegions(),
    };
  }

  @Get('districts/:region')
  getDistricts(@Param('region', ParseIntPipe) region: number) {
    return {
      ok: true,
      data: this.locationService.getDistricts(region),
    };
  }

  @Get('villages/:district')
  getVillages(@Param('district', ParseIntPipe) district: number) {
    return {
      ok: true,
      data: this.locationService.getVillages(district),
    };
  }
}
