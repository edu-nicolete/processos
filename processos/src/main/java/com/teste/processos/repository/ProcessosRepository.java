package com.teste.processos.repository;

import com.teste.processos.model.Processos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessosRepository extends JpaRepository<Processos, Long> {

}