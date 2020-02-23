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
    }

    function generatePresignedUrl (KeyValue)
    {
        try {
            let fileParams = 
            {
                Bucket: BucketName,
                Key: KeyValue,
                Expires: 60
            }
            return(s3.getSignedUrl('getObject', fileParams));
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    return AWSUtils;
}



