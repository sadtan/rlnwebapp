async function getData(url, method, data) {
  try {
    var response = {};
    response = await fetch(url, {
      method,
      mode: "cors",
      //cache: 'no-cache',
      //credentials: 'omit',
      headers: {
        "Content-Type": "application/json"
      },
      //redirect: 'follow',
      //referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    return error;
  }
}

// console.log("Running");

function renderData(url, data) {
  getData(url, "GET").then(response => {
    if (response.success) {
      data = response.data;
      for (field in data[0]) console.log(field);
    } else {
      console.error(response.message);
    }
  });
}

renderData("/fondos");
