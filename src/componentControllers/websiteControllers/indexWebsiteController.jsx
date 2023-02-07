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

  OurTeamCOmponent = () => {

    let companie_id = 1;

    this.indexOfCompanie = this.PostSecurities ? companie_id : this.indexOfCompanie;

    return this.database.ourTeamContents[this.indexOfCompanie];
  }

}