package voyager.server.data;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FavoritesJdbcRepository {

    private final JdbcClient jdbcClient;

    public FavoritesJdbcRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Integer> getFavorites(String username) {

        final String sql = "SELECT character_id FROM favorites WHERE username "
                + "= ?";

        return jdbcClient.sql(sql)
                .param(username)
                .query(Integer.class)
                .list();
    }

    public boolean addFavorite(String username, int characterId) {
        final String sql = "INSERT INTO favorites (username, character_id) "
                + "VALUES (?, ?)";

        return jdbcClient.sql(sql)
                .params(username,
                        characterId)
                .update() > 0;
    }

    public boolean deleteFavorite(String username, int characterId) {
        final String sql = "DELETE FROM favorites WHERE username = ? AND "
                + "character_id = ?";

        return jdbcClient.sql(sql)
                .params(username,
                        characterId)
                .update() > 0;
    }

}

