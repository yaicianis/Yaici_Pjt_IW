package com.example.rendez_vous.repositories;

import com.example.rendez_vous.entities.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {}
