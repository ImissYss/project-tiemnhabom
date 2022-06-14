export class Random{
    getRandomInt(min: any, max: any): any{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
