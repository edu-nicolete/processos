package com.teste.processos.dtos;

import com.teste.processos.model.Processos;

import java.util.Date;

public class ProcessosDTO {

    public String getNpu() {
        return npu;
    }

    public void setNpu(String npu) {
        this.npu = npu;
    }

    public Date getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(Date dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public Date getDataVisualizacao() {
        return dataVisualizacao;
    }

    public void setDataVisualizacao(Date dataVisualizacao) {
        this.dataVisualizacao = dataVisualizacao;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public byte[] getAnexo() {
        return anexo;
    }

    public void setAnexo(byte[] anexo) {
        this.anexo = anexo;
    }

    private String npu;
    private Date dataCadastro;
    private Date dataVisualizacao;
    private String municipio;
    private String uf;
    private byte[] anexo;

//    public ProcessosDTO(Processos processos) {
//        this.npu = processos.getNpu();
//        this.dataCadastro = processos.getDataCadastro();
//        this.dataVisualizacao = processos.getDataVisualizacao();
//        this.municipio = processos.getMunicipio();
//        this.uf = processos.getUf();
//        this.anexo = processos.getAnexo();
//    }
}
