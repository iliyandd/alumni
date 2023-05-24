<?php
require '../../vendor/autoload.php';

use Aws\S3\S3Client;

class AwsS3
{
    private $s3Client;

    public function __construct()
    {
        $bucketName = 'fmi-aws-alumni';
        $region = 'eu-north-1';
        $version = 'latest';
        $accessKey = 'AKIA2ISLOIEFRQBXDD2H';
        $securityKey = 'FXei4A9eSjtZpOAESOHme5bl4I0wXM0PSDfrBByb';

        $this->s3Client = new S3Client([
            'version' => $version,
            'region'  => $region,
            'credentials' => [
                'key'    => $accessKey,
                'secret' => $securityKey
            ]
        ]);
    }
}
