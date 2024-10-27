package Utilisateurs.src.main.java.com.example.Utilisateurs.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("CLIENT") // Utilisé pour indiquer le type d'entité dans l'héritage
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Client extends Utilisateur {
    private String adresseLivraison; // Ajoutez ici d'autres attributs spécifiques au client si nécessaire
}