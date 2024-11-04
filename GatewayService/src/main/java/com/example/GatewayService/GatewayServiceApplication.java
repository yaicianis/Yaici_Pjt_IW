package com.example.GatewayService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceApplication.class, args);
	}

	@Bean
	RouteLocator routeLocator(RouteLocatorBuilder builder) {
		return builder.routes()
				.route("r1", r -> r.path("/users/**").uri("lb://UserService"))
				.route(r -> r.path("/appointments/**").uri("lb://AppointmentService"))
				.route(r -> r.path("/timeslots/**").uri("lb://TimeSlotService"))
				.build();
	}
}
