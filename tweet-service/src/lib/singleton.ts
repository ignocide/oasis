class Singleton {
  static instances: Map<string, any> = new Map<string, any>();

  static getInstance(): any {
    const target: any = this
    if (!this.instances.get(target.name)) {
      this.instances.set(target.name, new target());
    }
    return this.instances.get(target.name)
  }

}


// function Singleton(target:any):any{
//   let instance:any = target._instance;
//   if(!target._instance){
//     instance = new target();
//     target._instance = instance;
//     console.log("create instace",target.name)
//   }
//
//   console.log('instance',instance)
//
//   return instance
// }
export default Singleton

