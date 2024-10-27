package Utilisateurs.src.main.java.com.example.Utilisateurs.entities;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("PROFESSIONNEL") // Indique que ce type est un professionnel
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Professionnel extends Utilisateur {
    private String numeroSIRET; // Attribut spécifique aux professionnels
}
