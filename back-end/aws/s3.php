<?php
require '../../vendor/autoload.php';

use Aws\S3\S3Client;

class S3
{
    private $s3Client;
    private $bucketName;

    public function __construct()
    {
        $region = 'eu-north-1';
        $version = 'latest';
        $accessKey = 'AKIA2ISLOIEFRQBXDD2H';
        $securityKey = 'FXei4A9eSjtZpOAESOHme5bl4I0wXM0PSDfrBByb';

        $this->bucketName = 'fmi-aws-alumni';
        $this->s3Client = new S3Client([
            'version' => $version,
            'region'  => $region,
            'credentials' => [
                'key'    => $accessKey,
                'secret' => $securityKey
            ]
        ]);
    }

    public function putObject($dir, $fileTmpName)
    {
        $this->s3Client->putObject([
            'Bucket' => $this->bucketName,
            'Key' => $dir . basename($fileTmpName),
            'SourceFile' => $fileTmpName,
        ]);
    }
}
