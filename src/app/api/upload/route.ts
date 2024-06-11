import { ObjectStorageClient } from 'oci-objectstorage';
import { SimpleAuthenticationDetailsProvider, Region } from 'oci-common';

export async function POST(request: Request) {
   
  const formData = await request.formData();
  
  const bucketNamespace = process.env.NEXT_PUBLIC_BUCKET_NAME_SPACE!;
  const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME!;
  
  const PREFIX_URL = process.env.NEXT_PUBLIC_BUCKET_URL;
  const TENENCY = process.env.NEXT_PUBLIC_BUCKET_TENENCY!;
  const USER = process.env.NEXT_PUBLIC_BUCKET_USER!;
  const FINGERPRINT = process.env.NEXT_PUBLIC_BUCKET_FINGERPRINT!;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_BUCKET_PRIVATE_KEY!;
  const REGION = Region.AP_CHUNCHEON_1;
  const PASS_PHRASE = null;

  const provider = new SimpleAuthenticationDetailsProvider(
    TENENCY,
    USER,
    FINGERPRINT,
    PRIVATE_KEY,
    PASS_PHRASE,
    REGION  
  );
  
  const objectStorageClient = new ObjectStorageClient({ authenticationDetailsProvider: provider });
  const objectName = `IMG${Date.now()}`; 
  
  const putObjectRequest = {
    namespaceName: bucketNamespace,
    bucketName: bucketName,
    objectName: objectName,
    putObjectBody: formData.get('file')!,
  };

  await objectStorageClient.putObject(putObjectRequest);
  const fileUrl = PREFIX_URL + objectName;
  
  return Response.json({ fileUrl })
}