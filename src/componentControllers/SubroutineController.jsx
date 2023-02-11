import database from "../database.json";

export default class subroutineController {

  constructor() {

    this.PostSecurities = false;

    this.indexOfCompanie = 0;

    this.CompanieName = false;

    this.database = database;

    console.debug("Subroutine Class Initialized");
  }

  removeArrayDuplicates = (arrai) => {

    return [...new Set(arrai)];
  }

  arraiSearchMatchingCriteria = (arrai, element_value, search_value) => {

    element_value = element_value !== null ? JSON.parse('{"element":"' + element_value + '"}') : element_value;

    let element = element_value === null ? '' : Object.values(element_value)[0];
    let id = element_value === null ? '' : Object.keys(element_value)[0];

    return arrai.find(element => element.id == search_value);
  }

  personalizedCompanieBrand = () => {

    let brandedCompanies = [];

    switch (this.PostSecurities) {

      case true:

        brandedCompanies = database.companies[1];
        break;

      case false:

        brandedCompanies = database.companies[0];
        break;

      default:

        brandedCompanies = database.companies[0];
        break;
    }

    this.CompanieName = brandedCompanies.companieName;

    return brandedCompanies;
  }

  applicationNavigations = () => {

    let navigations = [];

    database.navigations.forEach((navigation) => {

      switch (this.PostSecurities) {

        case true:

          navigations.push(navigation);
          break;

        case false:
          if (!navigation.authenticate) {


            navigations.push(navigation);
          }
          break;

        default:
          navigations = [];
          break;
      }
    });

    return { "navigations": navigations, "companieAsBaseuri": this.personalizedCompanieBrand().companiecommonName.toLowerCase() };
  }
}