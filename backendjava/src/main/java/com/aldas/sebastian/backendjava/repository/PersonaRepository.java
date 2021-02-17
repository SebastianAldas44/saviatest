package com.aldas.sebastian.backendjava.repository;

import com.aldas.sebastian.backendjava.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonaRepository extends JpaRepository<Persona, Integer> {
    
}
