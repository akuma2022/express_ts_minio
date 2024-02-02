export interface BufferedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  filename: string;
  size: number;
  destination: string;
  path: string;
}

export interface FileCreate extends BufferedFile {
  cluster: string;
}
