"use strict"
const AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-2'});

// Generate Temporal Credentials
// Configure Aws SDK
AWS.config.update({region: 'us-east-2'});

// Create S3 service object
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

module.exports = (BucketName) => 
{
    class AWSUtils 
    {
        constructor ()
        {
            this.bucketParams = {
                Bucket: BucketName,
                Delimiter: "FONDOS/Bojayá/Registro Fotográfico/Fotografía Piezas/",
                Prefix: "FONDOS/Bojayá/Registro Fotográfico/Fotografía Piezas/"
            }
        }

        listFiles() 
        {
            // s3.listObjectsV2(this.bucketParams, function(err, data) {
            //     if (err) throw new Error(err);
            //     //console.log(data.Contents);
            //     console.log(data);
            //     data.Contents.forEach((file) => {
            //         //console.log(generatePresignedUrl(file["Key"]));
            //     })
            // });
        }

        async AttachGallery(data, table)
        {
            return new Promise((resolve, reject) =>
            {
                
                try
                {
                    var hasResolved = false;
                    for (var field in data[table][0])
                    {
                        if (field == 'galeria_path')
                        {
                            
                            this.bucketParams.Delimiter = data[table][0][field];
                            this.bucketParams.Prefix = data[table][0][field];
                            data[table][0]['galeria'] = [];
                            s3.listObjectsV2(this.bucketParams, function(err, s3Data) {
                                if (err) throw new Error(err);
                                s3Data.Contents.forEach((file) => {
                                    if (file["Key"].indexOf("jpg" ) > 0
                                        || file["Key"].indexOf("JPG" ) > 0
                                        || file["Key"].indexOf("png" ) > 0
                                        || file["Key"].indexOf("PNG" ) > 0
                                        && (
                                            file["Key"].indexOf("Detalle" ) > 0
                                            || file["Key"].indexOf("Plano" ) > 0
                                        ))
                                        {
                                            data[table][0]['galeria'].push(file["Key"]);
                                            hasResolved = true;
                                            
                                        }
                                })
                                resolve(data);
                            });
                            
                            
                        }
                    }
                //    if (!hasResolved)
                //     resolve(data);
                   
                    
                } catch (error)
                {
                    reject(error);
                }
                
            })
            
        }

        async getUrl(key)
        {
            return await generatePresignedUrl(key);
        }

        listBuckets () 
        {
            s3.listBuckets(function(err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log("Success", data.Buckets);
                }
            });
        }

        async ReplaceS3Path (data) 
        {
            
            return new Promise(async (resolve, reject) => 
            {
                try {
                    
                    for (var row in data[0])
                    {
                        
                        if (row.substring(row.length - 4, row.length) == "path" && data[0][row] != "" && data[0][row] != "_")
                        {
                            data[0][row] = await this.getUrl(data[0][row]);
                        }
                    }
                    resolve(data);

                } catch (error)
                {
                    console.log(error);
                    reject(error);
                }
            })
        }

    async ReplaceS3PathArr(data) 
    {
        return new Promise(async (resolve, reject) => 
        {
            try {

                for (let i = 0; i < data.length; ++i)
                {
                    for (var row in data[i])
                    {
                        if (row.substring(row.length - 4, row.length) == "path" && data[i][row] != "" && data[i][row] != "_")
                        {
                            data[i][row] = await this.getUrl(data[i][row]);
                        }
                    }
                }
                resolve(data);

            } catch (error)
            {
                console.log(error);
                reject(error);
            }
        })
    }
    }

    async function generatePresignedUrl (KeyValue)
    {
        try {
            let params = 
            {
                Bucket: BucketName,
                Key: KeyValue
            }

            try {
                const headCode = await s3.headObject(params).promise();

                let fileParams = 
                {
                    Bucket: BucketName,
                    Key: KeyValue,
                    Expires: 600
                }
                
                return(s3.getSignedUrl('getObject', fileParams));

            } catch (headErr)
            {
                console.log(headErr);
                return KeyValue;
            }
            
        } catch (err) 
        {
            return(KeyValue);
        }
    }

    

    return AWSUtils;
}



