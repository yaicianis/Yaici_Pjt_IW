package com.example.Rendez_vous;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Table(name = "appointments")
@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDate appointmentDate;
	private Status status;
}

enum Status {
	SCHEDULED, CANCELLED, COMPLETED
}

@Repository
interface AppointmentRepository extends JpaRepository <Appointment,Long> {

}

@RestController
@RequestMapping("/appointments")
class appointmentRestController {
	private final AppointmentRepository appointmentRepository;

	public appointmentRestController(AppointmentRepository appointmentRepository){
		this.appointmentRepository = appointmentRepository;
	}

	@GetMapping("/rendezvous")
	public List<Appointment> getAllAppointments(){
		return appointmentRepository.findAll();
	}

	@GetMapping(path="/{id}")
	public Appointment getAppointment(@PathVariable(name="id") Long id){
		return appointmentRepository.findById(id).isPresent() ? appointmentRepository.findById(id).get() : null;
	}

	@PutMapping(path="/{id}")
	public Appointment updateAppointment(@PathVariable(name="id") Long id, @RequestBody Appointment appointment){
		appointment.setId(id);
		return appointmentRepository.save(appointment);
	}

	@PostMapping(path="/save")
	public Appointment save(@RequestBody Appointment appointment){ // Create Appointment
		return appointmentRepository.save(appointment);
	}

	@DeleteMapping(value="/{id}")
	public void delete(@PathVariable(name="id") Long id){
		appointmentRepository.deleteById(id);
	}

}

@SpringBootApplication
public class RendezVousApplication {

	public static void main(String[] args) {
		SpringApplication.run(RendezVousApplication.class, args);
	}

}


