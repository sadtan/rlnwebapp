const AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-2'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Generate Temporal Credentials
// Configure Aws SDK
AWS.config.update({region: 'us-east-2'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

class AWSUtils 
{
    constructor ()
    {
        this.bucketParams = {
            Bucket: "elasticbeanstalk-us-east-2-951620661084",
            Delimiter: "/",
            Prefix: ""
        }
    }

    generatePresignedUrl = (KeyValue) =>
    {
        try {
            presignedGETURL = s3.getSignedUrl('getObject', bucketParams);
            return(presignedGETURL);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    listBuckets = () => 
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

module.exports = () => new AWSUtils;