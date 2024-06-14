import { OnInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Processo } from '../../../models/processos';
import {MatDialog} from '@angular/material/dialog';
import { ModalCadastroProcessos } from './modal-cadastro-processos.component';
import { ModalVisualizarProcesso } from './modal-visualizar-processo.component';
import { ProcessoService } from '../../../services/processos.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.css']
})
export class ProcessosComponent implements OnInit {

    processos: Processo[] = [];
   
    displayedColumns: string[] = ['npu', 'dataCadastro', 'uf', 'acao'];
    dataSource = new MatTableDataSource<Processo>(this.processos);
    readonly dialog = inject(MatDialog);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private service: ProcessoService) { }

    ngOnInit(): void {
        this.buscarProcessos();
    }

    buscarProcessos():void {
        this.service.buscarProcessos().subscribe((resposta) => {
            this.processos = resposta;
            this.dataSource = new MatTableDataSource<Processo>(this.processos);
            this.dataSource.paginator = this.paginator;
        })
    }

    abreVisualizacao(id: any) {
        this.service.alteraDataVisualizacao(id).subscribe((resposta) => {
            console.log('resposta', resposta);
            if (resposta) {
                const dialogRef = this.dialog.open(ModalVisualizarProcesso);
                dialogRef.componentInstance.id = id;
            }
            
        });
    }

    abrirModalCadastro() {
        const dialogRef = this.dialog.open(ModalCadastroProcessos);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    excluirProcesso(id: any) {
        this.service.excluirProcesso(id).subscribe((resposta) => {
            console.log('resposta', resposta);
            this.buscarProcessos();
        });
    }

}

