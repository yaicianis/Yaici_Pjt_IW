package com.example.Disponibilite.controllers;

import com.example.Disponibilite.entities.Disponibilite;
import com.example.Disponibilite.repositories.DisponibiliteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/disponibilites")
public class DisponibiliteRestController {
    private final DisponibiliteRepository disponibiliteRepository;

    public DisponibiliteRestController(DisponibiliteRepository disponibiliteRepository) {
        this.disponibiliteRepository = disponibiliteRepository;
    }

    @GetMapping
    public List<Disponibilite> getAll() {
        return disponibiliteRepository.findAll();
    }

    @PostMapping
    public Disponibilite save(@RequestBody Disponibilite disponibilite) {
        return disponibiliteRepository.save(disponibilite);
    }

    @PutMapping("/{id}")
    public Disponibilite update(@PathVariable Long id, @RequestBody Disponibilite disponibilite) {
        disponibilite.setId(id);
        return disponibiliteRepository.save(disponibilite);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        disponibiliteRepository.deleteById(id);
    }
}
