package com.example.rendez_vous.controllers;

import com.example.rendez_vous.entities.RendezVous;
import com.example.rendez_vous.repositories.RendezVousRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/rendezvous")
public class RendezVousRestController {
    private final RendezVousRepository rendezVousRepository;

    public RendezVousRestController(RendezVousRepository rendezVousRepository) {
        this.rendezVousRepository = rendezVousRepository;
    }

    @GetMapping
    public List<RendezVous> getAll() {
        return rendezVousRepository.findAll();
    }

    @PostMapping
    public RendezVous save(@RequestBody RendezVous rendezVous) {
        return rendezVousRepository.save(rendezVous);
    }

    @PutMapping("/{id}")
    public RendezVous update(@PathVariable Long id, @RequestBody RendezVous rendezVous) {
        rendezVous.setId(id);
        return rendezVousRepository.save(rendezVous);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        rendezVousRepository.deleteById(id);
    }
}
