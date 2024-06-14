import { OnInit, Component, ChangeDetectionStrategy, inject } from '@angular/core';
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
import {MatDialog} from '@angular/material/dialog';


@Component({
    selector: 'modal-visualizar-processo',
    templateUrl: 'modal-visualizar-processo.componet.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, NgxMaskDirective, MatIconModule, FormsModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalVisualizarProcesso implements OnInit {

    constructor(private service: ProcessoService) {
    }

    readonly dialog = inject(MatDialog);

    processo: Processo = {
        id: '',
        npu: '',
        dataCadastro: '',
        dataVisualizacao: '',
        municipio: '',
        uf: '',
        anexo: '',
    }
    
    id = null;

    ngOnInit(): void {
        this.buscarProcessoId();
    }

    buscarProcessoId(): any {
        this.service.buscarProcessoId(this.id).subscribe((resposta) => {
            console.log('resposta', resposta);
            if (resposta) {
                this.processo = resposta;
            }
            
        });
    }

    downloadAnexo(anexo: any) {
        const byteArray = new Uint8Array(atob(anexo).split('').map(char => char.charCodeAt(0)));
        const b =  new Blob([byteArray], {type: 'application/pdf'});
        const url = URL.createObjectURL(b);
        console.log('url', url);
    }

}
