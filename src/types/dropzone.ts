import { FileWithPath } from 'react-dropzone';

export type FileWithPreview = FileWithPath & { preview: string };

export type File = string | { preview: string; name: string; type: string }[];
