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
//debut
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

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
//debut
List<Appointment> findByAppointmentDate(LocalDate appointmentDate);
List<Appointment> findByStatus(Status status);

//fin
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
//debut
@RestController
@RequestMapping("/yaici")
 class yaiciRestController {
	private final AppointmentRepository appointmentRepository;

	public yaiciRestController(AppointmentRepository appointmentRepository) {
		this.appointmentRepository = appointmentRepository;
	}

	@GetMapping("/{id}")
	public Appointment getAppointment(@PathVariable Long id) {
		return appointmentRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rendez-vous introuvable"));
	}

	@GetMapping("/date/{appointmentDate}")
	public List<Appointment> getAppointmentsByDate(@PathVariable String appointmentDate) {
		LocalDate date = LocalDate.parse(appointmentDate);
		return appointmentRepository.findByAppointmentDate(date);
	}

	@GetMapping("/status/{status}")
	public List<Appointment> getAppointmentsByStatus(@PathVariable String status) {
		try {
			Status appointmentStatus = Status.valueOf(status.toUpperCase());
			return appointmentRepository.findByStatus(appointmentStatus);
		} catch (IllegalArgumentException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Statut invalide", e);
		}
	}

	@PutMapping("/{id}/status/{status}")
	public Appointment updateAppointmentStatus(@PathVariable Long id, @PathVariable String status) {
		Appointment appointment = appointmentRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rendez-vous introuvable"));

		try {
			Status newStatus = Status.valueOf(status.toUpperCase());
			appointment.setStatus(newStatus);
			return appointmentRepository.save(appointment);
		} catch (IllegalArgumentException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Statut invalide", e);
		}
	}
}
//fin

@SpringBootApplication
public class RendezVousApplication {

	public static void main(String[] args) {
		SpringApplication.run(RendezVousApplication.class, args);
	}

}


