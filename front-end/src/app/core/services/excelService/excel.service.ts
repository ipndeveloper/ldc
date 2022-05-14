import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DataGridComponent } from '../../controls/data-grid/data-grid.component';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

    public exportDataGridAsExcel(dataGrids: DataGridComponent[], excelFileNames: string, sheetNames: string[] = ['Datos']): void {

        try {
            const jsonArray = new Array();

            dataGrids.forEach(dataGrid => {
                const json = new Array();

                if (!dataGrid.rows) {
                    for (let columnIndex = 0; columnIndex < dataGrid.columns.length; columnIndex++) {
                        const column = dataGrid.columns[columnIndex];

                        json.push({ [column.name]: '' });
                    }
                } else {
                    for (let rowIndex = 0; rowIndex < dataGrid.rows.length; rowIndex++) {

                        const newRow = {};

                        for (let columnIndex = 0; columnIndex < dataGrid.columns.length; columnIndex++) {
                            const column = dataGrid.columns[columnIndex];

                            if (column.name) {
                                newRow[column.name] = this.getObjectValue(dataGrid.rows[rowIndex], column.prop);
                            }
                        }

                        json.push(newRow);
                    }
                }
                jsonArray.push(json);
            });


            this.exportJsonAsExcel(jsonArray, excelFileNames, sheetNames);
        } catch (e) {
            console.log('Error al generar el archivo de excel.');
            console.log(e);
        }
    }

    private exportJsonAsExcel(json: any[], excelFileName: string, sheetNames: string[]): void {

        const workbook: XLSX.WorkBook =  XLSX.utils.book_new();
        for (let rowIndex = 0; rowIndex < json.length; rowIndex++) {
            XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(json[rowIndex]), sheetNames[rowIndex]);
        }
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }

    private getObjectValue(object: any, accessor: string) {
        if (accessor.indexOf('.') === -1) {
            return object[accessor];
        } else {
            const levelAccesor = accessor.split('.')[0];
            const levelValue = object[levelAccesor];
            const remainingAccesor = accessor.substring(levelAccesor.length + 1, accessor.length);
            return this.getObjectValue(levelValue, remainingAccesor);
        }
    }
}
