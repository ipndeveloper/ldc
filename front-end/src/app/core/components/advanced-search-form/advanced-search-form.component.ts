import { Component, OnInit, Input, ViewChild, ContentChild, TemplateRef, EventEmitter, Output } from '@angular/core';
import { EntityWithCodeService } from '../../shared/super/entity-with-codeservice';
import { EntityWithCode } from '../../models/entity-with-code';
import { ModalComponent } from '../modal/modal.component';
import { Dictionary } from '../../models/dictionary';
import { PopupService } from '../../services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-advanced-search-form',
  templateUrl: './advanced-search-form.component.html',
  styleUrls: ['./advanced-search-form.component.css']
})
export class AdvancedSearchFormComponent<T extends EntityWithCode> implements OnInit {

  @Input() service: EntityWithCodeService<T>;
  @ViewChild('modalComponent') modalComponent: ModalComponent;
  @ContentChild('controlFiltersContainer') filtersContainer: TemplateRef<any>;
  @Input() columns: any;
  @Input() rows: any;
  @Input() selected: any = [];
  @Input() filters: Dictionary<string> = new Dictionary<string>();
  @Input() entityName = '';
  @Output() accepted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closing: EventEmitter<any> = new EventEmitter<any>();

  isContentLoading: Boolean = false;

  constructor(private readonly popupService: PopupService) {
  }

  ngOnInit() {
  }

  open() {
    this.rows = undefined;
    this.selected = [];
    this.modalComponent.open();
  }

  onClickSearch() {
    this.isContentLoading = true;
    if (this.filters && this.filters.any()) {
      this.service.getByFilter(this.filters).subscribe((items: T[]) => {
        this.rows = items;
        if (items.length === 0) {
          this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
        }
        this.isContentLoading = false;
      });
    } else {
      this.popupService.error(Resources.Messages.PorFavorIngreseAlMenosUnFiltroParaBuscar);
    }
  }

  onSelect(rows: any) {
    this.selected = rows.selected;
  }

  onAccept() {
    this.accepted.emit(this.selected[0]);
    this.modalComponent.close();
  }

  onClosing() {
    this.closing.emit();
  }

}
