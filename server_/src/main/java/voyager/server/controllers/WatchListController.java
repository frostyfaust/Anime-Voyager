package voyager.server.controllers;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import voyager.server.data.WatchListJdbcRepository;

import java.util.List;

@RestController
@RequestMapping("/animeList/watchList")
public class WatchListController {

    private final WatchListJdbcRepository watchListJdbcRepository;

    public WatchListController(
            WatchListJdbcRepository watchListJdbcRepository) {

        this.watchListJdbcRepository = watchListJdbcRepository;
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getWatchList(@PathVariable String username) {
        if (!usernameMatchesAuth(username)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(
                watchListJdbcRepository.getWatchList(username));
    }

    @PostMapping("/{username}/{animeId}")
    public ResponseEntity<?> addWatchAnime(@PathVariable String username,
                                            @PathVariable int animeId) {
        if (!usernameMatchesAuth(username)) {
            return ResponseEntity.status(403).build();
        }
        try {
            if (watchListJdbcRepository.watchListAdd(username, animeId)) {
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
    public ResponseEntity<?> deleteWatchAnime(@PathVariable String username,
                                         @PathVariable int animeId) {
        if (!usernameMatchesAuth(username)) {
            return ResponseEntity.status(403).build();
        }
        try {
            if (watchListJdbcRepository.watchListDelete(username, animeId)) {
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
