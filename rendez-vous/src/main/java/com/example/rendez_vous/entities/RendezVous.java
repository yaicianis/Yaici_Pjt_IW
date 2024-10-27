package com.example.rendez_vous.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class RendezVous {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private Long clientId;
    private Long professionnelId;
    private LocalDateTime date;
}