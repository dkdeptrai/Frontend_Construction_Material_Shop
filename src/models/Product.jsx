class Product {
  constructor(
    id = null,
    name = "",
    origin = "",
    imageUrl = "",
    description = "",
    unitPrice = null,
    calculationUnit = "",
    quantitySolved = 0,
    quantityRemaining = 0,
    isDeleted = false
  ) {
    this.id = id;
    this.name = name;
    this.origin = origin;
    this.imageUrl = imageUrl;
    this.description = description;
    this.unitPrice = unitPrice;
    this.calculationUnit = calculationUnit;
    this.quantitySolved = quantitySolved;
    this.quantityRemaining = quantityRemaining;
    this.isDeleted = isDeleted;
  }
}

export default Product;
