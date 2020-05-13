// JSON PARSER REFACTOR

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var addBtn = document.getElementById("myBtnAdd");
var accBtn = document.getElementById("myBtnAcc");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the Json
// Get Table
var doc_table;
var json_val;
var json_obj;

btn.addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "block";

    doc_table = document.getElementById("myTable");
    json_val = document.getElementById("json-input").value;
    doc_table.innerHTML = "";
    json_obj = JSON.parse(json_val.replace(/(\r\n|\n|\r|')/gm, '"'))['obj'];
    //console.log(json_val);

    //console.log(json_obj);
    for (doc in json_obj) {
        //console.log(json_obj[doc]);
        var row = doc_table.insertRow(doc);
        var name = row.insertCell(0);
        var url = row.insertCell(1);
        var del = row.insertCell(2);

        name.innerHTML = '<input type="text" class="text-input" value="' + json_obj[doc]['name'] + '" id=n' + doc + '>';
        url.innerHTML = '<input type="text" class="text-input" value="' + json_obj[doc]['url'] + '" id=u' + doc + '>';
        del.innerHTML = '<button onClick="deleteRow(' + doc + ')">&times</button>'
        //console.log(doc);
    }
    updateEvents()
});

addBtn.addEventListener("click", function (event) {
    doc_table = document.getElementById("myTable");
    var row = doc_table.insertRow(-1);

    var name = row.insertCell(0);
    var url = row.insertCell(1);
    var del = row.insertCell(2);
    var lastRow = doc_table.rows.length - 1;
    name.innerHTML = '<input type="text" class="text-input" value="" id=n' + lastRow + ' >';
    url.innerHTML = '<input type="text" class="text-input" value="" id=u' + lastRow + ' >';

    del.innerHTML = '<button onClick="deleteRow(' + lastRow + ')">&times</button>'
    updateEvents()
});

accBtn.addEventListener("click", function (event) {
    var final_obj = { obj: [] };
    for (let i = 0; i < doc_table.rows.length; ++i) {
        final_obj['obj'].push({});
        var name = doc_table.rows[i].cells[0].innerHTML;
        var url = doc_table.rows[i].cells[1].innerHTML;
        final_obj['obj'][i]['name'] = name.substring(45, name.length - 10);
        final_obj['obj'][i]['url'] = url.substring(45, url.length - 10);
        //console.log(url.substring(45, url.length - 10));
    }
    updateEvents();
    document.getElementById("json-input").value = "";
    document.getElementById("json-input").value = JSON.stringify(final_obj).replace(/(\r\n|\n|\r|")/gm, "'");
    //console.log(JSON.stringify(final_obj).replace(/(\r\n|\n|\r|")/gm, "'"));
    modal.style.display = "none";
});

function deleteRow(r) {
    doc_table.deleteRow(r);
    for (let i = 0; i < doc_table.rows.length; ++i) {
        doc_table.rows[i].cells[2].innerHTML = '<button onClick="deleteRow(' + i + ')">&times</button>';
    }
    for (let i = 0; i < doc_table.rows.length; ++i) {
        doc_table.rows[i].cells[0].innerHTML = doc_table.rows[i].cells[0].innerHTML.substring(0, doc_table.rows[i].cells[0].innerHTML.length - 3) + i + '">';
        doc_table.rows[i].cells[1].innerHTML = doc_table.rows[i].cells[1].innerHTML.substring(0, doc_table.rows[i].cells[1].innerHTML.length - 3) + i + '">';
    }

}

function updateEvents() {
    doc_table = document.getElementById("myTable");

    for (let i = 0; i < doc_table.rows.length; ++i) {
        if (document.getElementById("n" + i)) {
            var name = document.getElementById("n" + i);
            var url = document.getElementById("u" + i);

            //name.setAttribute("value", name.value)
            name.addEventListener('change', function () {
                name.setAttribute("value", name.value)
            });
            url.addEventListener('change', function () {
                url.setAttribute("value", url.value)
            });

        }

    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}