// Get the modal
var modalEnt = document.getElementById("myModalEntidad");

// Get the button that opens the modal
var btnEnt = document.getElementById("myBtnEntidad");
var addBtnEnt= document.getElementById("myBtnAddEntidad");
var accBtnEnt = document.getElementById("myBtnAccEntidad");

// Get the <span> element that closes the modal
var spanEnt = document.getElementsByClassName("closeEntidad")[0];

// Get the Json
// Get Table
var ent_table;
var json_val_ent;
var json_obj_ent;

btnEnt.addEventListener("click", function (event) {
    event.preventDefault();
    modalEnt.style.display = "block";

    ent_table = document.getElementById("myTableEntidad");
    json_val_ent = document.getElementById("json-input-ent").value;
    ent_table.innerHTML = "";
    json_obj_ent = JSON.parse(json_val_ent.replace(/(\r\n|\n|\r|')/gm, '"'))['obj'];
    //console.log(json_val_ent);

    //console.log(json_obj_ent);
    for (doc in json_obj_ent) {
        //console.log(json_obj_ent[doc]);
        var row = ent_table.insertRow(doc);
        var name = row.insertCell(0);
        var url = row.insertCell(1);
        var del = row.insertCell(2);

        name.innerHTML = '<input type="text" class="text-input" value="' + json_obj_ent[doc]['name'] + '" id=n' + doc + '>';
        url.innerHTML = '<input type="text" class="text-input" value="' + json_obj_ent[doc]['url'] + '" id=u' + doc + '>';
        del.innerHTML = '<button onClick="deleteRow(' + doc + ')">&times</button>'
        //console.log(doc);
    }
    updateEvents()
});

addBtnEnt.addEventListener("click", function (event) {
    ent_table = document.getElementById("myTable");
    var row = ent_table.insertRow(-1);

    var name = row.insertCell(0);
    var url = row.insertCell(1);
    var del = row.insertCell(2);
    var lastRow = ent_table.rows.length - 1;
    name.innerHTML = '<input type="text" class="text-input" value="" id=n' + lastRow + ' >';
    url.innerHTML = '<input type="text" class="text-input" value="" id=u' + lastRow + ' >';

    del.innerHTML = '<button onClick="deleteRow(' + lastRow + ')">&times</button>'
    updateEvents()
});

accBtnEnt.addEventListener("click", function (event) {
    var final_obj = { obj: [] };
    for (let i = 0; i < ent_table.rows.length; ++i) {
        final_obj['obj'].push({});
        var name = ent_table.rows[i].cells[0].innerHTML;
        var url = ent_table.rows[i].cells[1].innerHTML;
        final_obj['obj'][i]['name'] = name.substring(45, name.length - 10);
        final_obj['obj'][i]['url'] = url.substring(45, url.length - 10);
        //console.log(url.substring(45, url.length - 10));
    }
    updateEvents();
    document.getElementById("json-input").value = "";
    document.getElementById("json-input").value = JSON.stringify(final_obj).replace(/(\r\n|\n|\r|")/gm, "'");
    //console.log(JSON.stringify(final_obj).replace(/(\r\n|\n|\r|")/gm, "'"));
    modalEnt.style.display = "none";
});

function deleteRow(r) {
    ent_table.deleteRow(r);
    for (let i = 0; i < ent_table.rows.length; ++i) {
        ent_table.rows[i].cells[2].innerHTML = '<button onClick="deleteRow(' + i + ')">&times</button>';
    }
    for (let i = 0; i < ent_table.rows.length; ++i) {
        ent_table.rows[i].cells[0].innerHTML = ent_table.rows[i].cells[0].innerHTML.substring(0, ent_table.rows[i].cells[0].innerHTML.length - 3) + i + '">';
        ent_table.rows[i].cells[1].innerHTML = ent_table.rows[i].cells[1].innerHTML.substring(0, ent_table.rows[i].cells[1].innerHTML.length - 3) + i + '">';
    }

}

function updateEvents() {
    ent_table = document.getElementById("myTable");

    for (let i = 0; i < ent_table.rows.length; ++i) {
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
spanEnt.onclick = function () {
    modalEnt.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modalEnt) {
        modalEnt.style.display = "none";
    }
}