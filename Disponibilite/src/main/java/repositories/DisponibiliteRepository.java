package com.example.Disponibilite.repositories;

import com.example.Disponibilite.entities.Disponibilite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface DisponibiliteRepository extends JpaRepository<Disponibilite, Long> {}
