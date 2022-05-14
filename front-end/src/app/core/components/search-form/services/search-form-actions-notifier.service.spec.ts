import { TestBed, inject } from '@angular/core/testing';

import { SearchFormActionsNotifierService } from './search-form-actions-notifier.service';

describe('SearchFormActionsNotifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchFormActionsNotifierService]
    });
  });

  it('should be created', inject([SearchFormActionsNotifierService], (service: SearchFormActionsNotifierService) => {
    expect(service).toBeTruthy();
  }));

  describe('clickAdd', () => {
    it('should emit when onAdd is called',
      inject([SearchFormActionsNotifierService], (service: SearchFormActionsNotifierService) => {
        spyOn(service.clickAdd, 'emit');
        service.onAdd();
        expect(service.clickAdd.emit).toHaveBeenCalled();
    }));
  });

  describe('clickClear', () => {
    it('should emit when onClickClear is called',
      inject([SearchFormActionsNotifierService], (service: SearchFormActionsNotifierService) => {
        spyOn(service.clickClear, 'emit');
        service.onClickClear();
        expect(service.clickClear.emit).toHaveBeenCalled();
    }));
  });

  describe('clickEdit', () => {
    it('should emit with row when onClickEdit is called',
      inject([SearchFormActionsNotifierService], (service: SearchFormActionsNotifierService) => {
        const row = {};
        spyOn(service.clickEdit, 'emit');
        service.onClickEdit(row);
        expect(service.clickEdit.emit).toHaveBeenCalledWith(row);
    }));
  });

  describe('clickExcelExport', () => {
    it('should emit with dataGrid when onClickExcelExport is called',
      inject([SearchFormActionsNotifierService], (service: SearchFormActionsNotifierService) => {
        const dataGrid = {};
        spyOn(service.clickExcelExport, 'emit');
        service.onClickExcelExport(dataGrid);
        expect(service.clickExcelExport.emit).toHaveBeenCalledWith(dataGrid);
    }));
  });

  describe('clickRemove', () => {
    it('should emit with row when onClickRemove is called',
      inject([SearchFormActionsNotifierService], (service: SearchFormActionsNotifierService) => {
        const row = {};
        spyOn(service.clickDelete, 'emit');
        service.onClickDelete(row);
        expect(service.clickDelete.emit).toHaveBeenCalledWith(row);
    }));
  });

  describe('clickSearch', () => {
    it('should emit when onClickSearch is called',
      inject([SearchFormActionsNotifierService], (service: SearchFormActionsNotifierService) => {
        spyOn(service.clickSearch, 'emit');
        service.onClickSearch();
        expect(service.clickSearch.emit).toHaveBeenCalled();
    }));
  });

  describe('clickView', () => {
    it('should emit with row when onClickView is called',
      inject([SearchFormActionsNotifierService], (service: SearchFormActionsNotifierService) => {
        const row = {};
        spyOn(service.clickView, 'emit');
        service.onClickView(row);
        expect(service.clickView.emit).toHaveBeenCalledWith(row);
    }));
  });

  describe('invalidFilters', () => {
    it('should emit when onInvalidFilters is called',
      inject([SearchFormActionsNotifierService], (service: SearchFormActionsNotifierService) => {
        spyOn(service.invalidFilters, 'emit');
        service.onInvalidFilters();
        expect(service.invalidFilters.emit).toHaveBeenCalled();
    }));
  });

  describe('refreshGrid', () => {
    it('should emit when onRefreshGrid is called',
      inject([SearchFormActionsNotifierService], (service: SearchFormActionsNotifierService) => {
        spyOn(service.refreshGrid, 'emit');
        service.onRefreshGrid();
        expect(service.refreshGrid.emit).toHaveBeenCalled();
    }));
  });

  describe('selectedRows', () => {
    it('should emit with rows when onSelectedRows is called',
      inject([SearchFormActionsNotifierService], (service: SearchFormActionsNotifierService) => {
        const rows = [];
        spyOn(service.selectedRows, 'emit');
        service.onSelectedRows(rows);
        expect(service.selectedRows.emit).toHaveBeenCalledWith(rows);
    }));
  });
});
