import * as path from 'path';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // S3
    const BlogBucket = new s3.Bucket(this, "UOWCLOUDCDKBlogBucketAwsTrain", {
      publicReadAccess: true,
      bucketName: "uow-cloud-cca-blog-bucket-aws-training",
      websiteIndexDocument: "index.html" 
    })

    // S3 Deployment
    new s3Deployment.BucketDeployment(this, 'UowCloudCDKBlogDeployment', {
      sources: [s3Deployment.Source.asset(path.resolve(__dirname, '../../blog/public'))],
      destinationBucket: BlogBucket
    })

    // Cloudfront
    new cloudfront.Distribution(this, 'UOWCLOUDFRONTCFWebDistribution', {
      defaultBehavior: { origin: new origins.S3Origin(BlogBucket) }
    })
  }
}
