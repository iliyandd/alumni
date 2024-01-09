<?php
require 'C:\MyDownload\htdocs\alumni\vendor\autoload.php';

use Aws\S3\S3Client;

class S3
{
    private $s3Client;
    private $bucketName;

    public function __construct()
    {
        $region = 'eu-north-1';
        $version = 'latest';
        $accessKey = '<access_key>';
        $securityKey = '<security_key>';

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

    public function putObject($dir, $fileTmpName, $fileName)
    {
        $this->s3Client->putObject([
            'Bucket' => $this->bucketName,
            'Key' => $dir . basename($fileName),
            'SourceFile' => $fileTmpName,
        ]);
    }

    public function getObjectUrl($dir, $fileName)
    {
        $cmd = $this->s3Client->getCommand('GetObject', [
            'Bucket' => $this->bucketName,
            'Key'    => $dir . $fileName,
        ]);

        //The period of availability
        $request = $this->s3Client->createPresignedRequest($cmd, '+10 minutes');

        //Get the pre-signed URL
        return (string) $request->getUri();
    }
}
