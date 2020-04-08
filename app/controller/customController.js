"use strict";
var AWSUtils = require("../utils/awsConfig.js")("archivorln");
var awsUtils = new AWSUtils();

module.exports = (pool, table, alias) => 
{
    var CustomModel = require("../model/customModel")(pool, table);
    var customModel = new CustomModel();
    
    class CustomController
    {
        async getAll()
        {
            
            return new Promise(async (resolve, reject) => 
            {
                try {
                    var data = await customModel.getAll();
                    
                    resolve (data);

                } catch (error) 
                {
                    reject( error );
                };
            });   
        }

        async getById(id)
        {
            
            return new Promise(async (resolve, reject) => 
            {
                try {
                    var data = await customModel.getById(id);
                    for (let i = 0; i < data.length; ++i)
                    {
                        for (var row in data[i])
                        {
                            if (row.substring(row.length - 4, row.length) == "path" && data[i][row] != "" && data[i][row] != "_")
                            {
                                data[i][row] = await awsUtils.getUrl(data[i][row]);
                            }
                        }
                            
                    }
                    resolve (data);

                } catch (error) 
                {
                    console.log(error)
                    reject( error );
                };
            });   
        }

        async getByFk(fk)
        {
            //console.log(await awsUtils.getUrl("f0a38b6eb7b8caf9383eeb1c58e95017.jpg"));
            return new Promise(async (resolve, reject) => 
            {
                try {
                    var data = await customModel.getByFk(fk);
                    
                    resolve (data);

                } catch (error) 
                {
                    console.log(error)
                    reject( error );
                };
            });   
        }

        // Search 
        async search(fk)
        {
            //console.log(await awsUtils.getUrl("f0a38b6eb7b8caf9383eeb1c58e95017.jpg"));
            return new Promise(async (resolve, reject) => 
            {
                try {
                    var data = await customModel.getByFk(fk);
                    resolve (data);

                } catch (error) 
                {
                    console.log(error)
                    reject( error );
                };
            });   
        }

        async addNew(obj)
        {
            return new Promise(async (resolve, reject) => 
            {
                try {
                    var res = await customModel.addNew(obj);
                    resolve (res);

                } catch (error) 
                {
                    //console.log(error)
                    reject( error );
                };
            });   
        }

        // DELTE
        async deleteOne(id)
        {
            //console.log(await awsUtils.getUrl("f0a38b6eb7b8caf9383eeb1c58e95017.jpg"));
            return new Promise(async (resolve, reject) => 
            {
                try {
                    var data = await customModel.deleteOne(id);
                    resolve (data);

                } catch (error) 
                {
                    console.log(error)
                    reject( error );
                };
            });   
        }

        // edit
        async editOne(obj, id)
        {
            //console.log(await awsUtils.getUrl("f0a38b6eb7b8caf9383eeb1c58e95017.jpg"));
            return new Promise(async (resolve, reject) => 
            {
                try {
                    var data = await customModel.editOne(obj, id);
                    resolve (data);

                } catch (error) 
                {
                    console.log(error)
                    reject( error );
                };
            });   
        }
    }

    return CustomController;
}

