import * as fs from 'fs';

export class DummyService {
  private db: object;
  constructor() {
    const file: string = fs.readFileSync('dummy_db.json', 'utf-8');
    console.log('file', file);
    this.db = JSON.parse(file);
  }
  create(table, dataToSave): Promise<any> {
    console.log(this.db);
    this.db[table].push(dataToSave);
    fs.writeFileSync('dummy_db.json', JSON.stringify(this.db));
    return dataToSave;
  }
  async findOneById(table, id): Promise<any> {
    const dataFound = await this.db[table].find((item) => item.id === id);
    return dataFound;
  }
  async deleteById(table, id): Promise<boolean> {
    const idxBefore = this.db[table].findIndex((i) => i.id === id);
    if (idxBefore !== -1) this.db[table].splice(idxBefore, 1);
    return idxBefore !== -1;
  }
  async update(table, id, data): Promise<any> {
    console.log(this.db);
    await this.deleteById(table, id);
    data.id = id;
    const dataCreated = await this.create(table, data);
    return dataCreated;
  }
  async findAll(table) {
    return await this.db[table];
  }
}
