import { Injectable, OnModuleInit } from '@nestjs/common';
import LocationEntity from './entity/location.entity';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

@Injectable()
export default class LocationRepository implements OnModuleInit {
  private dataPath = path.join(process.cwd(), 'src', 'assets', 'location');
  regions: LocationEntity[] = [];
  districts: LocationEntity[] = [];
  villages: LocationEntity[] = [];

  onModuleInit() {
    this.regions = this.readFromFile('regions.json');
    this.districts = this.readFromFile('districts.json');
    this.villages = this.readFromFile('villages.json');
  }

  readFromFile(fileName: string): LocationEntity[] {
    const regionsRaw = fs
      .readFileSync(path.join(this.dataPath, fileName), 'utf-8')
      .replace(/^\uFEFF/, '');
    const data: any[] = JSON.parse(regionsRaw) as any[];

    return data.map((item) => {
      const location = new LocationEntity(item['id'], item['name_uz'], item['name_ru']);

      if (item['region_id']) {
        location.parent = item['region_id'];
      }

      if (item['district_id']) {
        location.parent = item['district_id'];
      }

      return location;
    });
  }
}
