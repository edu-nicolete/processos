package com.teste.processos.controller;

import java.io.IOException;
import java.util.List;

import com.teste.processos.dtos.ProcessosDTO;
import com.teste.processos.exception.ProcessosNotFoundException;
import com.teste.processos.model.Processos;
import com.teste.processos.service.ProcessosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/processos")
public class ProcessosController {

    @Autowired
    private ProcessosService service;

    @PostMapping("/incluir")
    public ResponseEntity<?> incluir(@RequestBody ProcessosDTO processos) {
        Processos processo = service.saveProcesso(processos);
        return ResponseEntity.ok().body(processo);
    }

    @GetMapping("/recuperar")
    public ResponseEntity<List<Processos>> recuperar() {
        List<Processos> processo= service.getAllProcessos();
        return ResponseEntity.ok().body(processo);
    }

    @GetMapping("/recuperarId/{id}")
    public ResponseEntity<Processos> recuperarId(@PathVariable Long id) {
        Processos processo = service.getProcessoById(id);
        return ResponseEntity.ok().body(processo);
    }

    @PostMapping("/alterar")
    public ResponseEntity<HttpStatus> alterar(@RequestBody Long id) {
        service.updateProcesso(id);
        return ResponseEntity.ok().body(HttpStatus.OK);
    }

    @GetMapping("/excluir/{id}")
    public ResponseEntity<HttpStatus> excluir(@PathVariable Long id) {
        try {
            service.deleteProcessoById(id);
        } catch (ProcessosNotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.ok().body(HttpStatus.CONFLICT);
        }
        return ResponseEntity.ok().body(HttpStatus.OK);
    }

    @GetMapping("/excluirTodos")
    public ResponseEntity.BodyBuilder excluirTodos() {
        service.deleteAllProcesso();
        return ResponseEntity.ok();
    }
}