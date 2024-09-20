package voyager.server.controllers;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import voyager.server.data.CurrentWatchListJdbcRepository;

import java.util.List;

@Repository
@RequestMapping("/animeList/currentList")
public class CurrentListController {

    private final CurrentWatchListJdbcRepository currentWatchListJdbcRepository;

    public CurrentListController(
            CurrentWatchListJdbcRepository currentWatchListJdbcRepository) {

        this.currentWatchListJdbcRepository = currentWatchListJdbcRepository;
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getCurrentList(@PathVariable String username) {
        if (!usernameMatchesAuth(username)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(
                currentWatchListJdbcRepository.getCurrentList(username));
    }

    @PostMapping("/{username}/{animeId}")
    public ResponseEntity<?> addCurrentAnime(@PathVariable String username,
                                         @PathVariable int animeId) {
        if (!usernameMatchesAuth(username)) {
            return ResponseEntity.status(403).build();
        }
        try {
            if (currentWatchListJdbcRepository.currentListAdd(username, animeId)) {
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
    public ResponseEntity<?> deleteCurrentAnime(@PathVariable String username,
                                          @PathVariable int animeId) {
        if (!usernameMatchesAuth(username)) {
            return ResponseEntity.status(403).build();
        }
        try {
            if (currentWatchListJdbcRepository.currentListDelete(username, animeId)) {
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
