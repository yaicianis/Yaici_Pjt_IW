package com.example.Disponibilite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.persistence.*;
import lombok.*;
import org.apache.hc.core5.reactor.Command;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Table(name = "timeslots")
@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
class TimeSlot {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private boolean isAvailable;
}

@Repository
interface TimeSlotRepository extends JpaRepository <TimeSlot,Long> {

}

@RestController
@RequestMapping("/timeslots")
class timeslotRestController {
	private final TimeSlotRepository timeslotRepository;

	public timeslotRestController(TimeSlotRepository timeslotRepository){
		this.timeslotRepository = timeslotRepository;
	}

	@GetMapping
	public List<TimeSlot> getAllTimeSlots(){
		return timeslotRepository.findAll();
	}

	@GetMapping(path="/{id}")
	public TimeSlot getTimeSlot(@PathVariable(name="id") Long id){
		return timeslotRepository.findById(id).isPresent() ? timeslotRepository.findById(id).get() : null;
	}

	@PutMapping(path="/{id}")
	public TimeSlot updateTimeSlot(@PathVariable(name="id") Long id, @RequestBody TimeSlot timeslot){
		timeslot.setId(id);
		return timeslotRepository.save(timeslot);
	}

	@PostMapping(value="/save")
	public TimeSlot save(@RequestBody TimeSlot timeslot){ // Create TimeSlot
		return timeslotRepository.save(timeslot);
	}

	@DeleteMapping(value="/{id}")
	public void delete(@PathVariable(name="id") Long id){
		timeslotRepository.deleteById(id);
	}

}

@SpringBootApplication
public class DisponibiliteApplication {

	public static void main(String[] args) {
		SpringApplication.run(DisponibiliteApplication.class, args);
	}

}
