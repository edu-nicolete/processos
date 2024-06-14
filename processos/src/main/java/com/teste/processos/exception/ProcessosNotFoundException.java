package com.teste.processos.exception;

public class ProcessosNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ProcessosNotFoundException() {
        super();
    }

    public ProcessosNotFoundException(String customMessage) {
        super(customMessage);
    }
}