const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");

const startDate2 = document.getElementById("startDate2");
const endDate2 = document.getElementById("endDate2");

const startDate3 = document.getElementById("startDate3");
const endDate3 = document.getElementById("endDate3");

const getCurrentDate = () => {
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  const ddd = dd < 10 ? "0" + dd : dd;

  const mmm = mm < 10 ? "0" + mm : mm;

  const now = yyyy + "-" + mmm + "-" + ddd;

  startDate.setAttribute("min", now);
  startDate2.setAttribute("min", now);
  startDate3.setAttribute("min", now);
};

getCurrentDate();

startDate.addEventListener("change", () => {
  endDate.disabled = false;
  const startDateValue = document.getElementById("startDate").value;
  endDate.setAttribute("min", startDateValue);
  startDate.addEventListener("click", () => {
    document.getElementById("endDate").value = "";
  });
});

document.getElementById("startDate2").addEventListener("change", () => {
  endDate2.disabled = false;
  const startDateValue2 = document.getElementById("startDate2").value;

  endDate2.setAttribute("min", startDateValue2);
  startDate2.addEventListener("click", () => {
    document.getElementById("endDate2").value = "";
  });
});

document.getElementById("startDate3").addEventListener("change", () => {
  endDate3.disabled = false;
  const startDateValue3 = document.getElementById("startDate3").value;

  endDate3.setAttribute("min", startDateValue3);
  startDate3.addEventListener("click", () => {
    document.getElementById("endDate3").value = "";
  });
});

function createFormFlights() {
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    const buttonSearch = form.querySelector('button[type="submit"]');

    form.addEventListener("change", () => {
      buttonSearch.disabled = !form.checkValidity();
    });
  });
}

createFormFlights();

function createFormHotels() {
  const forms = document.querySelectorAll(".needs-validation2");

  Array.from(forms).forEach((form) => {
    const buttonSearchHoutels = form.querySelector('button[type="submit"]');

    form.addEventListener("change", () => {
      buttonSearchHoutels.disabled = !form.checkValidity();
    });
  });
}

createFormHotels();

function createFormCars() {
  const forms = document.querySelectorAll(".needs-validation3");

  Array.from(forms).forEach((form) => {
    const buttonSearchCars = form.querySelector('button[type="submit"]');

    form.addEventListener("change", () => {
      buttonSearchCars.disabled = !form.checkValidity();
    });
  });
}

createFormCars();

const countries = document.querySelector("#countries");
const states = document.querySelector("#states");
const cities = document.querySelector("#cities");

const url = "https://namaztimes.kz/ru/api/country?type=json";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let output = "";

    const newData = Object.keys(data).map((key) => ({
      name: data[key],
      id: key,
    }));

    newData.forEach((country) => {
      output += `<option value="${country.name}">${country.name}</option>`;
      countries.addEventListener("change", () => {
        if (countries.value === country.name) {
          const url2 =
            "https://namaztimes.kz/ru/api/states?id=" + `${country.id}`;
          fetch(url2)
            .then((res) => res.json())
            .then((data) => {
              let output2 = "";

              const newData2 = Object.keys(data).map((key) => ({
                name: data[key],
                id: key,
              }));

              newData2.forEach((state) => {
                output2 += `<option value="${state.name}">${state.name}</option>`;

                states.addEventListener("change", () => {
                  if (states.value === state.name) {
                    const url3 =
                      "https://namaztimes.kz/ru/api/cities?id=" +
                      `${state.id}` +
                      "&type=json";
                    fetch(url3)
                      .then((res) => res.json())
                      .then((data) => {
                        let output3 = "";

                        const newData3 = Object.keys(data).map((key) => ({
                          name: data[key],
                          id: key,
                        }));
                        newData3.forEach((city) => {
                          output3 += `<option value="${city.name}">${city.name}</option>`;
                        });
                        cities.innerHTML = output3;
                      })
                      .catch((error) => {
                        console.log("ops error:", error);
                      });
                  }
                });
              });
              states.innerHTML = output2;
            })
            .catch((error) => {
              console.log("ops error:", error);
            });
        }
      });
    });
    countries.innerHTML = output;
  })
  .catch((error) => {
    console.log("ops error:", error);
  });

let data = localStorage.getItem("historyList");

let historyList = [];

if (data !== "" && data !== null) {
  historyList = JSON.parse(data);
}

function createSubmitFormFlights() {
  document
    .getElementById("form-flights")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const from = document.getElementById("formGroupExampleInput");
      const to = document.getElementById("formGroupExampleInput2");

      const date = startDate.value;
      const date2 = endDate.value;
      const fromFlight = from.value;
      const toFlight = to.value;

      let obj = {
        startdate: date,
        enddate: date2,
        from: fromFlight,
        to: toFlight,
      };

      localStorage.setItem("data", JSON.stringify(obj));

      localStorage.getItem("obj.from");
      localStorage.getItem("obj.to");

      historyList.push(obj);

      localStorage.setItem("historyList", JSON.stringify(historyList));

      startDate.value = "";
      endDate.value = "";
      from.value = "";
      to.value = "";
      buttonSearch.disabled = true;
    });
}
createSubmitFormFlights();

function createSubmitHotels() {
  document.getElementById("form-hotels").addEventListener("submit", (event) => {
    event.preventDefault();

    const amenities = document.getElementById("amenities");

    const date = startDate2.value;
    const date2 = endDate2.value;
    const amenitiesValue = amenities.value;
    const countryValue = countries.value;
    const stateValue = states.value;
    const cityValue = cities.value;

    let obj = {
      startdate: date,
      enddate: date2,
      amenities: amenitiesValue,
      country: countryValue,
      state: stateValue,
      city: cityValue,
    };

    localStorage.setItem("data", JSON.stringify(obj));

    historyList.push(obj);

    localStorage.setItem("historyList", JSON.stringify(historyList));

    startDate2.value = "";
    endDate2.value = "";
    amenities.value = "";
    countries.value = "";
    states.value = "";
    cities.value = "";
    buttonSearchHotels.disabled = true;
  });
}

createSubmitHotels();

function createSubmitCars() {
  document.getElementById("form-cars").addEventListener("submit", (event) => {
    event.preventDefault();

    const comfort = document.getElementById("comfort");
    const location = document.getElementById("location");

    const datestart3 = startDate3.value;
    const dateend3 = endDate3.value;
    const comfortValue = comfort.value;
    const locationValue = location.value;

    let obj = {
      startdate: datestart3,
      enddate: dateend3,
      comfort: comfortValue,
      location: locationValue,
    };

    localStorage.setItem("data", JSON.stringify(obj));

    historyList.push(obj);

    localStorage.setItem("historyList", JSON.stringify(historyList));

    startDate3.value = "";
    endDate3.value = "";
    comfort.value = "";
    location.value = "";
    buttonSearchCars.disabled = true;
  });
}

createSubmitCars();
