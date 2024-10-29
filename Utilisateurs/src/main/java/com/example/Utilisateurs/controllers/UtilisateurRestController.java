package com.example.Utilisateurs.controllers;




import com.example.Utilisateurs.repositories.UtilisateurRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.Utilisateurs.entities.Utilisateur;

@RestController
@CrossOrigin("*")
@RequestMapping("/utilisateurs")
public class UtilisateurRestController {
    private final UtilisateurRepository utilisateurRepository;

    public UtilisateurRestController(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @GetMapping
    public List<Utilisateur> getAll() {
        return utilisateurRepository.findAll();
    }

    @PostMapping
    public Utilisateur save(@RequestBody Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    @PutMapping("/{id}")
    public Utilisateur update(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
        utilisateur.setId(id);
        return utilisateurRepository.save(utilisateur);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        utilisateurRepository.deleteById(id);
    }
}
