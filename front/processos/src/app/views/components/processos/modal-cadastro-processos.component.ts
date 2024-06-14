import { OnInit, Component, ChangeDetectionStrategy, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProcessoService } from '../../../services/processos.service';
import { NgxMaskDirective } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Processo } from '../../../models/processos';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'modal-cadastro-processos.componet.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, NgxMaskDirective, MatIconModule, FormsModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCadastroProcessos implements OnInit {

    constructor(private service: ProcessoService,
        public dialogRef: MatDialogRef<ModalCadastroProcessos>
    ) {
    }

    uf: any;
    municipio: any;
    npu = '';
    siglaUf: any;
    base64: any;

    estados = null;
    municipios = null;

    name = "Angular " + VERSION.major;
    display: FormControl = new FormControl("", Validators.required);
    file_store: File | undefined;
    file_list: Array<string> = [];

    ngOnInit(): void {
        this.recuperaUf();
    }

    recuperaUf(): any {
        this.service.buscaUf().subscribe((resposta) => {
            console.log('resposta', resposta);
            this.estados = resposta;
        });
    }

    listaMunicipios() {
        let idUf = this.uf.substr(0, 2);
        this.siglaUf = this.uf.substr(2, 4);
        console.log('idUf', idUf);
        this.service.buscaMunicipio(idUf).subscribe((resposta) => {
            console.log('resposta', resposta);
            this.municipios = resposta;
        });
    }

    handleFileInputChange(l: any): void {
        this.file_store = l;
        if (l.length) {
            const f = l[0];
            const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
            this.display.patchValue(`${f.name}${count}`);
            this.getBase64(f);
        } else {
            this.display.patchValue("");
        }
    }

    getBase64(file: any) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(
            this.base64 = reader.result
        );
          reader.onerror = error => reject(error);
        });
      }

    salvarProcesso() {
        if(!this.errorValid) {
            const processo: Processo = {
                npu: this.npu,
                dataCadastro: '',
                dataVisualizacao: '',
                municipio: this.municipio,
                uf: this.siglaUf,
                anexo: this.base64 = this.base64.substr(28)
            };
    
            this.service.salvarProcesso(processo).subscribe((resposta) => {
                console.log('resposta', resposta);
            });
        }
        
    }

    errorValid() {
        if(this.uf == null || this.uf == '') {
            return 'A UF deve ser preenchida';
        }

        if(this.municipio == null || this.municipio == '') {
            return 'O municipio deve ser preenchida';
        }

        if(this.npu == null || this.npu == '') {
            return 'NPU deve ser preenchida';
        }

        this.dialogRef.close();
        return false;
    }

}
