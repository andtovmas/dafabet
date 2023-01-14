import { DATA } from "../utils/data";

describe("Unix TimeStamp Converter Application Programming Interface (API)", () => {
  it("To Convert From Date String to Unix TimeStamp", () => {
    cy.request({
      url: `${Cypress.env('apiUrl')}?cached&s=${DATA.unixTimeStamp}`,
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.equal(DATA.dataString);
    });
  });
  it("To Convert From Unix TimeStamp to Date String", () => {
    cy.request({
      url: `${Cypress.env('apiUrl')}?cached&s=${DATA.dataString}`,
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.equal(parseInt(DATA.unixTimeStamp));
    });
  });
  it("Invalid Date String", () => {
    cy.request({
      url: `${Cypress.env('apiUrl')}?cached&s=asdssas`,
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.equal(false);
    });
  });
  it("Verify Current Date Time", () => {
    var newDate = new Date().toISOString();
    let response;
    cy.request({
      url: `${Cypress.env('apiUrl')}?cached&s=${newDate}`,
    })
      .then((res) => {
        expect(res.status).to.equal(200);
        response = res.body;
      })
      .then(() => {
        cy.request({
          url: `${Cypress.env('apiUrl')}?cached&s=${response}`,
        }).then((result) => {
          //remove unnecessary characters
          const onlyTimeFormat = newDate.split(".")[0].replace("T", " ");
          //separate only date
          const onlyDate = onlyTimeFormat.split(" ")[0];
          //separate only time
          const onlyTime = onlyTimeFormat.split(" ")[1];
          //use function for convert time  am/pm
          cy.changeTimeStamp(onlyTime).then((funcResult) => {
            expect(`${onlyDate} ${funcResult}`).to.equal(
              `${onlyDate} ${onlyTime}`
            );
          });
        });
      });
  });
});
