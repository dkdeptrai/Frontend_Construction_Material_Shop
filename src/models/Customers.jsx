class Customer {
  constructor(
    id = null,
    name = "",
    phone = "",
    dateOfBirth = null,
    contactAddress = "",
    taxCode = "",
    isDeleted = false
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.dateOfBirth = dateOfBirth;
    this.contactAddress = contactAddress;
    this.taxCode = taxCode;
    this.isDeleted = isDeleted;
  }
}
