package com.example.utilisateur;

import jakarta.ws.rs.Path;
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
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Table(name = "users")
@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String firstName;
	private String lastName;
	private String email;

	@Enumerated(EnumType.STRING)
	private Role role;

	private String phone; // for Client
	private String profession; // for Professional
}

@Repository
interface UserRepository extends JpaRepository <User,Long> {
	public List<User> findByEmail(String email);
}

@RestController
@RequestMapping("/users")
class userRestController {
	private final UserRepository userRepository;

	public userRestController(UserRepository userRepository){
		this.userRepository = userRepository;
	}

	@GetMapping
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}

	@GetMapping(path="/{id}")
	public User getUser(@PathVariable(name="id") Long id){
		return userRepository.findById(id).isPresent() ? userRepository.findById(id).get() : null;
	}

	@PutMapping(path="/{id}")
	public User updateUser(@PathVariable(name="id") Long id, @RequestBody User user){
		user.setId(id);
		return userRepository.save(user);
	}

	@PostMapping(value="/save")
	public User save(@RequestBody User user){ // Create User
		return userRepository.save(user);
	}

	@DeleteMapping(value="/{id}")
	public void delete(@PathVariable(name="id") Long id){
		userRepository.deleteById(id);
	}

	@GetMapping(path="/findByEmail")
	public List<User> findByEmail(@RequestParam("email") String email){
		return userRepository.findByEmail(email);
	}
}

enum Role {
	CLIENT, PROFESSIONAL
}


@SpringBootApplication
public class UtilisateurApplication {

	public static void main(String[] args) {
		SpringApplication.run(UtilisateurApplication.class, args);
	}

	@Bean
	CommandLineRunner star(UserRepository userRepository){
		return args -> {
			userRepository.save(new User(null,"a","b","a.b@.com" ,Role.CLIENT,"00","bb"));


		};
	}

}
