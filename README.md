# List Data Reader

Reads a list of data from common files such as .csv, .xlsx, .txt, .DAT and convert into JSON array.

### Use Case
Sometimes, we have to export large data into a different file for integration purposes. 
Example: `Product Master`, `Stock Counting Result` or a `Sales Report`.  

Most of the time. ERP softwares is using .DAT file or .TXT file to store those data. 
And as an integration developer, you have to read this file, extract the data and might have to generate a new data again based on the application that is going to absorb that file.

This library accepts `.csv, .xlsx and .txt,` as of now. And convert into JSON Array. 

### TODO
- Separator argument for txt file (To identify columns etc.)
- File Export (.csv, xlsx, txt, .DAT etc.)