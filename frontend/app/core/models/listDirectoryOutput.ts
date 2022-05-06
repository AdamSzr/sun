export class DirectoryStructure {
  directory: string
  files: string[]
  constructor(directory: string, files: string[]) {
    this.directory = directory
    this.files = files
  }
}
