package voyager.server.controllers;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import voyager.server.data.PlanToWatchJdbcRepository;

import java.util.List;

@RestController
@RequestMapping("/animeList/planToWatchList")
public class PlanToWatchListController {

    private final PlanToWatchJdbcRepository planToWatchJdbcRepository;

    public PlanToWatchListController(
            PlanToWatchJdbcRepository planToWatchJdbcRepository) {

        this.planToWatchJdbcRepository = planToWatchJdbcRepository;
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getPlanToWatchList(@PathVariable String username) {
        if (!usernameMatchesAuth(username)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(
                planToWatchJdbcRepository.getPlanToWatch(username));
    }

    @PostMapping("/{username}/{animeId}")
    public ResponseEntity<?> addPlanToWatchAnime(@PathVariable String username,
                                                @PathVariable int animeId) {
        if (!usernameMatchesAuth(username)) {
            return ResponseEntity.status(403).build();
        }
        try {
            if (planToWatchJdbcRepository.planToWatchAdd(username, animeId)) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.internalServerError().body(
                        List.of("Failed to add anime"));
            }
        } catch (DuplicateKeyException e) {
            return ResponseEntity.badRequest()
                    .body(List.of("Anime ID is a duplicate"));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest()
                    .body(List.of("Username does not exist"));
        }
    }

    @DeleteMapping("/{username}/{animeId}")
    public ResponseEntity<?> deletePlanToWatchAnime(@PathVariable String username,
                                                    @PathVariable int animeId) {
        if (!usernameMatchesAuth(username)) {
            return ResponseEntity.status(403).build();
        }
        try {
            if (planToWatchJdbcRepository.planToWatchDelete(username, animeId)) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.internalServerError().body(
                        List.of("Failed to delete anime"));
            }
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest()
                    .body(List.of("Username does not exist"));
        }
    }


    private boolean usernameMatchesAuth(String username) {
        String user = (String) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        return user.equals(username);
    }

}
