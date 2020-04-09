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
                Delimiter: "/",
                Prefix: ""
            }
        }

        listFiles() 
        {
            s3.listObjectsV2(this.bucketParams, function(err, data) {
                if (err) throw new Error(err);
                //console.log(data.Contents);
                data.Contents.forEach((file) => {
                    console.log(generatePresignedUrl(file["Key"]));
                })
            });
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
                            //console.log(data[i][row]);
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
                    Expires: 60
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



