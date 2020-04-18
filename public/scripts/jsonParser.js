class JsonParser
{
    constructor (idTable, idJsonInput, idModal, idBtn, idBtnAdd, idBtnAcc, idSpan, attrList = undefined)
    {
        this.modal = document.getElementById(idModal);
        this.btnOpenModal = document.getElementById(idBtn);
        this.btnAdd = document.getElementById(idBtnAdd);
        this.btnAccept = document.getElementById(idBtnAcc);
        this.spanClose = document.getElementsByClassName(idSpan)[0];

        this.docTable_ = idTable;
        this.jsonString_ = idJsonInput
        this.idFirstLetters = [];
        this.objAttrs = [];

        this.idJsonInput = idJsonInput;

        this.attrList = attrList;
        console.log(attrList);
    }

    WorkParser()
    {
        console.log("¡¡¡¡¡¡")
        this.btnOpenModal.addEventListener("click", e =>
        {
            e.preventDefault();
            this.modal.style.display = "block";

            this.docTable   = document.getElementById(this.docTable_);
            this.jsonString = document.getElementById(this.jsonString_).value;
            
            this.jsonString  = this.jsonString.replace(/"/g, '&quot;')
            console.log("JSON STRING", this.jsonString);
            this.jsonString = this.jsonString.replace(/(\r\n|\n|\r|')/gm, '"');
            
            
            // Restart the table
            this.docTable.innerHTML = "";

            this.idFirstLetters = [];

            //if (!attrList)
            
            if (!(this.jsonString == "" || this.jsonString == "-" || this.jsonString == "_"))
            {
                //this.jsonString  = this.jsonString.replace(/"/g, '&quot;')
                
                this.jsonObj = JSON.parse(this.jsonString)['obj'];

                for (var index in this.jsonObj)
                {
                    var row = this.docTable.insertRow(index);
                    var rowIndex = 0;
                    var cell;
                    for (var attr in this.jsonObj[index])
                    {
                        
                        cell = row.insertCell(rowIndex);
                        var idFirstLetter = attr.substring(0, 1);

                        if (this.idFirstLetters.indexOf(idFirstLetter) < 0)
                            this.idFirstLetters.push(idFirstLetter);

                        var input = document.createElement("input");
                        input.type = "text";
                        input.setAttribute("id", idFirstLetter + index );
                        input.setAttribute('class', 'text-input');
                        input.setAttribute('value', this.jsonObj[index][attr].toString().replace(/&quot;/g, '\"'));

                        cell.appendChild(input);

                        this.objAttrs[attr] = '';

                        ++rowIndex;
                    };
                    
                    var btnDelete = row.insertCell(rowIndex);
                    btnDelete.innerHTML = '<button>&times</button>'
                }
            } else
            {
                console.log("JSON NOTHING")
                var row = this.docTable.insertRow(0);
                var rowIndex = 0;
                var cell
                for (var attr in this.attrList)
                {
                    cell = row.insertCell(rowIndex);
                    var idFirstLetter = attr.substring(0, 1);
                    if (this.idFirstLetters.indexOf(idFirstLetter) < 0)
                        this.idFirstLetters.push(idFirstLetter);
                        var input = document.createElement("input");
                    input.type = "text";
                    input.setAttribute("id", idFirstLetter + 0 );
                    input.setAttribute('class', 'text-input');
                    input.setAttribute('value', "");

                    cell.appendChild(input);
                    this.objAttrs[attr] = '';
                    ++rowIndex;
                }
                var btnDelete = row.insertCell(rowIndex);
                btnDelete.innerHTML = '<button>&times</button>'
            }
            

            this.UpdateDeleted();
            this.UpdateInputs();
        });

        this.btnAdd.addEventListener('click', e =>
        {
            var newRow  = this.docTable.insertRow(-1);
            var lastRow = this.docTable.rows.length - 1;

            var rowIndex = 0;
            for ( var attr in this.objAttrs )
            {  
                var cell = newRow.insertCell(rowIndex);
                var idFirstLetter = attr.substring(0, 1);

                var input = document.createElement("input");
                input.type = "text";
                input.setAttribute("id", idFirstLetter + lastRow );
                input.setAttribute('class', 'text-input');
                input.setAttribute('value', "");

                cell.appendChild(input);

                ++rowIndex;
            }
            var btnDelete = newRow.insertCell(rowIndex);
            btnDelete.innerHTML = '<button>&times</button>'

            this.UpdateDeleted();
            this.UpdateInputs();
        });

        this.btnAccept.addEventListener('click', e =>
        {
            var finalObj = { obj: [] };

            for ( let i = 0; i < this.docTable.rows.length; ++i )
            {
                finalObj['obj'].push({});

                var rowInputIndex = 0;
                for ( var attr in this.objAttrs )
                {   
                    finalObj['obj'][i][attr] = this.docTable.rows[i].cells[rowInputIndex].children[0].value.replace(/"/g, '&quot;');
                    ++rowInputIndex;
                }
            }
            this.UpdateInputs();
            document.getElementById(this.idJsonInput).value = "";
            if (finalObj['obj'].length > 0)
            {
                //this.jsonObj[index][attr].toString().replace(/&quot;/g, '\"')
                //this.jsonString.replace(/"/g, '&quot;')
                document.getElementById(this.idJsonInput).value = JSON.stringify(finalObj).replace(/(\r\n|\n|\r|")/gm, "'");
            }
                
            else 
                document.getElementById(this.idJsonInput).value = "-";
            
            console.log( finalObj );
            this.modal.style.display = "none";
        });

        this.spanClose.addEventListener('click', _ => {
            this.modal.style.display = "none";
        }) 
    }

    UpdateDeleted()
    {
        //console.log(this.docTable.rows.length)
        var delButtons = [];
        var self = this;
        
        for (let i = 0; i < this.docTable.rows.length; ++i) 
        {
            var lasCellIndex = this.docTable.rows[i].cells.length -1;
            delButtons.push(this.docTable.rows[i].cells[lasCellIndex]); 
        }

        for (let i = 0; i < delButtons.length; ++i) 
        {
            var clone = delButtons[i].children[0].cloneNode(true);
            delButtons[i].children[0].parentNode.replaceChild(clone, delButtons[i].children[0]);

            delButtons[i].children[0].addEventListener('click', _ =>
            {
                self.docTable.deleteRow(i);
                self.UpdateDeleted();
            });
        }

        for (let i = 0; i < this.docTable.rows.length; ++i) 
        {
            var rowInputIndex = 0;
            for ( var idFirstLetter in this.idFirstLetters )
            {
                var rowInput = this.docTable.rows[i].cells[rowInputIndex].children[0];
                
                rowInput.setAttribute("id", this.idFirstLetters[idFirstLetter] + i);
                //docTable.rows[i].cells[rowInputIndex].innerHTML = docTable.rows[i].cells[rowInputIndex].innerHTML.substring(0, docTable.rows[i].cells[rowInputIndex].innerHTML.length - 3) + i + '">';
                ++rowInputIndex;
            }
        }

        function RemoveEvent()
        {
            console.log("Event Removed");
        }

        //self.UpdateDeleted();
    }

    UpdateInputs()
    {
        var innerRowInputs = [];
        for (let i = 0; i < this.docTable.rows.length; ++i)
            for (var letter in this.idFirstLetters)
                innerRowInputs.push(document.getElementById(this.idFirstLetters[letter] + i));

        for (let i = 0; i < innerRowInputs.length; ++i)
            innerRowInputs[i].addEventListener('change', _ => 
            {
                innerRowInputs[i].setAttribute('value', innerRowInputs[i].value);
            })
    }
}
// console.log("parserReady");
// function parseJsonObj(idTable, idJsonInput, idModal, idBtn, idBtnAdd, idBtnAcc, idSpan)
// {
//     console.log("CreatedParser");
//     var modal = document.getElementById(idModal);
//     var btnOpenModal = document.getElementById(idBtn);
//     var btnAdd = document.getElementById(idBtnAdd);
//     var btnAccept = document.getElementById(idBtnAcc);

//     var spanClose = document.getElementsByClassName(idSpan)[0];
    
//     var docTable;
//     var jsonString;
//     var jsonObj;

//     var idFirstLetters;
//     var objAttrs = {};

//     btnOpenModal.addEventListener("click", e =>
//     {
//         e.preventDefault();
//         modal.style.display = "block";

//         docTable   = document.getElementById(idTable);
//         jsonString = document.getElementById(idJsonInput).value;
//         jsonString = jsonString.replace(/(\r\n|\n|\r|')/gm, '"');
//         jsonObj    = JSON.parse(jsonString)['obj'];
        
//         // Restart the table
//         docTable.innerHTML = "";

//         idFirstLetters = [];
//         var deleteButtons = [];
//         for (index in jsonObj)
//         {
//             //
            
//             var row = docTable.insertRow(index);
//             var rowIndex = 0;
//             var cell;
//             for (attr in jsonObj[index])
//             {
//                 cell = row.insertCell(rowIndex);
//                 var idFirstLetter = attr.substring(0, 1);

//                 if (idFirstLetters.indexOf(idFirstLetter) < 0)
//                     idFirstLetters.push(idFirstLetter);
                
//                 cell.innerHTML = 
//                     '<input type="text" class="text-input" value="' 
//                     + jsonObj[index][attr] 
//                     + '" id=' + idFirstLetter + index 
//                     + '>';

//                 objAttrs[attr] = '';

//                 ++rowIndex;
//             };
            
//             var btnDelete = row.insertCell(rowIndex);
//             btnDelete.innerHTML = '<button>&times</button>'
//             deleteButtons.push(btnDelete);
//         }

//         for ( let i = 0; i < deleteButtons.length; ++i )
//         {
//             deleteButtons[i].children[0].addEventListener('click', _ =>{
//                 deleteRow(i);
//             });
//         }

//         updateInputs();
//     });

//     btnAdd.addEventListener('click', e =>
//     {
//         docTable    = document.getElementById(idTable);
//         var newRow  = docTable.insertRow(-1);
//         var lastRow = docTable.rows.length - 1;

//         //
//         var rowIndex = 0;
//         for ( attr in objAttrs )
//         {  
//             var cell = newRow.insertCell(rowIndex);
//             var idFirstLetter = attr.substring(0, 1);
//             cell.innerHTML = '<input type="text" class="text-input" value="" id=' + idFirstLetter + lastRow + '>'

//             ++rowIndex;
//         }
//         var btnDelete = newRow.insertCell(rowIndex);
//         btnDelete.innerHTML = '<button>&times</button>'
//         btnDelete.addEventListener('click', _ =>{
//             deleteRow(lastRow);
//         });

//         updateInputs();
//     });

//     btnAccept.addEventListener('click', e =>
//     {
//         var finalObj = { obj: [] };

//         for ( let i = 0; i < docTable.rows.length; ++i )
//         {
//             finalObj['obj'].push({});

//             var rowInputIndex = 0;
//             for ( attr in objAttrs )
//             {   
//                 finalObj['obj'][i][attr] = docTable.rows[i].cells[rowInputIndex].children[0].value;
//                 ++rowInputIndex;
//             }
//         }
//         updateInputs();
//         document.getElementById(idJsonInput).value = "";
//         document.getElementById(idJsonInput).value = JSON.stringify(finalObj).replace(/(\r\n|\n|\r|")/gm, "'");
        
//         modal.style.display = "none";
//         console.log(finalObj);
//     });

//     function deleteRow(r)
//     {
//         console.log(r);
//         docTable.deleteRow(r);
//         var delButtons = [];

//         for (let i = 0; i < docTable.rows.length; ++i) 
//         {
//             var lasCellIndex = docTable.rows[i].cells.length -1;
//             delButtons.push(docTable.rows[i].cells[lasCellIndex]); 
//             //docTable.rows[i].cells[lasCellIndex].addEventListener('click', deleteRow, i);
//         }
//         for (let i = 0; i < delButtons.length; ++i) 
//         {
//             delButtons[i].addEventListener('click', _ =>{
//                 deleteRow(i);
//             });
//         }

//         for (let i = 0; i < docTable.rows.length; ++i) 
//         {

//             var rowInputIndex = 0;
//             for ( idFirstLetter in idFirstLetters )
//             {
//                 var rowInput = docTable.rows[i].cells[rowInputIndex].children[0];
                
//                 rowInput.setAttribute("id", idFirstLetters[idFirstLetter] + i);
//                 //docTable.rows[i].cells[rowInputIndex].innerHTML = docTable.rows[i].cells[rowInputIndex].innerHTML.substring(0, docTable.rows[i].cells[rowInputIndex].innerHTML.length - 3) + i + '">';
//                 ++rowInputIndex;
//             }
//         }
//     }

//     var updateInputs = _ =>
//     {
//         docTable = document.getElementById(idTable);
//         var innerRowInputs = [];
//         for (let i = 0; i < docTable.rows.length; ++i)
//             for (letter in idFirstLetters)
//                 innerRowInputs.push(document.getElementById(idFirstLetters[letter] + i));

//         for (let i = 0; i < innerRowInputs.length; ++i)
//             innerRowInputs[i].addEventListener('change', _ => 
//             {
//                 innerRowInputs[i].setAttribute('value', innerRowInputs[i].value);
//             })
//     }

//     spanClose.onclick = function () {
//         modal.style.display = "none";
//     }
// }


