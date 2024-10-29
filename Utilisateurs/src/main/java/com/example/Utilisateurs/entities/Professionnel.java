package Utilisateurs.src.main.java.com.example.Utilisateurs.entities;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.Utilisateurs.entities.Utilisateur;

@Entity
@DiscriminatorValue("PROFESSIONNEL")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Professionnel extends Utilisateur {
    private String numeroSIRET;
}
