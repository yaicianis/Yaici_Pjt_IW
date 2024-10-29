package Utilisateurs.src.main.java.com.example.Utilisateurs.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.Utilisateurs.entities.Utilisateur;

@Entity
@DiscriminatorValue("CLIENT")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Client extends Utilisateur {
    private String adresseLivraison;
}