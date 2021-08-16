import { AdminApiService } from 'src/app/services/admin-api.service';
import { ExcelService } from '../../services/excel.service';
import {
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';
declare var require: any;
const FileSaver = require('file-saver');
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [NgbModal],
  encapsulation: ViewEncapsulation.None,
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('content', { static: false }) modalDownload: TemplateRef<void>;
  @ViewChild('contentEdit', { static: false }) modalEdit: TemplateRef<void>;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  processList: any;
  processStatus: number;
  url = environment.apiUrl;
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  fileName: string;
  currentDate = formatDate(new Date(), '_ddMMyyyy_Hmmss', 'en');
  showAdvancedSearch: boolean;
  dataObjProcessData = {
    api_key_admin: environment.apiKeyAdmin,
  };
  fileList: any;
  files = {
    document: '',
  };

  editForm = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    rol: new FormControl(''),
    phone: new FormControl(''),
  });

  roleOptions = ['Administrador', 'Profesor'];

  constructor(
    private adminService: AdminApiService,
    private http: HttpClient,
    public dataService: DataService,
    private authSvc: AuthService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private excelService: ExcelService
  ) {
    this.processStatus = -1;
    this.fileName = 'Reporte_usuarios' + this.currentDate;
    this.showAdvancedSearch = false;
  }

  ngOnInit(): void {
    this.getAllProcessData();
  }

  filterByStatus(state: number): void {
    this.processStatus = state;
    this.showAdvancedSearch = false;
    this.reloadTable();
  }

  private async reloadTable() {
    const dtIntance = await this.dtElement.dtInstance;
    dtIntance.ajax.reload();
  }

  getAllProcessData(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ordering: false,
      lengthChange: false,
      info: false,
      paging: true,
      searching: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
            this.url + '/get-users',
            this.getInputData(dataTablesParameters),
            this.httpHeader
          )
          .subscribe((respProcess) => {
            // const resp = respProcess.procesos.original;
            const resp = respProcess.usuarios.original;

            that.processList = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },
      // columns: [{ data: 'titulo' }, { data: 'estado' }, { data: 'created_at' }, { data: 'tipo' }, { data: '_id' }],
      columns: [{ data: 'nombres' }],
      language: this.dataService.spanishDatatables,
    };
  }

  getInputData(dataTable: any): any {
    dataTable['api_key_admin'] = environment.apiKeyAdmin;
    dataTable['formato_datatable'] = true;
    return dataTable;
  }

  exportExcel(): void {
    this.excelService.exportAsExcelFile(this.processList, this.fileName);
  }

  showFilterAdvancedSearch(): void {
    this.showAdvancedSearch = true;
  }
  hideFilterAdvancedSearch(): void {
    this.showAdvancedSearch = false;
  }

  showAlert(message, title): void {
    this.toastr.error(message, title, {
      toastClass: 'toast-alert-message',
      tapToDismiss: false,
      disableTimeOut: true,
      closeButton: true,
    });
  }
  showSuccess(message, title): void {
    this.toastr.success(message, title, {
      toastClass: 'toast-success-message',
      tapToDismiss: false,
      disableTimeOut: true,
      closeButton: true,
    });
  }

  openModalDownload(): void {
    this.modalService.open(this.modalDownload, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      animation: true,
      keyboard: false,
      windowClass: 'download-file',
      backdropClass: 'modal-backdrop-download-file',
    });
  }

  openModalEdit(): void {
    this.modalService.open(this.modalEdit, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      animation: true,
      keyboard: false,
      windowClass: 'download-file',
      backdropClass: 'modal-backdrop-download-file',
    });
  }

  openEditModal(
    id: any,
    nombres: any,
    apellidos: any,
    rol: any,
    telefono: any
  ): void {
    this.openModalEdit();

    this.editForm.reset({
      name: nombres,
      lastName: apellidos,
      phone: telefono,
      rol: rol,
    });
  }

  onUpdate(form: any) {
    if (form.invalid) {
      this.showAlert('Campos Vacíos', 'Error');
      return;
    }

    this.reloadTable();
  }
}
