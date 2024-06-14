package com.teste.processos.service;

import java.util.List;

import com.teste.processos.dtos.ProcessosDTO;
import com.teste.processos.model.Processos;

public interface ProcessosService {

    public Processos saveProcesso(ProcessosDTO processos);
    public List<Processos> getAllProcessos();
    public Processos getProcessoById(Long id);
    public void deleteAllProcesso();
    public void deleteProcessoById(Long id);
    public void updateProcesso(Long processos);

}