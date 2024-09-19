package voyager.server.controllers;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import voyager.server.data.FavoritesJdbcRepository;

import java.util.List;

@RestController
@RequestMapping("/favorites")
public class FavoritesController {

    private final FavoritesJdbcRepository favoritesJdbcRepository;

    public FavoritesController(
            FavoritesJdbcRepository favoritesJdbcRepository) {

        this.favoritesJdbcRepository = favoritesJdbcRepository;
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getFavorites(@PathVariable String username) {
        if (!usernameMatchesAuth(username)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(
                favoritesJdbcRepository.getFavorites(username));
    }

    @PostMapping("/{username}/{characterId}")
    public ResponseEntity<?> addFavorite(@PathVariable String username,
                                         @PathVariable int characterId) {
        if (!usernameMatchesAuth(username)) {
            return ResponseEntity.status(403).build();
        }
        try {
            if (favoritesJdbcRepository.addFavorite(username, characterId)) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.internalServerError().body(
                        List.of("Failed to add favorite"));
            }
        } catch (DuplicateKeyException e) {
            return ResponseEntity.badRequest()
                    .body(List.of("Character ID is a duplicate"));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest()
                    .body(List.of("Username does not exist"));
        }
    }

    @DeleteMapping("/{username}/{characterId}")
    public ResponseEntity<?> deleteFavorite(@PathVariable String username,
                                            @PathVariable int characterId) {
        if (!usernameMatchesAuth(username)) {
            return ResponseEntity.status(403).build();
        }
        if (favoritesJdbcRepository.deleteFavorite(username, characterId)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.badRequest()
                    .body(List.of("Character ID not found as a favorite for "
                            + username));
        }
    }

    private boolean usernameMatchesAuth(String username) {
        String user = (String) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        return user.equals(username);
    }
}
