package com.teste.processos.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.teste.processos.dtos.ProcessosDTO;
import com.teste.processos.exception.ProcessosNotFoundException;
import com.teste.processos.model.Processos;
import com.teste.processos.repository.ProcessosRepository;
import com.teste.processos.service.ProcessosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProcessosServiceImpl implements ProcessosService {

    @Autowired
    private ProcessosRepository repo;

    @Override
    public Processos saveProcesso(ProcessosDTO processo) {
        Processos processos = new Processos();
        processos.setAnexo(processo.getAnexo());
        processos.setUf(processo.getUf());
        processos.setNpu(processo.getNpu());
        processos.setMunicipio(processo.getMunicipio());
        processos.setDataCadastro(new Date());
        return repo.save(processos);
    }

    @Override
    public List<Processos> getAllProcessos() {
        return repo.findAll();
    }

    @Override
    public Processos getProcessoById(Long id) {
        Optional<Processos> opt = repo.findById(id);
        if(opt.isPresent()) {
            return opt.get();
        } else {
            throw new ProcessosNotFoundException("Invoice with Id : "+id+" Not Found");
        }
    }

    @Override
    public void deleteProcessoById(Long id) {
        repo.delete(getProcessoById(id));
    }

    @Override
    public void deleteAllProcesso() {
        repo.deleteAll();
    }

    @Override
    public void updateProcesso(Long id) {
        Processos processo = getProcessoById(id);
        processo.setDataVisualizacao(new Date());
        repo.save(processo);
    }
}