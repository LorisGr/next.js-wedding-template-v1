import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generatePDF = (data) => {
  try {
    // create a new pdf document
    const doc = new jsPDF();

    doc.text(20, 20, "Wedding Guest Invitation Summary");

    const amountNotComingPeople = data.filter(
      (person) => person.isComing === "No"
    );
    const amountConfirmedPeopleWhoComingAlone = data.filter(
      (person) => !person.isWithCompanion && person.isComing === "Yes"
    );
    const confirmedPeopleWhoComingAndWithExtraPerson = data.filter(
      (person) => person.isWithCompanion && person.isComing === "Yes"
    );
    const confirmedPeopleWhoComingAlone =
      amountConfirmedPeopleWhoComingAlone.length -
      confirmedPeopleWhoComingAndWithExtraPerson.length;
    const comingGuests = data.filter((person) => person.isComing === "Yes");

    const numberChildren = data.filter((person) => person.isWithChildren);
    const sumChildrenUnder3 = numberChildren.reduce(
      (prev, curr) => prev + parseInt(curr.amountKids),
      0
    );
    const sumChildrenAbove3 = numberChildren.reduce(
      (prev, curr) => prev + parseInt(curr.amountTeenagers),
      0
    );

    const vodkaAmount = data.filter((person) => person.isVodka);
    const ginAmount = data.filter((person) => person.isGin);
    const whiskyAmount = data.filter((person) => person.isWhisky);
    const beerAmount = data.filter((person) => person.isBeer);
    const isNonAlcoholAmount = data.filter((person) => person.isNonAlcohol);

    const peanutsPeopleAllergies = data.filter((person) => person.isPeanuts);
    const eggsPeopleAllergies = data.filter((person) => person.isEggs);
    const nutsPeopleAllergies = data.filter((person) => person.isNuts);

    const dataTable = [
      [
        "Number of confirmed adult guests and their companions",
        confirmedPeopleWhoComingAndWithExtraPerson.length * 2 +
          confirmedPeopleWhoComingAlone,
      ],
      [
        "Number of confirmed adult guests who will not be attending",
        amountNotComingPeople.length,
      ],
      ["Number of confirmed guests under the age of 3", sumChildrenUnder3],
      ["Number of confirmed guests aged 3 and over", sumChildrenAbove3],
      ["Number of guests who will be drinking vodka", vodkaAmount.length],
      ["Number of guests who will be drinking gin", ginAmount.length],
      ["Number of guests who will be drinking whisky", whiskyAmount.length],
      ["Number of guests who will be drinking beer", beerAmount.length],
      [
        "Number of guests who will not be drinking alcohol",
        isNonAlcoholAmount.length,
      ],
      ["Number of guests with peanut allergies", peanutsPeopleAllergies.length],
      ["Number of guests with egg allergies", eggsPeopleAllergies.length],
      ["Number of guests with nut allergies", nutsPeopleAllergies.length],
    ];

    const columns = ["Description", "Quantity"];

    const options = {
      startY: 30,
      head: [columns],
      body: dataTable,
    };

    doc.autoTable(options);

    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    doc.text(80, 10, "Date: " + date);
    //save file
    const fileName = "GuestCountAndAllergiesSummary_" + date + ".pdf";
    doc.save(fileName);
  } catch (error) {
    const body = {
      log: "generatePdf",
      errorMessage: error.message,
    };
    logFetch(body);
  }
};

export default generatePDF;
