<?php
require '../../vendor/autoload.php';

use Aws\S3\S3Client;

// Instantiate an Amazon S3 client.
$s3Client = new S3Client([
    'version' => 'latest',
    'region'  => 'eu-north-1',
    'credentials' => [
        'key'    => 'AKIA2ISLOIEFRQBXDD2H',
        'secret' => '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'
    ]
]);

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $key = 'profile_pictures/' . basename($_FILES["profile_picture"]["tmp_name"]);

    $result = $s3Client->putObject([
        'Bucket' => 'fmi-aws-alumni',
        'Key' => $key,
        'SourceFile' => $_FILES["profile_picture"]["tmp_name"],
    ]);
}
