import { Injectable } from '@nestjs/common';
import LocationRepository from './location.repository';

@Injectable()
export default class LocationService {
  constructor(private locationRepository: LocationRepository) {}

  getRegions() {
    const regions = this.locationRepository.regions;

    return {
      ok: true,
      data: regions,
    };
  }

  getDistricts(regionId: number) {
    const districts = this.locationRepository.districts.filter(
      (district) => district.parent === regionId,
    );

    return {
      ok: true,
      data: districts,
    };
  }

  getVillages(districtId: number) {
    const villages = this.locationRepository.villages.filter(
      (village) => village.parent === districtId,
    );

    return {
      ok: true,
      data: villages,
    };
  }
}
