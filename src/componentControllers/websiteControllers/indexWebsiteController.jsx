import Subroutines from "../SubroutineController";

export default class IndexController extends Subroutines {

  IndexSlideComponent = () => {

    return this.database.homeSlides;
  }

  AboutComponent = () => {

    let companie_id = 1;

    this.indexOfCompanie = this.PostSecurities ? companie_id : this.indexOfCompanie;

    return this.database.aboutContents[this.indexOfCompanie];
  }

  ProductServiceComponent = () => {

    let companie_id = 1;

    this.indexOfCompanie = this.PostSecurities ? companie_id : this.indexOfCompanie;

    return this.database.productServiceContents[this.indexOfCompanie];
  }

  OurTeamComponent = () => {

    let companie_id = 1;

    let companie_data = this.database.companies;

    this.indexOfCompanie = this.PostSecurities ? companie_id : this.indexOfCompanie;

    let TeamMembers = this.database.ourTeamContents[this.indexOfCompanie];

    return [TeamMembers, companie_data.find(companie => companie.id === TeamMembers.comapanie_id)];
  }

}