let data = localStorage.getItem("historyList");

if (data !== "" && data !== null) {
  historyList = JSON.parse(data);
}

historyList = historyList.map((item, index) => ({
  ...item,
  id: index,
}));

function main() {
  let currentPage = 1;
  let rows = 20;

  const paginationEl = document.querySelector("#pagination");

  function displayList(arrData, rowPerPage, page) {
    const ul = document.querySelector(".list-group");
    ul.innerHTML = "";
    page--;

    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);

    paginatedData.forEach((el) => {
      const {
        startdate,
        enddate,
        from,
        to,
        amenities,
        country,
        state,
        city,
        comfort,
        location,
      } = el;

      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");

      const list = document.querySelectorAll(".list-group-item");

      for (let i = 0; i <= list.length; i++) {
        listItem.setAttribute("id", +i);
      }

      const elSpan = document.createElement("span");

      const img = document.createElement("img");

      const btn = document.createElement("button");
      btn.classList.add("btn-close");

      btn.addEventListener("click", (event) => {
        let target = event.target.parentElement;
        let targetId = target.id;

        arrData.splice(targetId, 1);

        localStorage.setItem("historyList", JSON.stringify(arrData));

        displayList(arrData, rows, currentPage);

        displayPagination(arrData, rows);
      });

      for (key in el) {
        if ((startdate, enddate, from, to)) {
          img.src = "./icons/flights.png";
          elSpan.textContent = ` start date: ${startdate}, end date: ${enddate}, from: ${from}, to: ${to}`;
        } else if ((startdate, enddate, amenities, country, state, city)) {
          img.src = "./icons/hotels.png";
          img.style.width = "30px";
          elSpan.textContent = ` start date: ${startdate}, end date: ${enddate}, amenities: ${amenities}, country: ${country}, state: ${state}, city: ${city}`;
        } else if ((startdate, enddate, comfort, location)) {
          img.src = "./icons/cars.png";
          img.style.width = "30px";
          elSpan.textContent = ` start date: ${startdate}, end date: ${enddate}, type: ${comfort}, location: ${location}`;
        }

        elSpan.prepend(img);
        listItem.appendChild(elSpan);
        listItem.appendChild(btn);
        ul.appendChild(listItem);
      }
    });
  }

  function displayPagination(arrData, rowPerPage) {
    paginationEl.innerHTML = "";
    const pagesCount = Math.ceil(arrData.length / rowPerPage);

    for (let i = 0; i < pagesCount; i++) {
      const liPagination = displayPaginationBtn(i + 1);

      paginationEl.appendChild(liPagination);
    }
  }
  function displayPaginationBtn(page) {
    let liPagination = document.createElement("li");
    liPagination.classList.add("page-item");
    let linkPagination = document.createElement("a");
    linkPagination.classList.add("page-link");
    linkPagination.href = "#";

    linkPagination.innerHTML = page;

    if (currentPage === page) liPagination.classList.add("active");

    liPagination.appendChild(linkPagination);

    liPagination.addEventListener("click", () => {
      currentPage = page;
      displayList(historyList, rows, currentPage);

      let currentItemLi = document.querySelector("li.active");
      currentItemLi?.classList.remove("active");

      liPagination.classList.add("active");
    });

    return liPagination;
  }

  displayList(historyList, rows, currentPage);
  displayPagination(historyList, rows);
}

main();
