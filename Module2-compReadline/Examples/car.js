class Car {
    constructor(name) {
      this.name = name;
    }
  
    show() {
      return this.name;
    }
  }
  
  exports.Car = new Car("Tesla");