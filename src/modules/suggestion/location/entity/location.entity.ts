export default class LocationEntity {
  id: number;
  nameUz: string;
  nameRu: string;
  parent: number | null = null;

  constructor(id: number, nameUz: string, nameRu: string) {
    this.id = id;
    this.nameUz = nameUz;
    this.nameRu = nameRu;
  }
}
